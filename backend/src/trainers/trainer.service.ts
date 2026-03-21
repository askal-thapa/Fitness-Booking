import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DrizzleService } from '../db/drizzle.service';
import { trainers, users, trainerAvailability, onboardingData, reviews, bookings, specialties, trainingFocus, trainerSpecialties, trainerTrainingFocus } from '../db/schema';
import { eq, and, sql, avg, count, desc, lt, inArray } from 'drizzle-orm';

@Injectable()
export class TrainerService {
  constructor(private drizzle: DrizzleService) {}

  private async completePastBookings() {
    const now = new Date().toISOString().split('T')[0];
    await this.drizzle.db.update(bookings)
      .set({ status: 'completed' })
      .where(and(
        eq(bookings.status, 'confirmed'),
        lt(bookings.date, now)
      ));
  }

  async getSpecialties() {
    return this.drizzle.db.select().from(specialties).orderBy(specialties.name);
  }

  async getTrainingFocus() {
    return this.drizzle.db.select().from(trainingFocus).orderBy(trainingFocus.name);
  }

  private async attachRelations(trainerList: any[]) {
    if (trainerList.length === 0) return trainerList;

    const trainerIds = trainerList.map(t => t.id);

    // Fetch Specialties
    const specLinks = await this.drizzle.db
      .select({
        trainerId: trainerSpecialties.trainerId,
        name: specialties.name,
      })
      .from(trainerSpecialties)
      .innerJoin(specialties, eq(trainerSpecialties.specialtyId, specialties.id))
      .where(inArray(trainerSpecialties.trainerId, trainerIds));

    // Fetch Training Focus
    const focusLinks = await this.drizzle.db
      .select({
        trainerId: trainerTrainingFocus.trainerId,
        name: trainingFocus.name,
      })
      .from(trainerTrainingFocus)
      .innerJoin(trainingFocus, eq(trainerTrainingFocus.focusId, trainingFocus.id))
      .where(inArray(trainerTrainingFocus.trainerId, trainerIds));

    // Grouping
    const specMap = new Map<number, string[]>();
    specLinks.forEach(l => {
      const arr = specMap.get(l.trainerId) || [];
      arr.push(l.name);
      specMap.set(l.trainerId, arr);
    });

    const focusMap = new Map<number, string[]>();
    focusLinks.forEach(l => {
      const arr = focusMap.get(l.trainerId) || [];
      arr.push(l.name);
      focusMap.set(l.trainerId, arr);
    });

    return trainerList.map(t => ({
      ...t,
      specialties: specMap.get(t.id) || [],
      focus: focusMap.get(t.id) || [],
    }));
  }

  async findAll(filters?: any) {
    await this.completePastBookings();
    const raw = await this.drizzle.db.select({
      id: trainers.id,
      specialty: trainers.specialty,
      bio: trainers.bio,
      imageUrl: trainers.imageUrl,
      rating: trainers.rating,
      name: users.fullName,
      pricePerSession: trainers.pricePerSession,
      intensity: trainers.intensity,
      location: trainers.location,
    })
    .from(trainers)
    .innerJoin(users, eq(trainers.userId, users.id));

    return this.attachRelations(raw);
  }

