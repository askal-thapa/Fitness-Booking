import React from 'react';
import { mockTrainers } from '@/data/mockTrainers';
import TrainerCard from '@/components/TrainerCard';
import Link from 'next/link';

export default function Trainers() {
  // Only show first 3 for landing page
  const featuredTrainers = mockTrainers.slice(0, 3);

  return (
    <section className="py-24 bg-off-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Elite Professionals</h2>
            <p className="text-charcoal-light max-w-xl text-lg font-light">
              Train with industry-leading experts dedicated to pushing your boundaries.
            </p>
          </div>
          <Link href="/dashboard/trainers" className="text-muted-blue font-medium hover:text-charcoal transition-colors flex items-center gap-2">
            View All Trainers
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTrainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      </div>
    </section>
  );
}
