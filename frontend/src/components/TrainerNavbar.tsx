"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { trainerApi } from '@/lib/api';
import React, { useEffect, useState } from 'react';

export default function TrainerNavbar() {
  const pathname = usePathname() || '';
  const { data: session } = useSession();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const user = session?.user as any;
  const fullName = user?.name || "Trainer";
  const roleDisplay = "Pro Trainer";

  useEffect(() => {
    if (user?.accessToken) {
      trainerApi.getMe(user.accessToken)
        .then(data => {
          if (data.imageUrl) setProfileImage(data.imageUrl);
        })
        .catch(err => console.error("Nav trainer profile fetch error:", err));
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
              href="/trainer/dashboard" 
              className={`text-sm font-semibold transition-all duration-200 border-b-2 py-5 ${
                pathname === '/trainer/dashboard' 
                  ? 'text-white border-muted-blue' 
                  : 'text-off-white/40 hover:text-off-white border-transparent'
              }`}
            >
              Overview
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-xs font-bold uppercase tracking-widest text-off-white/40 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
          
          <Link href="/trainer/dashboard" className="flex items-center gap-3 group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-off-white group-hover:text-muted-blue transition-colors">{fullName}</p>
              <p className="text-xs text-off-white/30 font-medium">{roleDisplay}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-muted-blue/20 overflow-hidden border border-white/10 p-0.5">
              <img src={profileImage || "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=200&auto=format&fit=crop"} alt="Trainer avatar" className="w-full h-full object-cover rounded-lg" />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