  async findRecommended(userId: number) {
    const userProfile = await this.drizzle.db.query.onboardingData.findFirst({
      where: eq(onboardingData.userId, userId),
    });

    if (!userProfile) return this.findAll();

    const allTrainers = await this.findAll();
    
    const scored = allTrainers.map(trainer => {
      let score = 0;
      // Match focus
      if (trainer.focus.some(f => userProfile.goal.toLowerCase().includes(f.toLowerCase()))) score += 10;
      if (trainer.specialties.some(s => userProfile.workoutType.toLowerCase().includes(s.toLowerCase()))) score += 5;
      
      const userIntensity = userProfile.activityLevel.includes('Active') ? 4 : 2;
      score += (5 - Math.abs(trainer.intensity - userIntensity));

      return { ...trainer, matchScore: score };
    });

    return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 4);
  }

  async findOne(id: number) {
    const [trainer] = await this.drizzle.db.select({
      id: trainers.id,
      specialty: trainers.specialty,
      bio: trainers.bio,
      imageUrl: trainers.imageUrl,
      rating: trainers.rating,
      name: users.fullName,
      pricePerSession: trainers.pricePerSession,
      intensity: trainers.intensity,
      location: trainers.location,
    })
    .from(trainers)
    .innerJoin(users, eq(trainers.userId, users.id))
    .where(eq(trainers.id, id));
    
    if (!trainer) throw new NotFoundException('Trainer not found');

    const [withRelations] = await this.attachRelations([trainer]);

    const availability = await this.drizzle.db.select().from(trainerAvailability).where(eq(trainerAvailability.trainerId, id));
    const trainerReviews = await this.drizzle.db.select({
      id: reviews.id,
      rating: reviews.rating,
      comment: reviews.comment,
      userName: users.fullName,
      createdAt: reviews.createdAt,
    })
    .from(reviews)
    .innerJoin(users, eq(reviews.userId, users.id))
    .where(eq(reviews.trainerId, id))
    .orderBy(desc(reviews.createdAt));

    (withRelations as any).availability = availability;
    (withRelations as any).reviews = trainerReviews;

    return withRelations;
  }

  async getMe(userId: number) {
    const [trainer] = await this.drizzle.db.select({ id: trainers.id }).from(trainers).where(eq(trainers.userId, userId));
    if (!trainer) throw new NotFoundException('Trainer profile not found');
    return this.findOne(trainer.id);
  }

  async submitReview(userId: number, data: { bookingId: number; rating: number; comment?: string }) {
    const [booking] = await this.drizzle.db.select().from(bookings).where(eq(bookings.id, data.bookingId));
    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.userId !== userId) throw new BadRequestException('Not your booking');
    
    const sessionDate = new Date(booking.date);
    if (sessionDate > new Date()) throw new BadRequestException('Cannot review a future session');

    await this.drizzle.db.insert(reviews).values({
      bookingId: data.bookingId,
      userId,
      trainerId: booking.trainerId,
      rating: data.rating,
      comment: data.comment,
    });

    const [avgRating] = await this.drizzle.db.select({
      value: avg(reviews.rating)
    }).from(reviews).where(eq(reviews.trainerId, booking.trainerId));

    await this.drizzle.db.update(trainers)
      .set({ rating: parseFloat(avgRating.value as string) || 5 })
      .where(eq(trainers.id, booking.trainerId));

    return { success: true };
  }

  async updateAvailability(userId: number, availabilityData: any[]) {
    const [trainer] = await this.drizzle.db.select().from(trainers).where(eq(trainers.userId, userId));
    if (!trainer) throw new NotFoundException('Trainer not found');

    await this.drizzle.db.delete(trainerAvailability).where(eq(trainerAvailability.trainerId, trainer.id));

    if (availabilityData.length > 0) {
      const values = availabilityData.map(a => ({
        trainerId: trainer.id,
        dayOfWeek: a.dayOfWeek,
        startTime: a.startTime,
        endTime: a.endTime,
        isClosed: a.isClosed,
      }));
      await this.drizzle.db.insert(trainerAvailability).values(values);
    }

    return this.findOne(trainer.id);
  }

  async updateProfile(userId: number, data: any) {
    const [trainer] = await this.drizzle.db.select().from(trainers).where(eq(trainers.userId, userId));
    if (!trainer) throw new NotFoundException('Trainer not found');

    // Update main profile
    await this.drizzle.db.update(trainers)
      .set({
        specialty: data.specialty,
        bio: data.bio,
        pricePerSession: data.pricePerSession,
        intensity: data.intensity,
        location: data.location,
        imageUrl: data.imageUrl,
      })
      .where(eq(trainers.id, trainer.id));

    // Update Specialties
    if (data.specialties) {
      await this.drizzle.db.delete(trainerSpecialties).where(eq(trainerSpecialties.trainerId, trainer.id));
      const allSpecs = await this.drizzle.db.select().from(specialties);
      const toInsert = allSpecs.filter(s => data.specialties.includes(s.name)).map(s => ({
        trainerId: trainer.id,
        specialtyId: s.id,
      }));
      if (toInsert.length > 0) await this.drizzle.db.insert(trainerSpecialties).values(toInsert);
    }

    // Update Focus
    if (data.focus) {
      await this.drizzle.db.delete(trainerTrainingFocus).where(eq(trainerTrainingFocus.trainerId, trainer.id));
      const allFocus = await this.drizzle.db.select().from(trainingFocus);
      const toInsert = allFocus.filter(f => data.focus.includes(f.name)).map(f => ({
        trainerId: trainer.id,
        focusId: f.id,
      }));
      if (toInsert.length > 0) await this.drizzle.db.insert(trainerTrainingFocus).values(toInsert);
    }

    return this.findOne(trainer.id);
  }

  async updateProfileImage(userId: number, imageUrl: string) {
    const [trainer] = await this.drizzle.db.select().from(trainers).where(eq(trainers.userId, userId));
    if (!trainer) throw new NotFoundException('Trainer not found');

    await this.drizzle.db.update(trainers)
      .set({ imageUrl })
      .where(eq(trainers.id, trainer.id));

    return { imageUrl };
  }
}
