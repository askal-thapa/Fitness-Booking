import TrainerNavbar from "@/components/TrainerNavbar";
import Link from 'next/link';
import React from 'react';

// Mock data for upcoming sessions
const upcomingSessions = [
  {
    id: "S-8392",
    clientName: "Eleanor Vance",
    clientImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    type: "Strength & Conditioning",
    date: "Today",
    time: "14:00 PM - 15:00 PM",
    status: "Confirmed",
    notes: "Focus on lower body. History of mild knee discomfort."
  },
  {
    id: "S-8393",
    clientName: "David Chen",
    clientImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
    type: "Initial Consultation",
    date: "Tomorrow",
    time: "09:00 AM - 10:00 AM",
    status: "Confirmed",
    notes: "New client. Goal: Marathon prep."
  },
  {
    id: "S-8395",
    clientName: "Sarah Jenkins",
    clientImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
    type: "Mobility & Core",
    date: "Tomorrow",
    time: "11:30 AM - 12:30 PM",
    status: "Pending",
    notes: ""
  }
];

export default function TrainerDashboardPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <TrainerNavbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-charcoal mb-2">Trainer Overview</h1>
            <p className="text-charcoal-light font-light text-lg">Manage your schedule, update your profile, and review upcoming sessions.</p>
          </div>
          <button className="px-6 py-3 bg-charcoal text-white text-sm font-medium rounded-sm hover:bg-charcoal-light transition-colors shadow-sm">
            Block Time Off
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex flex-col justify-center">
                <p className="text-xs text-charcoal-light font-semibold uppercase tracking-wider mb-2">Sessions This Week</p>
                <h3 className="text-3xl font-bold text-charcoal">18</h3>
              </div>
              <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex flex-col justify-center">
                <p className="text-xs text-charcoal-light font-semibold uppercase tracking-wider mb-2">Active Clients</p>
                <h3 className="text-3xl font-bold text-charcoal">24</h3>
              </div>
              <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex flex-col justify-center">
                <p className="text-xs text-charcoal-light font-semibold uppercase tracking-wider mb-2">Weekly Earnings</p>
                <h3 className="text-3xl font-bold text-muted-blue">£1,450</h3>
              </div>
            </section>

            {/* Upcoming Bookings */}
            <section className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-semibold text-charcoal">Upcoming Sessions</h2>
                <Link href="/trainer/calendar" className="text-sm font-medium text-muted-blue hover:text-charcoal transition-colors">
                  View Full Calendar
                </Link>
              </div>
              
              <div className="divide-y divide-gray-100">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group">
                    <div className="flex items-start gap-5">
                      <img src={session.clientImage} alt={session.clientName} className="w-14 h-14 rounded-full border-2 border-gray-50 shadow-sm shrink-0 object-cover" />
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-lg font-semibold text-charcoal leading-none">{session.clientName}</h4>
                          {session.status === 'Confirmed' ? (
                            <span className="w-2 h-2 rounded-full bg-green-500" title="Confirmed"></span>
                          ) : (
                            <span className="px-2 py-0.5 bg-yellow-50 text-yellow-600 text-[10px] font-bold rounded-full uppercase tracking-wider">Pending</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-blue font-medium mb-2">{session.type}</p>
                        
                        <div className="flex items-center gap-4 text-xs font-medium text-charcoal-light uppercase tracking-wider">
                          <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-sm">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            {session.date}
                          </span>
                          <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-sm">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {session.time}
                          </span>
                        </div>
                        {session.notes && (
                          <p className="mt-3 text-sm text-gray-500 italic flex items-start gap-2">
                             <svg className="w-4 h-4 shrink-0 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                             {session.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex sm:flex-col gap-2 shrink-0">
                      <button className="flex-1 py-2 px-4 bg-white border border-charcoal text-charcoal text-xs font-semibold rounded-sm hover:bg-charcoal hover:text-white transition-colors text-center uppercase tracking-wider">
                        Prepare
                      </button>
                      <button className="flex-1 py-2 px-4 bg-white border border-gray-200 text-charcoal text-xs font-semibold rounded-sm hover:bg-gray-50 transition-colors text-center uppercase tracking-wider">
                        Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar / Management */}
          <div className="space-y-6">
            
            {/* Availability Management */}
            <section className="bg-charcoal text-white p-8 rounded-sm shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Availability
              </h2>
              <p className="text-sm text-gray-300 font-light mb-6 leading-relaxed">
                You are currently accepting new bookings. Update your weekly recurring hours or manage exceptions.
              </p>
              <div className="space-y-3">
                <button className="w-full py-3 bg-white text-charcoal text-sm font-medium rounded-sm hover:bg-gray-100 transition-colors">
                  Edit Working Hours
                </button>
                <button className="w-full py-3 border border-gray-600 text-white text-sm font-medium rounded-sm hover:bg-gray-800 transition-colors">
                  Date Exceptions
                </button>
              </div>
            </section>

            {/* Profile Management */}
            <section className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-charcoal mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-muted-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Public Profile
              </h2>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-sm border border-gray-100">
                  <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=100&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                   <p className="text-sm font-semibold text-charcoal">Marcus Sterling</p>
                   <p className="text-xs text-charcoal-light">Profile is 100% complete</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Link href="/trainer/profile/edit" className="flex items-center justify-between p-3 rounded-sm hover:bg-gray-50 transition-colors text-sm text-charcoal font-medium border border-transparent hover:border-gray-200">
                  <span>Edit Details & Bio</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
                <Link href="/trainer/profile/services" className="flex items-center justify-between p-3 rounded-sm hover:bg-gray-50 transition-colors text-sm text-charcoal font-medium border border-transparent hover:border-gray-200">
                  <span>Manage Services & Rates</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
                <Link href="/dashboard/trainers/1" className="flex items-center justify-between p-3 rounded-sm hover:bg-gray-50 transition-colors text-sm text-muted-blue font-medium border border-transparent hover:border-gray-200">
                  <span>Preview Public Profile</span>
                  <svg className="w-4 h-4 text-muted-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </Link>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
