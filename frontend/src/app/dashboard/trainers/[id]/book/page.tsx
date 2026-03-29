"use client";

import DashboardNavbar from "@/components/DashboardNavbar";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { trainerApi, bookingApi } from "@/lib/api";
import { Trainer } from "@/types";
import { toast } from "sonner";

const availableDates = [
  { day: "Thu", date: "2026-04-09", display: "09", full: "Thursday, April 9" },
  { day: "Fri", date: "2026-04-10", display: "10", full: "Friday, April 10" },
  { day: "Sat", date: "2026-04-11", display: "11", full: "Saturday, April 11" },
  { day: "Mon", date: "2026-04-13", display: "13", full: "Monday, April 13" },
  { day: "Tue", date: "2026-04-14", display: "14", full: "Tuesday, April 14" }
];

const availableTimes = ["08:00", "09:30", "11:00", "14:00", "15:30", "17:00"];

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [selectedDate, setSelectedDate] = useState(availableDates[0]);
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const user = session?.user as any;

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const data = await trainerApi.getOne(id as string, user?.accessToken);
        setTrainer(data);
      } catch (err) {
        toast.error("Failed to fetch trainer details");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTrainer();
  }, [id, user?.accessToken]);

  const handleBooking = async () => {
    if (!selectedTime || !user?.accessToken || !trainer) return;

    try {
      setBookingLoading(true);
      const response = await bookingApi.create({
        trainerId: trainer.id,
        date: selectedDate.date,
        timeSlot: selectedTime,
      }, user.accessToken);

      if (response.checkoutUrl) {
        toast.success("Redirecting to secure payment...");
        window.location.href = response.checkoutUrl;
      } else {
        toast.success("Booking initiated. Please check your schedule.");
        router.push("/dashboard/bookings");
      }
    } catch (err) {
      toast.error("Booking failed: " + (err as Error).message);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-charcoal flex items-center justify-center text-white">Loading evolution parameters...</div>;
  if (!trainer) return <div className="min-h-screen bg-charcoal flex items-center justify-center text-white">Trainer not found</div>;

  return (
    <div className="min-h-screen bg-charcoal">
      <DashboardNavbar />
      
      <main className="page-container">
        <Link href={`/dashboard/trainers/${trainer.id}`} className="inline-flex items-center gap-2 text-sm font-black text-muted-blue hover:text-white transition-all uppercase tracking-widest mb-12 group">
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Profile
        </Link>
        
        <div className="mb-14">
          <h1 className="section-header">Schedule <span className="text-muted-blue">Session</span></h1>
          <p className="text-muted text-lg font-medium">Select a convenient timeframe for your personalized training evolution.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Trainer Snapshot */}
            <div className="card-premium flex flex-col md:flex-row items-center gap-8 bg-muted-blue/5 border-muted-blue/10">
              <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-muted-blue/20 shrink-0 shadow-2xl">
                <img src={trainer.imageUrl} alt={trainer.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-black text-white italic font-serif mb-1">{trainer.name}</h2>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-[10px] font-black text-muted-blue uppercase tracking-[0.2em]">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    {trainer.specialty}
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {trainer.location || "Online"}
                  </span>
                </div>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-[10px] font-black text-off-white/20 uppercase tracking-[0.3em] mb-1">Session Rate</p>
                <p className="text-2xl font-black text-white">${trainer.pricePerSession}</p>
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-8">
               <div className="flex justify-between items-end">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="w-2 h-6 bg-muted-blue rounded-full"></span>
                    1. Select Date
                  </h3>
                  <span className="text-[11px] font-black text-muted-blue uppercase tracking-widest">{selectedDate.full}</span>
               </div>
               
               <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                  {availableDates.map((dateObj, idx) => {
                    const isSelected = selectedDate.date === dateObj.date;
                    return (
                      <button 
                        key={idx}
                        onClick={() => setSelectedDate(dateObj)}
                        className={`flex flex-col items-center justify-center min-w-[100px] py-6 rounded-[24px] border-2 transition-all duration-300 ${
                          isSelected 
                            ? 'border-muted-blue bg-muted-blue/10 text-white shadow-[0_0_20px_rgba(74,101,114,0.2)]' 
                            : 'border-white/5 bg-white/5 text-off-white/40 hover:border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <span className={`text-[10px] font-black uppercase mb-2 tracking-widest ${isSelected ? 'text-muted-blue' : 'text-off-white/20'}`}>
                          {dateObj.day}
                        </span>
                        <span className="text-3xl font-black tracking-tighter">{dateObj.display}</span>
                      </button>
                    );
                  })}
               </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-8">
               <h3 className="text-xl font-bold text-white flex items-center gap-3">
                 <span className="w-2 h-6 bg-muted-blue rounded-full"></span>
                 2. Select Time Slot
               </h3>
               <div className="grid grid-cols-2 shadow-sm rounded-xl sm:grid-cols-3 gap-6">
                  {availableTimes.map((time, idx) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedTime(time)}
                        className={`py-5 px-6 text-center border-2 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                          isSelected
                            ? 'border-muted-blue bg-muted-blue/10 text-white shadow-[0_0_20px_rgba(74,101,114,0.2)]'
                            : 'border-white/5 bg-white/5 text-off-white/40 hover:border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
               </div>
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-premium sticky top-32 overflow-hidden">
               <div className="p-2 border-b border-white/5 mb-8">
                  <h3 className="text-xl font-bold text-white tracking-tight">Booking Summary</h3>
               </div>
               
               <div className="space-y-8 mb-10">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-off-white/20">Trainer</span>
                    <span className="text-lg font-bold text-white">{trainer.name}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-off-white/20">Protocol Schedule</span>
                    <span className="text-lg font-bold text-white">{selectedDate.full}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-off-white/20">Temporal Slot</span>
                    <span className="text-lg font-bold text-muted-blue">
                      {selectedTime ? selectedTime : <span className="text-off-white/10 italic">Awaiting selection...</span>}
                    </span>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-center text-xs">
                       <span className="text-off-white/40 font-bold uppercase tracking-widest">Duration</span>
                       <span className="text-white font-black">60 MINS</span>
                    </div>
                  </div>
               </div>
               
               <div className="pt-8 border-t border-white/5 space-y-8">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-off-white/20">Total Investment</span>
                    <span className="text-3xl font-black text-white">${trainer.pricePerSession}</span>
                  </div>
                  
                  <button 
                    onClick={handleBooking}
                    disabled={!selectedTime || bookingLoading}
                    className={`btn-primary w-full ${(!selectedTime || bookingLoading) ? 'opacity-30 cursor-not-allowed grayscale' : ''}`}
                  >
                    {bookingLoading ? "Initializing..." : "Confirm Protocol"}
                  </button>
                  <p className="text-center text-[10px] font-medium text-off-white/20 tracking-wide uppercase px-4 leading-relaxed">
                    By confirming, you agree to the trainer's professional cancellation policy.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
