"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { onboardingApi, trainerApi, bookingApi } from "@/lib/api";
import { OnboardingData, Trainer, Booking } from "@/types";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [onboarding, setOnboarding] = useState<OnboardingData | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const userName = session?.user?.name || "User";
  const user = session?.user as any;

  useEffect(() => {
    if (!user?.accessToken) return;

    const fetchData = async () => {
      try {
        const [trainersData, onboardingData, bookingsData] = await Promise.all([
            trainerApi.getRecommended(user.accessToken),
            onboardingApi.getMe(user.accessToken),
            bookingApi.getMyBookings(user.accessToken)
        ]);
        setTrainers(trainersData);
        setOnboarding(onboardingData);
        setBookings(bookingsData);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.accessToken]);

  const upcomingBookings = bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').slice(0, 2);

  // Derived progress snapshot data
  const weight = onboarding?.weight || 0;
  const goal = onboarding?.goal || "Stay Fit";
  const workoutType = onboarding?.workoutType || "Gym";

  const isComplete = !!(onboarding && onboarding.age && onboarding.height && onboarding.weight);
  const showBanner = !isComplete;

  return (
    <div className="min-h-screen bg-charcoal flex flex-col">
      <DashboardNavbar />
      
      <main className="page-container">
        {showBanner && (
           <div className="bg-muted-blue/10 border border-muted-blue/20 rounded-[30px] p-6 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-xl">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-muted-blue rounded-xl flex items-center justify-center text-white shadow-lg">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <div>
                 <h3 className="text-lg font-bold text-white mb-0.5">Complete Your Fitness Profile</h3>
                 <p className="text-off-white/40 text-xs font-medium">Add your metrics to unlock personalized recommendations.</p>
               </div>
             </div>
             <Link href="/dashboard/profile">
               <Button className="px-6 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl shadow-xl">Complete Now</Button>
             </Link>
           </div>
        )}

        <div className="space-y-1">
          <h1 className="section-header">
            Welcome back, <span className="text-muted-blue italic font-serif tracking-tight">{userName}</span>
          </h1>
          <p className="text-muted text-lg tracking-tight font-medium uppercase text-[12px] opacity-60">
            Your Goal: <span className="text-white font-black">{goal}</span> via <span className="text-white font-black">{workoutType}</span> sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="card-premium col-span-1 md:col-span-2 relative overflow-hidden group border-none p-0">
            <div className="p-10 space-y-8 relative z-10">
              <div className="flex justify-between items-center">
                <div className="inline-flex px-4 py-1.5 rounded-full bg-muted-blue/10 text-muted-blue text-[10px] font-black uppercase tracking-[0.2em] border border-muted-blue/20">
                   Upcoming Schedule
                </div>
                <Link href="/dashboard/bookings" className="text-[10px] font-black text-muted-blue uppercase tracking-widest hover:text-white transition-colors">
                  Manage Bookings →
                </Link>
              </div>
              
              <div className="space-y-6">
                {upcomingBookings.length > 0 ? (
                  upcomingBookings.map(b => (
                    <div key={b.id} className="flex justify-between items-center bg-white/5 p-6 rounded-3xl border border-white/5 hover:bg-white/10 transition-all group/item">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-muted-blue/20 rounded-2xl flex items-center justify-center text-muted-blue shadow-inner group-hover/item:scale-110 transition-transform">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <div>
                          <h4 className="font-black text-white text-xl tracking-tight leading-none mb-1">{b.trainerName}</h4>
                          <p className="text-xs font-bold text-muted-blue uppercase tracking-widest">{b.date} at {b.timeSlot}</p>
                        </div>
                      </div>
                      <Link href="/dashboard/bookings">
                        <button className="btn-secondary py-2.5 px-6 text-[10px]">View</button>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-muted italic py-4">Status: No sessions scheduled yet.</p>
                )}
              </div>
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                    <line x1="6" y1="1" x2="6" y2="4"></line>
                    <line x1="10" y1="1" x2="10" y2="4"></line>
                    <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
            </div>
          </Card>

          <Card className="card-premium space-y-8 flex flex-col justify-between border-muted-blue/20 bg-muted-blue/5 border-none">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white tracking-tight uppercase text-[14px]">Performance Tracker</h3>
              <p className="text-sm font-medium text-muted-blue uppercase tracking-widest">Status: <span className="text-white font-black">Stable @ {weight}KG</span></p>
            </div>
            <div className="flex items-end gap-3 h-32 pt-8">
               {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                 <div key={i} className="flex-1 bg-muted-blue/30 rounded-t-xl hover:bg-muted-blue transition-all group relative border-t border-muted-blue/20 shadow-inner" style={{ height: `${h}%` }}>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-charcoal-muted text-white text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl border border-white/5 backdrop-blur-md">
                        {h}% Volume
                    </div>
                 </div>
               ))}
            </div>
            <div className="pt-6 border-t border-white/5 flex justify-between items-center text-off-white/10">
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">MTWTFSS</span>
              <span className="text-[10px] font-black text-muted-blue tracking-[0.2em]">+12% Growth</span>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white tracking-tight">Recommended For You</h2>
              <p className="text-off-white/40 text-sm">Personalized matches based on your fitness goals.</p>
            </div>
            <Link href="/trainers">
              <Button variant="outline" className="py-2 px-4 text-xs">View All Professionals</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
                [1,2,3,4].map(i => (
                    <div key={i} className="h-80 bg-white/5 rounded-3xl animate-pulse" />
                ))
            ) : trainers.map((trainer) => (
                <Link key={trainer.id} href={`/trainers/${trainer.id}`} className="group h-full">
                  <Card className="card-premium p-4 space-y-6 hover:translate-y-[-8px] transition-all flex flex-col h-full bg-white/5 border-none scale-100 group-hover:scale-[1.02]">
                    <div className="aspect-[4/5] rounded-[24px] overflow-hidden bg-muted-blue/10 relative shadow-2xl">
                      <img src={trainer.imageUrl || "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=200&auto=format&fit=crop"} alt={trainer.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-center flex-1 px-2">
                      <h4 className="text-xl font-black text-white group-hover:text-muted-blue transition-colors tracking-tight leading-none mb-2">{trainer.name}</h4>
                      <p className="text-[10px] text-muted-blue font-black uppercase tracking-widest mb-3">{trainer.specialty}</p>
                      <p className="text-[11px] text-muted line-clamp-2 italic leading-relaxed">{trainer.bio}</p>
                    </div>
                    <div className="mt-auto">
                      <button className="w-full btn-secondary py-3 text-[10px] group-hover:bg-muted-blue group-hover:text-white group-hover:border-transparent transition-all">View Trainer</button>
                    </div>
                  </Card>
                </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
