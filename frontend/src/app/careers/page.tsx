"use client";

import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/Card";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-charcoal flex flex-col">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-32 flex-1 w-full space-y-16">
        <section className="space-y-6">
          <span className="text-muted-blue text-xs font-bold uppercase tracking-[0.3em] block">Join the Elite</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter italic font-serif">Build the Future of Fitness.</h1>
          <p className="text-off-white/60 text-xl leading-relaxed font-medium">
            We are looking for visionary engineers, designers, and fitness experts to help us scale the world's most premium training ecosystem.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-[10px] font-bold text-muted-blue uppercase tracking-[0.3em]">Open Positions</h2>
          <div className="grid grid-cols-1 gap-4">
            {["Senior Full-Stack Engineer", "Product Designer (UI/UX)", "Head of Trainer Success"].map((job) => (
              <Card key={job} className="p-6 flex justify-between items-center hover:border-muted-blue/40 transition-all border-white/5 bg-charcoal-light/20">
                <span className="text-off-white font-bold">{job}</span>
                <span className="text-muted-blue text-xs font-bold uppercase tracking-widest">Apply</span>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
