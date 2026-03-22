import DashboardNavbar from "@/components/DashboardNavbar";
import { mockTrainers } from "@/data/mockTrainers";
import TrainerCard from "@/components/TrainerCard";
import React from 'react';

export default function BrowseTrainersPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <DashboardNavbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header & Filters */}
        <section className="mb-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-charcoal mb-2">Elite Professionals</h1>
            <p className="text-charcoal-light font-light text-lg">Discover and connect with world-class trainers tailored to your goals.</p>
          </div>
          
          <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-2">
              <label htmlFor="location" className="block text-xs font-semibold text-charcoal uppercase tracking-wider">Location</label>
              <select id="location" className="w-full bg-off-white border border-gray-200 text-charcoal text-sm rounded-sm px-4 py-3 outline-none focus:border-charcoal transition-colors">
                <option>All Locations</option>
                <option>Central London</option>
                <option>Chelsea</option>
                <option>Kensington</option>
                <option>Notting Hill</option>
                <option>Soho</option>
              </select>
            </div>
            
            <div className="flex-1 space-y-2">
              <label htmlFor="specialty" className="block text-xs font-semibold text-charcoal uppercase tracking-wider">Specialization</label>
              <select id="specialty" className="w-full bg-off-white border border-gray-200 text-charcoal text-sm rounded-sm px-4 py-3 outline-none focus:border-charcoal transition-colors">
                <option>All Specialties</option>
                <option>Strength & Conditioning</option>
                <option>Pilates & Core Dynamics</option>
                <option>High-Intensity Interval</option>
                <option>Yoga & Flexibility</option>
                <option>Rehabilitation & Mobility</option>
              </select>
            </div>
            
            <div className="flex-1 space-y-2">
              <label htmlFor="price" className="block text-xs font-semibold text-charcoal uppercase tracking-wider">Price Range</label>
              <select id="price" className="w-full bg-off-white border border-gray-200 text-charcoal text-sm rounded-sm px-4 py-3 outline-none focus:border-charcoal transition-colors">
                <option>Any Price</option>
                <option>£50 - £75 / session</option>
                <option>£75 - £100 / session</option>
                <option>£100+ / session</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button className="w-full md:w-auto px-8 py-3 bg-charcoal text-white text-sm font-medium rounded-sm hover:bg-charcoal-light transition-colors shadow-sm">
                Filter Results
              </button>
            </div>
          </div>
        </section>

        {/* Trainers Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockTrainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </section>
      </main>
    </div>
  );
}
