import Link from 'next/link';
import React from 'react';

export default function TrainerNavbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-xl font-semibold tracking-tight text-charcoal flex items-center gap-2">
            <span className="w-8 h-8 bg-charcoal rounded-sm flex items-center justify-center text-white font-bold text-sm">F</span>
            Fit <span className="text-xs text-muted-blue font-medium ml-1 hidden sm:inline-block">Trainer</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/trainer/dashboard" className="text-sm font-medium text-charcoal border-b-2 border-charcoal py-5">
              Dashboard
            </Link>
            <Link href="/trainer/calendar" className="text-sm font-medium text-charcoal-light hover:text-charcoal transition-colors py-5 border-b-2 border-transparent">
              Calendar
            </Link>
            <Link href="/trainer/clients" className="text-sm font-medium text-charcoal-light hover:text-charcoal transition-colors py-5 border-b-2 border-transparent">
              Clients
            </Link>
            <Link href="/trainer/earnings" className="text-sm font-medium text-charcoal-light hover:text-charcoal transition-colors py-5 border-b-2 border-transparent">
              Earnings
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/trainer/profile" className="flex items-center gap-3 group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-charcoal group-hover:text-muted-blue transition-colors">Marcus Sterling</p>
              <p className="text-xs text-charcoal-light font-light">Pro Trainer</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
              <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=200&auto=format&fit=crop" alt="Trainer avatar" className="w-full h-full object-cover" />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
