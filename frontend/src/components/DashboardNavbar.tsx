"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { onboardingApi } from '@/lib/api';

export default function DashboardNavbar() {
  const pathname = usePathname() || '';
  const { data: session } = useSession();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const user = session?.user as any;
  const fullName = user?.name || "User";
  const roleDisplay = user?.role === "trainer" ? "Pro Trainer" : "Pro Member";

  useEffect(() => {
    if (user?.accessToken) {
      onboardingApi.getMe(user.accessToken)
        .then(data => {
          if (data.imageUrl) setProfileImage(data.imageUrl);
        })
        .catch(err => console.error("Nav profile fetch error:", err));
    }
  }, [user?.accessToken]);

  return (
    <nav className="w-full bg-charcoal-light border-b border-white/5 sticky top-0 z-40 shadow-xl backdrop-blur-md bg-charcoal-light/80">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-xl font-bold tracking-tighter text-off-white flex items-center gap-2 group">
            <span className="w-8 h-8 bg-muted-blue rounded-lg flex items-center justify-center text-white font-bold text-sm rotate-3 group-hover:rotate-0 transition-transform">A</span>
            ASKAL
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/dashboard" 
              className={`text-sm font-semibold transition-all duration-200 border-b-2 py-5 ${
                pathname === '/dashboard' 
                  ? 'text-white border-muted-blue' 
                  : 'text-off-white/40 hover:text-off-white border-transparent'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/trainers" 
              className={`text-sm font-semibold transition-all duration-200 border-b-2 py-5 ${
                pathname.startsWith('/trainers') 
                  ? 'text-white border-muted-blue' 
                  : 'text-off-white/40 hover:text-off-white border-transparent'
              }`}
            >
              Trainers
            </Link>
            <Link 
              href="/dashboard/bookings" 
              className={`text-sm font-semibold transition-all duration-200 border-b-2 py-5 ${
                pathname.startsWith('/dashboard/bookings') 
                  ? 'text-white border-muted-blue' 
                  : 'text-off-white/40 hover:text-off-white border-transparent'
              }`}
            >
              Bookings
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-off-white/40 hover:text-red-400 transition-all group/logout"
          >
            <span>Logout</span>
            <svg className="w-4 h-4 group-hover/logout:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
          
          <Link href="/dashboard/profile" className="flex items-center gap-3 group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-off-white group-hover:text-muted-blue transition-colors">{fullName}</p>
              <p className="text-xs text-off-white/30 font-medium">{roleDisplay}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-muted-blue/20 overflow-hidden border border-white/10 p-0.5">
              <img src={profileImage || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"} alt="User avatar" className="w-full h-full object-cover rounded-lg" />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
