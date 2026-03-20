import Link from 'next/link';
import React from 'react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <span className="inline-block py-1 px-3 rounded-full bg-muted-blue/10 text-muted-blue text-xs font-semibold tracking-wider uppercase mb-6">
          Premium Personal Training
        </span>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-charcoal mb-8 max-w-4xl leading-tight">
          Elevate Your <span className="text-muted-blue">Fitness Journey</span>
        </h1>
        <p className="text-lg md:text-xl text-charcoal-light max-w-2xl mb-12 leading-relaxed font-light">
          Experience tailored workout programs designed by elite professionals. 
          Discover a seamless way to book world-class trainers and achieve exceptional results.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Link href="/get-started" className="px-8 py-4 bg-muted-blue text-white rounded-sm font-medium hover:bg-muted-blue-hover transition-all shadow-md w-full sm:w-auto text-lg">
            Get Started
          </Link>
          <Link href="/discover" className="px-8 py-4 bg-white text-charcoal border border-gray-200 rounded-sm font-medium hover:border-charcoal/20 hover:bg-gray-50 transition-all w-full sm:w-auto text-lg">
            View Trainers
          </Link>
        </div>
      </div>
      
      {/* Decorative background elements for a subtle premium feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-muted-blue opacity-5 blur-[120px] -z-10 rounded-full"></div>
    </section>
  );
}
