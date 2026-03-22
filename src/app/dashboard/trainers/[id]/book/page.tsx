"use client";

import DashboardNavbar from "@/components/DashboardNavbar";
import Link from 'next/link';
import React, { useState } from 'react';

// Mock data
const trainer = {
  id: 1,
  name: "Marcus Sterling",
  specialty: "Strength & Conditioning",
  price: "£85",
  image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop",
  location: "Central London / Virtual"
};

const availableDates = [
  { day: "Thu", date: "24", full: "Thursday, October 24" },
  { day: "Fri", date: "25", full: "Friday, October 25" },
  { day: "Sat", date: "26", full: "Saturday, October 26" },
  { day: "Mon", date: "28", full: "Monday, October 28" },
  { day: "Tue", date: "29", full: "Tuesday, October 29" }
];

const availableTimes = ["08:00 AM", "09:30 AM", "11:00 AM", "14:00 PM", "15:30 PM", "17:00 PM"];

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(availableDates[0]);
  const [selectedTime, setSelectedTime] = useState("");

  return (
    <div className="min-h-screen bg-off-white">
      <DashboardNavbar />
      
      <main className="max-w-5xl mx-auto px-6 py-12">
        <Link href={`/dashboard/trainers/${trainer.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-charcoal-light hover:text-charcoal transition-colors mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Profile
        </Link>
        
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-charcoal mb-2">Schedule Session</h1>
          <p className="text-charcoal-light font-light text-lg">Select a convenient date and time for your training.</p>
        </div>
        
        <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden mb-8">
          {/* Trainer Context Header */}
          <div className="p-6 sm:p-8 bg-charcoal text-white flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 shrink-0 shadow-md">
              <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold mb-1">{trainer.name}</h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-300 text-sm font-light">
                <span className="flex items-center justify-center sm:justify-start gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {trainer.specialty}
                </span>
                <span className="hidden sm:inline-block text-gray-500">•</span>
                <span className="flex items-center justify-center sm:justify-start gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {trainer.location}
                </span>
              </div>
            </div>
            <div className="text-center sm:text-right hidden sm:block">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Session Rate</p>
              <p className="text-xl font-bold text-white">{trainer.price}</p>
            </div>
          </div>
          
          <div className="p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-1">
                {/* Step 1: Date */}
                <div className="mb-10">
                  <div className="flex justify-between items-end mb-6">
                    <h3 className="text-lg font-semibold text-charcoal">1. Select Date</h3>
                    <span className="text-sm font-medium text-muted-blue">{selectedDate.full}</span>
                  </div>
                  
                  <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                    {availableDates.map((dateObj, idx) => {
                      const isSelected = selectedDate.date === dateObj.date;
                      return (
                        <button 
                          key={idx}
                          onClick={() => setSelectedDate(dateObj)}
                          className={`flex flex-col items-center justify-center min-w-[5rem] py-4 rounded-sm border transition-all ${
                            isSelected 
                              ? 'border-charcoal bg-charcoal text-white shadow-md' 
                              : 'border-gray-200 bg-white text-charcoal hover:border-charcoal/30 hover:bg-gray-50'
                          }`}
                        >
                          <span className={`text-xs font-semibold uppercase mb-1 ${isSelected ? 'text-gray-300' : 'text-charcoal-light'}`}>
                            {dateObj.day}
                          </span>
                          <span className="text-2xl font-bold">{dateObj.date}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Step 2: Time */}
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-6">2. Select Time</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {availableTimes.map((time, idx) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 px-4 text-center border rounded-sm text-sm font-medium transition-all ${
                            isSelected
                              ? 'border-charcoal bg-charcoal text-white shadow-md'
                              : 'border-gray-200 bg-white text-charcoal hover:border-charcoal/30 hover:bg-gray-50'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="lg:w-[340px] shrink-0">
                <div className="bg-off-white p-6 sm:p-8 rounded-sm border border-gray-100 flex flex-col h-full">
                  <h3 className="text-lg font-semibold text-charcoal mb-6 border-b border-gray-200 pb-4">Booking Summary</h3>
                  
                  <div className="space-y-5 mb-auto">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider font-semibold text-charcoal-light mb-1">Trainer</span>
                      <span className="font-medium text-charcoal">{trainer.name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider font-semibold text-charcoal-light mb-1">Date</span>
                      <span className="font-medium text-charcoal">{selectedDate.full}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider font-semibold text-charcoal-light mb-1">Time</span>
                      <span className="font-medium text-charcoal">
                        {selectedTime ? selectedTime : <span className="text-gray-400 italic">Please select a time</span>}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider font-semibold text-charcoal-light mb-1">Duration</span>
                      <span className="font-medium text-charcoal">1 Hour Session</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-semibold text-charcoal">Total Amount</span>
                      <span className="text-2xl font-bold text-charcoal">{trainer.price}</span>
                    </div>
                    
                    <button 
                      className={`w-full py-4 rounded-sm font-medium text-sm uppercase tracking-wider transition-all flex justify-center items-center shadow-sm ${
                        selectedTime 
                          ? 'bg-charcoal text-white hover:bg-charcoal-light' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-200'
                      }`}
                      disabled={!selectedTime}
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
