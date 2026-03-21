import DashboardNavbar from "@/components/DashboardNavbar";
import Link from 'next/link';
import React from 'react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <DashboardNavbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <section className="mb-12">
          <h1 className="text-3xl font-bold text-charcoal mb-2">Good morning, Marcus.</h1>
          <p className="text-charcoal-light font-light text-lg">Consistency is the hallmark of excellence. Let's make today count.</p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Upcoming Bookings */}
            <section className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-charcoal">Upcoming Sessions</h2>
                <Link href="/dashboard/bookings" className="text-sm font-medium text-muted-blue hover:text-charcoal transition-colors">
                  View all
                </Link>
              </div>

              <div className="space-y-4">
                {/* Session Card 1 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-sm hover:border-gray-200 transition-colors group">
                  <div className="flex items-start gap-4 mb-4 sm:mb-0">
                    <div className="w-12 h-12 rounded-sm bg-muted-blue/10 flex flex-col items-center justify-center text-muted-blue shrink-0">
                      <span className="text-xs font-semibold uppercase">Oct</span>
                      <span className="text-lg font-bold leading-none">24</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-charcoal">High-Intensity Interval Training</h4>
                      <p className="text-sm text-charcoal-light flex items-center gap-1 mt-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        08:00 AM - 09:00 AM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 justify-between sm:justify-start">
                    <div className="flex items-center gap-2">
                      <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" alt="Trainer" className="w-8 h-8 rounded-full border border-gray-200" />
                      <span className="text-sm text-charcoal-light hidden sm:inline-block">Julian Cross</span>
                    </div>
                  </div>
                </div>

                {/* Session Card 2 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-sm hover:border-gray-200 transition-colors group">
                  <div className="flex items-start gap-4 mb-4 sm:mb-0">
                    <div className="w-12 h-12 rounded-sm bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-charcoal shrink-0">
                      <span className="text-xs font-semibold uppercase">Oct</span>
                      <span className="text-lg font-bold leading-none">28</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-charcoal">Pilates & Core Dynamics</h4>
                      <p className="text-sm text-charcoal-light flex items-center gap-1 mt-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        17:30 PM - 18:30 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 justify-between sm:justify-start">
                    <div className="flex items-center gap-2">
                      <img src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=100&auto=format&fit=crop" alt="Trainer" className="w-8 h-8 rounded-full border border-gray-200" />
                      <span className="text-sm text-charcoal-light hidden sm:inline-block">Eleanor Vance</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Profile Overview (Progress/Stats) */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex flex-col justify-center">
                <p className="text-sm text-charcoal-light font-medium uppercase tracking-wider mb-2">Sessions Completed</p>
                <h3 className="text-3xl font-bold text-charcoal">24</h3>
              </div>
              <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex flex-col justify-center">
                <p className="text-sm text-charcoal-light font-medium uppercase tracking-wider mb-2">Active Goals</p>
                <h3 className="text-3xl font-bold text-charcoal">3</h3>
              </div>
              <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex flex-col justify-center">
                <p className="text-sm text-charcoal-light font-medium uppercase tracking-wider mb-2">Current Streak</p>
                <h3 className="text-3xl font-bold text-muted-blue">4 Weeks</h3>
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <section className="bg-charcoal text-white p-8 rounded-sm shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/dashboard/trainers" className="w-full flex items-center justify-between p-4 bg-charcoal-light/30 rounded-sm hover:bg-charcoal-light/50 transition-colors border border-gray-600/30">
                  <span className="font-medium">Book a New Trainer</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </Link>
                <Link href="/dashboard/profile" className="w-full flex items-center justify-between p-4 bg-charcoal-light/30 rounded-sm hover:bg-charcoal-light/50 transition-colors border border-gray-600/30">
                  <span className="font-medium">Update My Profile</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </Link>
              </div>
            </section>

            {/* Suggested AI Feature */}
            <section className="bg-muted-blue/10 p-8 rounded-sm border border-muted-blue/20">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6 text-muted-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                <h3 className="font-semibold text-charcoal">AI Insights</h3>
              </div>
              <p className="text-sm text-charcoal-light leading-relaxed mb-4">
                Based on your recent High-Intensity sessions, adjusting your next workout to focus on mobility and recovery is recommended to optimize performance.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
