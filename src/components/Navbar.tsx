import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-off-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-semibold tracking-tight text-charcoal flex items-center gap-2">
          <span className="w-8 h-8 bg-charcoal rounded-sm flex items-center justify-center text-off-white font-bold text-lg">F</span>
          Fit
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium text-charcoal hover:text-muted-blue transition-colors">
            Log in
          </Link>
          <Link href="/book" className="text-sm font-medium bg-charcoal text-white px-6 py-2.5 rounded-sm hover:bg-charcoal-light transition-all shadow-sm">
            Book Trainer
          </Link>
        </div>
      </div>
    </nav>
  );
}
