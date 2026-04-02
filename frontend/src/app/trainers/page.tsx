"use client";

import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrainerCard from "@/components/TrainerCard";
import { trainerApi } from "@/lib/api";
import { TRAINING_FOCUS } from "@/lib/constants";
import { Trainer } from "@/types";

export default function PublicTrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [allTrainers, setAllTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFocus, setSelectedFocus] = useState<string[]>([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        const data = await trainerApi.getAll();
        setAllTrainers(data);
        setTrainers(data);
      } catch (err) {
        console.error("Failed to fetch trainers", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, []);

  // Filter whenever selectedFocus changes
  useEffect(() => {
    if (selectedFocus.length === 0) {
      setTrainers(allTrainers);
    } else {
      const filtered = allTrainers.filter(t =>
        t.focus?.some(f => selectedFocus.includes(f))
      );
      setTrainers(filtered);
    }
  }, [selectedFocus, allTrainers]);

  const toggleFocus = (value: string) => {
    setSelectedFocus(prev =>
      prev.includes(value)
        ? prev.filter(s => s !== value)
        : [...prev, value]
    );
  };

  const clearFilters = () => setSelectedFocus([]);

  return (
    <div className="min-h-screen bg-charcoal flex flex-col">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-32 flex-1 w-full">
        <section className="mb-16 text-center md:text-left">
          <div className="mb-12">
            <span className="text-muted-blue text-xs font-bold uppercase tracking-[0.3em] mb-4 block">The Directory</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-4 italic font-serif">Elite Professionals</h1>
            <p className="text-off-white/40 font-medium text-xl max-w-2xl">Connect with world-class trainers meticulously curated for your transformation.</p>
          </div>
          
          {/* Training Focus Pill Filters */}
          <div className="bg-charcoal-light/30 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-2xl border border-white/5">
            <div className="flex items-center justify-between mb-5">
              <label className="text-[10px] font-bold text-muted-blue uppercase tracking-widest">Filter by Focus</label>
              {selectedFocus.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-[10px] font-bold text-off-white/40 uppercase tracking-widest hover:text-muted-blue transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {TRAINING_FOCUS.map(f => {
                const isActive = selectedFocus.includes(f.value);
                return (
                  <button
                    key={f.value}
                    onClick={() => toggleFocus(f.value)}
                    className={`
                      px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 
                      border flex items-center gap-2 active:scale-95
                      ${isActive
                        ? 'bg-muted-blue border-muted-blue text-white shadow-lg shadow-muted-blue/20'
                        : 'bg-charcoal border-white/10 text-off-white/60 hover:border-white/20 hover:text-off-white'
                      }
                    `}
                  >
                    <span className="text-base">{f.icon}</span>
                    {f.label}
                  </button>
                );
              })}
            </div>
            {selectedFocus.length > 0 && (
              <p className="text-off-white/30 text-xs mt-4">
                Showing trainers matching {selectedFocus.length} {selectedFocus.length === 1 ? 'focus' : 'focus areas'}
              </p>
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
             [1,2,3,4,5,6].map(i => (
                <div key={i} className="h-[500px] bg-charcoal-light/50 rounded-3xl animate-pulse border border-white/5" />
             ))
          ) : trainers.length > 0 ? (
            trainers.map((trainer) => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))
          ) : (
            <div className="col-span-full py-40 text-center">
                <p className="text-off-white/20 italic text-2xl font-serif">No trainers match your filters.</p>
                <button onClick={clearFilters} className="mt-4 text-muted-blue text-sm font-bold hover:underline">
                  Clear filters
                </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
