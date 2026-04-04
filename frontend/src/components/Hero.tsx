import Link from 'next/link';
import React from 'react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-charcall">
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <span className="inline-block py-2 px-4 rounded-full bg-muted-blue/10 text-muted-blue text-xs font-bold tracking-widest uppercase mb-6 border border-muted-blue/20">
          Premium Performance Tracking
        </span>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-8 max-w-5xl leading-[1.1]">
          Elevate Your <span className="text-muted-blue italic font-serif">Fitness Journey</span>
        </h1>
        <p className="text-xl md:text-2xl text-off-white/40 max-w-2xl mb-12 leading-relaxed font-medium">
          Experience tailored workout programs designed by elite professionals. 
          Discover a seamless way to book world-class trainers and achieve exceptional results.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
          <Link href="/login" className="px-10 py-5 bg-muted-blue text-white rounded-2xl font-bold hover:bg-muted-blue-hover transition-all shadow-xl shadow-muted-blue/20 w-full sm:w-auto text-xl hover:scale-105 active:scale-95">
            Get Started Free
          </Link>
          <Link href="/login" className="px-10 py-5 bg-white/5 text-off-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all w-full sm:w-auto text-xl backdrop-blur-sm">
            Explore Trainers
          </Link>
        </div>
      </div>
      
      {/* Decorative background elements for a subtle premium feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-muted-blue opacity-[0.07] blur-[150px] -z-10 rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white opacity-[0.03] blur-[100px] -z-10 rounded-full"></div>
    </section>
  );
}
