"use client";

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { onboardingApi } from '@/lib/api';

export default function Navbar() {
  const { data: session } = useSession();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const user = session?.user as any;
  const fullName = user?.name || "Member";

  useEffect(() => {
    if (user?.accessToken) {
      onboardingApi.getMe(user.accessToken)
        .then(data => {
          if (data.imageUrl) setProfileImage(data.imageUrl);
        })
        .catch(err => console.error("Public nav profile fetch error:", err));
    }
  }, [user?.accessToken]);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-charcoal/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-off-white flex items-center gap-2 group">
          <span className="w-8 h-8 bg-muted-blue rounded-lg flex items-center justify-center text-white font-bold text-lg rotate-3 group-hover:rotate-0 transition-transform">A</span>
          ASKAL
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/trainers" className="text-sm font-semibold text-off-white/60 hover:text-white transition-colors">
            Browse Trainers
          </Link>
          
          {session ? (
            <Link 
              href={user?.role === "trainer" ? "/trainer/dashboard" : "/dashboard"} 
              className="flex items-center gap-3 group bg-white/5 p-1 my-1 rounded-2xl hover:bg-white/10 transition-all border border-white/5"
            >
              <div className="text-right hidden sm:block pl-3">
                <p className="text-xs font-black text-off-white uppercase tracking-wider">{fullName.split(' ')[0]}</p>
                <p className="text-[10px] text-muted-blue font-bold uppercase tracking-tighter">Dashboard</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-muted-blue/20 overflow-hidden border border-white/10 p-0.5">
                <img 
                  src={profileImage || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"} 
                  alt="User avatar" 
                  className="w-full h-full object-cover rounded-lg" 
                />
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-6">
              <Link href="/login" className="text-sm font-semibold text-off-white/60 hover:text-white transition-colors">
                Log in
              </Link>
              <Link href="/login" className="text-sm font-bold bg-muted-blue text-white px-8 py-3 rounded-xl hover:bg-muted-blue-hover transition-all shadow-lg shadow-muted-blue/20">
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
