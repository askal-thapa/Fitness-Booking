"use client";

import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-charcoal flex flex-col">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-32 flex-1 w-full space-y-16">
        <section className="space-y-6 text-center">
          <span className="text-muted-blue text-xs font-bold uppercase tracking-[0.3em] block">Support</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter italic font-serif">Get in Touch.</h1>
          <p className="text-off-white/40 text-lg max-w-xl mx-auto font-medium">
            Have questions about our trainers or corporate programs? Our concierge team is ready to assist.
          </p>
        </section>

        <section className="bg-charcoal-light/20 p-10 rounded-3xl border border-white/5 shadow-2xl">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Name" placeholder="Your Name" />
              <Input label="Email" placeholder="email@example.com" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-off-white/60 ml-1">Message</label>
              <textarea 
                className="bg-charcoal rounded-xl border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-muted-blue/50 transition-all text-off-white placeholder:text-off-white/20 min-h-[150px]"
                placeholder="How can we help?"
              />
            </div>
            <Button fullWidth>Send Inquiry</Button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
