"use client";

import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trainerApi, bookingApi } from "@/lib/api";
import { Trainer, Booking } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useSession } from 'next-auth/react';
import { toast } from "sonner";

export default function PublicTrainerDetailsPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [existingBookings, setExistingBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const trainerId = parseInt(id as string);
        if (isNaN(trainerId)) {
            setLoading(false);
            return;
        }
        const [trainerData, bookingsData] = await Promise.all([
            trainerApi.getOne(id as string),
            bookingApi.getByTrainer(trainerId)
        ]);
        setTrainer(trainerData);
        setExistingBookings(bookingsData);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const generateSlots = () => {
    if (!trainer?.availability) return [];
    const dateObj = new Date(selectedDate);
    const dayOfWeek = dateObj.getDay();
    const dayConfig = trainer.availability.find(a => a.dayOfWeek === dayOfWeek);
    
    if (!dayConfig || dayConfig.isClosed) return [];

    const slots = [];
    let current = parseInt(dayConfig.startTime.split(':')[0]);
    const end = parseInt(dayConfig.endTime.split(':')[0]);

    const now = new Date();
    const isToday = selectedDate === now.toISOString().split('T')[0];
    const bufferHour = now.getHours() + 5;

    while (current < end) {
      // Rule: can only book upfront of today 5hr (i.e. if today, must be current hour + 5)
      if (isToday && current < bufferHour) {
        current++;
        continue;
      }

      const time = `${current.toString().padStart(2, '0')}:00`;
      slots.push(time);
      current++;
    }
    return slots;
  };

  const handleBooking = async () => {
    if (!session?.user) {
        router.push(`/login?callbackUrl=/trainers/${id}`);
        return;
    }
    if (!selectedSlot || !trainer) return;

    setIsBooking(true);
    try {
        const user = session.user as any;
        await bookingApi.create({
            trainerId: trainer.id,
            date: selectedDate,
            timeSlot: selectedSlot,
        }, user.accessToken);
        
        // Refresh bookings
        const updatedBookings = await bookingApi.getByTrainer(trainer?.id!);
        setExistingBookings(updatedBookings);
        setSelectedSlot(null);
        toast.success("Booking confirmed!");
    } catch (err) {
        toast.error("Failed to create booking");
    } finally {
        setIsBooking(false);
    }
  };

  const isSlotBooked = (slot: string) => {
    // Exact date match for the selected day
    return existingBookings.some(b => b.date.startsWith(selectedDate) && b.timeSlot === slot);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-muted-blue/20 border-t-muted-blue rounded-full animate-spin" />
      </div>
    );
  }

  if (!trainer) {
    return (
      <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold mb-4">Trainer Not Found</h1>
        <Button onClick={() => router.push('/trainers')}>Back to Directory</Button>
      </div>
    );
  }

  const slots = generateSlots();
  const next7Days = getNext7Days();

  return (
    <div className="min-h-screen bg-charcoal flex flex-col">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-32 flex-1 w-full">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-off-white/40 hover:text-white transition-colors mb-12 group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          <span className="text-xs font-bold uppercase tracking-widest">Back to Directory</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <section className="relative rounded-3xl overflow-hidden bg-charcoal-light/30 border border-white/5">
              <div className="h-64 bg-muted-blue/10 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-charcoal/80 z-10" />
                 <img src={trainer.imageUrl || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"} className="w-full h-full object-cover opacity-40 blur-sm scale-110" alt="" />
              </div>
              
              <div className="px-10 pb-10">
                <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-end -mt-20 relative z-20">
                  <div className="w-40 h-40 rounded-2xl border-4 border-charcoal overflow-hidden bg-charcoal shadow-2xl shrink-0">
                     <img src={trainer.imageUrl || "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=200&auto=format&fit=crop"} alt={trainer.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h1 className="text-4xl font-bold text-white tracking-tighter italic font-serif">{trainer.name}</h1>
                        <p className="text-muted-blue font-bold uppercase tracking-[0.2em] text-xs">{trainer.specialty}</p>
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold text-white border border-white/10 shadow-xl">
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {trainer.rating?.toFixed(1) || "5.0"}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 mt-10 border-t border-white/5 text-center sm:text-left">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-muted-blue uppercase tracking-widest">Location</p>
                    <p className="text-sm font-medium text-off-white">{trainer.location}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-muted-blue uppercase tracking-widest">Focus</p>
                    <p className="text-sm font-medium text-off-white">{Array.isArray(trainer.focus) ? trainer.focus.join(', ') : trainer.focus || 'General Fitness'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-muted-blue uppercase tracking-widest">Intensity</p>
                    <p className="text-sm font-medium text-off-white">Level {trainer.intensity}/5</p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-bold text-muted-blue uppercase tracking-widest">Rate</p>
                     <p className="text-sm font-medium text-off-white">£{trainer.pricePerSession?.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </section>
            
            <Card className="p-10 space-y-8 border-white/5 bg-charcoal-light/20">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight">Biography</h2>
                <p className="text-off-white/60 leading-relaxed text-lg font-medium italic">
                  "{trainer.bio}"
                </p>
              </div>
            </Card>

            {/* Reviews Section */}
            <section className="space-y-8">
               <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  Client Reviews
                  <span className="text-sm font-medium text-off-white/40">({trainer.reviews?.length || 0})</span>
               </h2>
               
               <div className="grid gap-6">
                  {trainer.reviews && trainer.reviews.length > 0 ? (
                    trainer.reviews.map(review => (
                      <Card key={review.id} className="p-8 border-white/5 bg-white/5 space-y-4">
                         <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-muted-blue/20 flex items-center justify-center text-muted-blue font-bold text-sm">
                                  {review.userName.charAt(0)}
                               </div>
                               <div>
                                  <p className="font-bold text-white">{review.userName}</p>
                                  <p className="text-[10px] text-off-white/40 uppercase tracking-widest">{new Date(review.createdAt).toLocaleDateString()}</p>
                               </div>
                            </div>
                            <div className="flex gap-0.5">
                               {[1,2,3,4,5].map(star => (
                                 <svg key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-500' : 'text-white/10'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                 </svg>
                               ))}
                            </div>
                         </div>
                         <p className="text-off-white/60 leading-relaxed italic">"{review.comment}"</p>
                      </Card>
                    ))
                  ) : (
                    <p className="text-off-white/20 italic">No reviews yet for this professional.</p>
                  )}
               </div>
            </section>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="p-10 sticky top-32 space-y-8 border-muted-blue/20 bg-muted-blue/5">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">Schedule</h2>
                <p className="text-off-white/40 text-[10px] font-bold uppercase tracking-widest text-center">Next 7 Days Availability</p>
              </div>

              <div className="space-y-8">
                {/* Custom Date Selector */}
                <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                    {next7Days.map((date) => {
                        const dateStr = date.toISOString().split('T')[0];
                        const isSelected = selectedDate === dateStr;
                        return (
                            <button
                                key={dateStr}
                                onClick={() => {
                                    setSelectedDate(dateStr);
                                    setSelectedSlot(null);
                                }}
                                className={`flex-shrink-0 w-14 py-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1 ${
                                    isSelected 
                                        ? 'bg-muted-blue border-muted-blue text-white shadow-lg' 
                                        : 'bg-white/5 border-white/10 text-off-white/60 hover:border-white/20'
                                }`}
                            >
                                <span className="text-[10px] font-bold uppercase tracking-tighter">
                                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                </span>
                                <span className="text-lg font-black tracking-tighter leading-none">
                                    {date.getDate()}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {slots.length > 0 ? (
                        slots.map(slot => {
                            const isBooked = isSlotBooked(slot);
                            return (
                                <button
                                    key={slot}
                                    disabled={isBooked}
                                    onClick={() => setSelectedSlot(slot)}
                                    className={`py-3 rounded-xl border text-xs font-bold transition-all relative overflow-hidden ${
                                        isBooked 
                                            ? 'bg-red-500/10 border-red-500/30 text-red-500 cursor-not-allowed opacity-80' 
                                            : selectedSlot === slot 
                                                ? 'bg-muted-blue border-muted-blue text-white shadow-lg' 
                                                : 'bg-white/5 border-white/10 text-off-white hover:border-white/20'
                                    }`}
                                >
                                    {slot}
                                    {isBooked && (
                                        <div className="absolute top-0 right-0">
                                            <div className="bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-bl-lg font-black uppercase">Full</div>
                                        </div>
                                    )}
                                </button>
                            );
                        })
                    ) : (
                        <div className="col-span-2 py-8 text-center text-off-white/20 italic text-sm">
                            No availability for this day.
                        </div>
                    )}
                </div>
              </div>
              
              <div className="py-6 border-y border-white/5 space-y-4">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-off-white/40 font-bold uppercase">Rate per Session</span>
                    <span className="text-white font-bold text-lg leading-none">£{trainer.pricePerSession?.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                fullWidth 
                disabled={!selectedSlot || isBooking} 
                onClick={handleBooking}
              >
                {isBooking ? 'Confirming...' : 'Book Professional'}
              </Button>
              
              {!session?.user && (
                <p className="text-[10px] text-center text-off-white/20 font-bold uppercase tracking-widest">
                    Authentication required
                </p>
              )}
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
