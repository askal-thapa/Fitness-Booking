"use client";

import DashboardNavbar from "@/components/DashboardNavbar";
import React, { useState } from 'react';
import Link from 'next/link';

// Mock bookings data
const bookings = [
  {
    id: "B-1049",
    trainerName: "Marcus Sterling",
    trainerImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=100&auto=format&fit=crop",
    type: "Strength & Conditioning",
    date: "Thu, Oct 24, 2026",
    time: "08:00 AM - 09:00 AM",
    status: "Upcoming",
    location: "Central London"
  },
  {
    id: "B-1050",
    trainerName: "Eleanor Vance",
    trainerImage: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=100&auto=format&fit=crop",
    type: "Pilates & Core Dynamics",
    date: "Mon, Oct 28, 2026",
    time: "17:30 PM - 18:30 PM",
    status: "Upcoming",
    location: "Kensington"
  },
  {
    id: "B-1033",
    trainerName: "Julian Cross",
    trainerImage: "https://images.unsplash.com/photo-1567013127542-490d732e5814?q=80&w=100&auto=format&fit=crop",
    type: "High-Intensity Interval",
    date: "Tue, Oct 15, 2026",
    time: "07:00 AM - 08:00 AM",
    status: "Completed",
    location: "Soho"
  },
  {
    id: "B-1021",
    trainerName: "Sophia Laurent",
    trainerImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=100&auto=format&fit=crop",
    type: "Yoga & Flexibility",
    date: "Fri, Oct 04, 2026",
    time: "18:00 PM - 19:00 PM",
    status: "Cancelled",
    location: "Virtual"
  }
];

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past' | 'Cancelled'>('Upcoming');

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'Past') return booking.status === 'Completed';
    return booking.status === activeTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return <span className="px-3 py-1 bg-muted-blue/10 text-muted-blue text-xs font-semibold rounded-full uppercase tracking-wider">Upcoming</span>;
      case 'Completed':
        return <span className="px-3 py-1 bg-gray-100 text-charcoal-light text-xs font-semibold rounded-full uppercase tracking-wider">Completed</span>;
      case 'Cancelled':
        return <span className="px-3 py-1 bg-red-50 text-red-500 text-xs font-semibold rounded-full uppercase tracking-wider">Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-off-white">
      <DashboardNavbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-charcoal mb-2">My Bookings</h1>
            <p className="text-charcoal-light font-light text-lg">Manage your upcoming sessions and review past training history.</p>
          </div>
          <Link href="/dashboard/trainers" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-charcoal text-white text-sm font-medium rounded-sm hover:bg-charcoal-light transition-colors shadow-sm">
            Book New Session
          </Link>
        </div>

        <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100 px-6 pt-2 overflow-x-auto hide-scrollbar">
            {['Upcoming', 'Past', 'Cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-4 text-sm font-medium transition-colors relative whitespace-nowrap ${
                  activeTab === tab 
                    ? 'text-charcoal' 
                    : 'text-gray-400 hover:text-charcoal-light'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-charcoal"></div>
                )}
              </button>
            ))}
          </div>

          {/* Bookings List */}
          <div className="p-0 sm:p-2">
            {filteredBookings.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {filteredBookings.map((booking) => (
                  <div key={booking.id} className="p-6 hover:bg-gray-50/50 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6 group">
                    <div className="flex items-start sm:items-center gap-6">
                      <div className="w-16 h-16 rounded-sm overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                        <img src={booking.trainerImage} alt={booking.trainerName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-charcoal">{booking.trainerName}</h3>
                          {getStatusBadge(booking.status)}
                        </div>
                        <p className="text-sm font-medium text-muted-blue mb-2">{booking.type}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-charcoal-light mt-1">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            {booking.date}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {booking.time}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {booking.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-row lg:flex-col gap-3 justify-start sm:justify-end border-t lg:border-t-0 border-gray-100 pt-4 lg:pt-0 mt-2 lg:mt-0 lg:w-36">
                      {booking.status === 'Upcoming' ? (
                        <>
                          <button className="w-full py-2.5 bg-charcoal text-white text-sm font-medium rounded-sm hover:bg-charcoal-light transition-colors shadow-sm text-center">
                            Reschedule
                          </button>
                          <button className="w-full py-2.5 border border-gray-200 text-charcoal text-sm font-medium rounded-sm hover:bg-gray-50 transition-colors text-center">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button className="w-full py-2.5 border border-charcoal text-charcoal text-sm font-medium rounded-sm hover:bg-charcoal hover:text-white transition-colors text-center">
                          Book Again
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-16 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-lg font-medium text-charcoal mb-2">No {activeTab.toLowerCase()} sessions</h3>
                <p className="text-gray-500 mb-6 font-light">You don't have any {activeTab.toLowerCase()} bookings at the moment.</p>
                {activeTab === 'Upcoming' && (
                  <Link href="/dashboard/trainers" className="inline-block px-8 py-3 bg-charcoal text-white text-sm font-medium rounded-sm hover:bg-charcoal-light transition-colors shadow-sm">
                    Find a Trainer
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
