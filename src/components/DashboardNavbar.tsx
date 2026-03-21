"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function DashboardNavbar() {
  const pathname = usePathname() || '';

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-xl font-semibold tracking-tight text-charcoal flex items-center gap-2">
            <span className="w-8 h-8 bg-charcoal rounded-sm flex items-center justify-center text-white font-bold text-sm">F</span>
            Fit
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/dashboard" 
              className={`text-sm font-medium py-5 border-b-2 transition-colors ${
                pathname === '/dashboard' 
                  ? 'text-charcoal border-charcoal' 
                  : 'text-charcoal-light hover:text-charcoal border-transparent'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/dashboard/trainers" 
              className={`text-sm font-medium py-5 border-b-2 transition-colors ${
                pathname.startsWith('/dashboard/trainers') 
                  ? 'text-charcoal border-charcoal' 
                  : 'text-charcoal-light hover:text-charcoal border-transparent'
              }`}
            >
              Trainers
            </Link>
            <Link 
              href="/dashboard/bookings" 
              className={`text-sm font-medium py-5 border-b-2 transition-colors ${
                pathname.startsWith('/dashboard/bookings') 
                  ? 'text-charcoal border-charcoal' 
                  : 'text-charcoal-light hover:text-charcoal border-transparent'
              }`}
            >
              Bookings
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/profile" className="flex items-center gap-3 group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-charcoal group-hover:text-muted-blue transition-colors">Marcus Sterling</p>
              <p className="text-xs text-charcoal-light font-light">Fitness User</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" alt="User avatar" className="w-full h-full object-cover" />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
