import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { DrizzleService } from '../db/drizzle.service';
import { bookings, trainers, users, reviews } from '../db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class BookingService {
  constructor(
    private drizzle: DrizzleService,
    private stripeService: StripeService,
  ) {}

  async findByUser(userId: number) {
    return this.drizzle.db.select({
      id: bookings.id,
      date: bookings.date,
      timeSlot: bookings.timeSlot,
      status: bookings.status,
      paymentStatus: bookings.paymentStatus,
      expiresAt: bookings.expiresAt,
      cancellationReason: bookings.cancellationReason,
      trainerName: users.fullName,
      trainerSpecialty: trainers.specialty,
      trainerImageUrl: trainers.imageUrl,
      isReviewed: sql<boolean>`CASE WHEN ${reviews.id} IS NOT NULL THEN true ELSE false END`,
    })
    .from(bookings)
    .innerJoin(trainers, eq(bookings.trainerId, trainers.id))
    .innerJoin(users, eq(trainers.userId, users.id))
    .leftJoin(reviews, eq(bookings.id, reviews.bookingId))
    .where(eq(bookings.userId, userId));
  }

  async findByTrainerUser(userId: number) {
    const [trainer] = await this.drizzle.db.select().from(trainers).where(eq(trainers.userId, userId));
    if (!trainer) return [];

    return this.drizzle.db.select({
      id: bookings.id,
      date: bookings.date,
      timeSlot: bookings.timeSlot,
      status: bookings.status,
      paymentStatus: bookings.paymentStatus,
      expiresAt: bookings.expiresAt,
      cancellationReason: bookings.cancellationReason,
      userName: users.fullName,
      isReviewed: sql<boolean>`CASE WHEN ${reviews.id} IS NOT NULL THEN true ELSE false END`,
    })
    .from(bookings)
    .innerJoin(users, eq(bookings.userId, users.id))
    .leftJoin(reviews, eq(bookings.id, reviews.bookingId))
    .where(eq(bookings.trainerId, trainer.id));
  }

  async findByTrainer(trainerId: number) {
    return this.drizzle.db.select().from(bookings).where(eq(bookings.trainerId, trainerId));
  }

  async updateStatus(bookingId: number, userId: number | null, data: { status: string; reason?: string }) {
    // Check if the booking exists and if the user is authorized to update it
    const [booking] = await this.drizzle.db.select().from(bookings).where(eq(bookings.id, bookingId));
    
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Authorization check
    let isAuthorized = false;
    if (userId === null) {
      isAuthorized = true; // System/Webhook override
    } else if (booking.userId === userId) {
      isAuthorized = true;
    } else {
      const [trainer] = await this.drizzle.db.select().from(trainers).where(eq(trainers.userId, userId));
      if (trainer && trainer.id === booking.trainerId) {
        isAuthorized = true;
      }
    }

    if (!isAuthorized) {
      throw new ForbiddenException('Not authorized to update this booking');
    }

    return this.drizzle.db.update(bookings)
      .set({ 
        status: data.status,
        cancellationReason: data.reason
      })
      .where(eq(bookings.id, bookingId))
      .returning();
  }

  async create(data: any) {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setDate(now.getDate() + 7);
    const maxDateStr = maxDate.toISOString().split('T')[0];

    // 1. Check if date is in the past
    if (data.date < todayStr) {
      throw new ForbiddenException('Cannot book in the past');
    }

    // 2. Check if date is within 7 days
    if (data.date > maxDateStr) {
      throw new ForbiddenException('Cannot book more than 7 days in advance');
    }

    // 3. Check 5-hour lead time for today
    if (data.date === todayStr) {
      const currentHour = now.getHours();
      const slotHour = parseInt(data.timeSlot.split(':')[0]);
      if (slotHour < currentHour + 5) {
        throw new ForbiddenException('Same-day bookings require at least 5 hours lead time');
      }
    }

    // 4. Check if already booked
    const [existing] = await this.drizzle.db.select().from(bookings).where(and(
      eq(bookings.trainerId, data.trainerId),
      eq(bookings.date, data.date),
      eq(bookings.timeSlot, data.timeSlot),
      sql`${bookings.status} != 'cancelled'`
    ));

    if (existing) {
      throw new ForbiddenException('This slot is already booked');
    }

    // 5. Get Trainer Info for Stripe
    const [trainer] = await this.drizzle.db.select().from(trainers).where(eq(trainers.id, data.trainerId));
    if (!trainer) throw new NotFoundException('Trainer not found');
    
    const [user] = await this.drizzle.db.select().from(users).where(eq(users.id, data.userId));
    if (!user) throw new NotFoundException('User not found');

    const [newBooking] = await this.drizzle.db.insert(bookings).values({
      userId: data.userId,
      trainerId: data.trainerId,
      date: data.date,
      timeSlot: data.timeSlot,
      status: 'pending',
      paymentStatus: 'unpaid',
    }).returning();

    // 6. Create Stripe Session (Stripe requires min 30m expiry)
    // We set our internal expiresAt to 15m as requested.
    const internalExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
    const stripeExpiresAt = Math.floor(Date.now() / 1000) + 30 * 60; 

    try {
        const [trainerUser] = await this.drizzle.db.select().from(users).where(eq(users.id, trainer.userId));
        const session = await this.stripeService.createCheckoutSession({
            bookingId: newBooking.id,
            amount: trainer.pricePerSession || 50, // Default to 50 if zero
            trainerName: trainerUser?.fullName || 'Professional Trainer',
            customerEmail: user.email,
            expiresAt: stripeExpiresAt,
        });

        // 7. Store Session ID
        await this.drizzle.db.update(bookings)
            .set({ 
                stripeSessionId: session.id,
                expiresAt: internalExpiresAt.toISOString()
            })
            .where(eq(bookings.id, newBooking.id));

        return {
            ...newBooking,
            checkoutUrl: session.url
        };
    } catch (err) {
        console.error("Stripe Session Creation Failed:", err);
        // If Stripe fails, we still have the booking but it's marked unpaid.
        // The user can try again or we can cancel it.
        return newBooking;
    }
  }
}
