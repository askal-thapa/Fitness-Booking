"use client";

import DashboardNavbar from "@/components/DashboardNavbar";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { bookingApi, trainerApi } from "@/lib/api";
import { toast } from "sonner";
import { Booking } from "@/types";

export default function BookingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past' | 'Cancelled'>('Upcoming');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [activeBookingId, setActiveBookingId] = useState<number | null>(null);
  const user = session?.user as any;

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-GB', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      });
    } catch (e) {
      return dateStr;
    }
  };

  const fetchBookings = async () => {
    if (!user?.accessToken) return;
    try {
      setLoading(true);
      const data = await bookingApi.getMyBookings(user.accessToken);
      setBookings(data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user?.accessToken]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBookingId || !user?.accessToken) return;

    try {
      await trainerApi.submitReview({
        bookingId: activeBookingId,
        rating: reviewRating,
        comment: reviewComment,
      }, user.accessToken);
      
      toast.success("Thank you for your review!");
      setShowReviewModal(false);
      setReviewComment('');
      setReviewRating(5);
      fetchBookings();
    } catch (err) {
      toast.error("Failed to submit review: " + (err as Error).message);
    }
  };

  const handleCancelAction = (id: number) => {
    setActiveBookingId(id);
    setShowCancelModal(true);
  };

  const handleCancelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBookingId || !user?.accessToken) return;

    try {
      await bookingApi.updateStatus(activeBookingId, 'cancelled', cancelReason, user.accessToken);
      toast.success("Booking cancelled successfully");
      setShowCancelModal(false);
      setCancelReason('');
      fetchBookings(); 
    } catch (err) {
      toast.error("Failed to cancel booking: " + (err as Error).message);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'Upcoming') return booking.status === 'pending' || booking.status === 'confirmed';
    if (activeTab === 'Past') return booking.status === 'completed';
    return booking.status === 'cancelled';
  });

  const getStatusBadge = (booking: Booking) => {
    if (booking.paymentStatus === 'unpaid') {
      return <span className="badge-premium bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending Payment</span>;
    }
    
    switch (booking.status) {
      case 'pending':
      case 'confirmed':
        return <span className="badge-premium bg-muted-blue/10 text-muted-blue border-muted-blue/20">Upcoming</span>;
      case 'completed':
        return <span className="badge-premium bg-white/5 text-off-white/40 border-white/5">Completed</span>;
      case 'cancelled':
        return <span className="badge-premium bg-red-500/10 text-red-500 border-red-500/20">Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-charcoal">
      <DashboardNavbar />
      
      <main className="page-container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-12">
          <div>
            <h1 className="section-header !mb-2">My <span className="text-muted-blue">Schedule</span></h1>
            <p className="text-muted text-base md:text-lg">Manage your upcoming workouts and track your fitness history.</p>
          </div>
          <Link href="/trainers" className="btn-primary w-full md:w-auto text-center">
            Book New Session
          </Link>
        </div>

        <div className="space-y-8">
          {/* Tabs */}
          <div className="flex border-b border-white/5 pt-2 overflow-x-auto hide-scrollbar gap-8">
            {['Upcoming', 'Past', 'Cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${
                  activeTab === tab 
                    ? 'text-white' 
                    : 'text-off-white/20 hover:text-off-white/60'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-muted-blue rounded-full shadow-[0_0_15px_rgba(74,101,114,0.6)]"></div>
                )}
              </button>
            ))}
          </div>

          {/* Bookings List */}
          <div className="grid grid-cols-1 gap-6">
            {loading ? (
               <div className="p-20 text-center text-muted italic text-lg animate-pulse">Preparing your personal schedule...</div>
            ) : filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <div key={booking.id} className="card-premium group flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="flex items-center gap-8">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-white/5 transition-transform duration-500 group-hover:scale-105">
                        <img src={booking.trainerImageUrl || "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=100&auto=format&fit=crop"} alt={booking.trainerName} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="flex flex-wrap items-center gap-4">
                          <h3 className="text-2xl font-black text-white tracking-tight leading-none">{booking.trainerName}</h3>
                          {getStatusBadge(booking)}
                        </div>
                        <p className="text-sm font-black text-muted-blue uppercase tracking-widest">{booking.trainerSpecialty}</p>
                        <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold text-off-white/30 uppercase tracking-widest pt-2">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-muted-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            {formatDate(booking.date)}
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-muted-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {booking.timeSlot}
                          </div>
                        </div>
                        {booking.cancellationReason && (
                          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mt-4">
                            <p className="text-xs text-red-400 font-bold uppercase tracking-widest mb-1">Reason for Cancellation</p>
                            <p className="text-sm text-red-500/80 font-medium italic">"{booking.cancellationReason}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-row lg:flex-col gap-4 justify-start sm:justify-end lg:w-48 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/5">
                      {(booking.status === 'pending' || booking.status === 'confirmed') ? (
                        <button 
                          onClick={() => handleCancelAction(booking.id)}
                          className="btn-secondary w-full text-xs text-red-400 border-red-400/20 hover:bg-red-500/10"
                        >
                          Cancel
                        </button>
                      ) : (
                        <div className="space-y-4 w-full">
                           {booking.status === 'completed' && !booking.isReviewed && (
                             <button 
                                onClick={() => {
                                  setActiveBookingId(booking.id);
                                  setShowReviewModal(true);
                                }}
                                className="btn-primary w-full text-xs"
                             >
                                Rate Session
                             </button>
                           )}
                           <Link href={`/trainers`} className="btn-secondary w-full text-xs block text-center">
                             Book Again
                           </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))
            ) : (
              <div className="card-premium p-20 text-center border-dashed border-2">
                <div className="w-20 h-20 bg-white/5 rounded-[28px] flex items-center justify-center mx-auto mb-8 border border-white/5">
                  <svg className="w-10 h-10 text-off-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">No {activeTab.toLowerCase()} sessions</h3>
                <p className="text-muted mb-8 italic">Your schedule is currently clear for this category.</p>
                {activeTab === 'Upcoming' && (
                  <Link href="/trainers" className="btn-primary inline-block">
                    Find a Trainer
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-charcoal/95 backdrop-blur-2xl flex items-center justify-center z-50 p-4">
          <div className="bg-charcoal-light rounded-[48px] shadow-2xl max-w-lg w-full animate-in zoom-in-95 duration-500 border border-white/5">
            <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <h2 className="text-4xl font-black text-white italic font-serif tracking-tight">Rate <span className="text-muted-blue">Session</span></h2>
              <button onClick={() => setShowReviewModal(false)} className="p-4 hover:bg-white/5 rounded-3xl transition-all group">
                <svg className="w-8 h-8 text-white/10 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleReviewSubmit} className="p-12 space-y-12">
               <div className="space-y-6 text-center">
                  <p className="text-[12px] font-black text-muted-blue uppercase tracking-[0.4em]">Session Quality</p>
                  <div className="flex justify-center gap-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className={`p-2 transition-all hover:scale-125 active:scale-95 ${reviewRating >= star ? 'text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]' : 'text-white/5'}`}
                      >
                        <svg className="w-12 h-12 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] font-black text-muted-blue uppercase tracking-[0.4em] ml-2">Experience Feedback</label>
                  <textarea 
                    rows={4}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Articulate your training results..."
                    className="input-premium resize-none"
                  />
               </div>

               <button 
                type="submit"
                className="btn-primary w-full"
               >
                 Submit Review
               </button>
            </form>
          </div>
        </div>
      )}

      {/* Cancellation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-charcoal/95 backdrop-blur-2xl flex items-center justify-center z-50 p-4">
          <div className="bg-charcoal-light rounded-[48px] shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-500 border border-white/5">
            <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <h2 className="text-4xl font-black text-white italic font-serif tracking-tight">Cancel <span className="text-muted-blue">Session</span></h2>
              <button onClick={() => setShowCancelModal(false)} className="p-4 hover:bg-white/5 rounded-3xl transition-all group">
                <svg className="w-8 h-8 text-white/10 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleCancelSubmit} className="p-12 space-y-12">
               <div className="space-y-4">
                  <p className="text-lg font-bold text-white tracking-tight">Cancel Session</p>
                  <p className="text-sm font-medium text-off-white/40 leading-relaxed italic">
                    We're sorry to see you cancel. Please let us know why so we can improve our services.
                  </p>
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] font-black text-red-400 uppercase tracking-[0.4em] ml-2">Reason for Cancellation</label>
                  <textarea 
                    rows={4}
                    required
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="e.g., Schedule conflict, Personal reasons..."
                    className="input-premium focus:border-red-400 resize-none shadow-red-500/5 focus:shadow-red-500/10"
                  />
               </div>

               <div className="flex gap-6">
                 <button 
                  type="button"
                  onClick={() => setShowCancelModal(false)}
                  className="btn-secondary flex-1"
                 >
                   Back
                 </button>
                 <button 
                  type="submit"
                  className="btn-primary flex-[2] bg-red-500 hover:bg-red-600 shadow-red-500/20"
                 >
                   Confirm
                 </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
