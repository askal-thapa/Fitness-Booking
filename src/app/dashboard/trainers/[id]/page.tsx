import DashboardNavbar from "@/components/DashboardNavbar";
import Link from 'next/link';
import React from 'react';

export default function TrainerProfilePage() {
  const trainer = {
    id: 1,
    name: "Marcus Sterling",
    specialty: "Strength & Conditioning",
    experience: "8 years professional experience",
    price: "£85",
    sessionLength: "60 mins",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop",
    rating: "4.9",
    reviews: 124,
    location: "Central London / Virtual",
    bio: "Marcus is a former elite athlete turned specialized conditioning coach. With a meticulous approach to biomechanics and strength development, he crafts bespoke training regimens that push boundaries while ensuring sustainable progression. His methodology is deeply rooted in scientific principles, combined with an understanding of real-world athletic demands.",
    philosophy: "True strength is built in the shadows. It's the consistency of disciplined effort, tailored meticulously to your unique physiological framework.",
    certifications: ["NSCA Certified Strength and Conditioning Specialist", "BSc Sports Science", "Precision Nutrition Level 2"],
    availableSlots: [
      { day: "Today, Oct 24", times: ["09:00 AM", "11:30 AM", "15:00 PM"] },
      { day: "Tomorrow, Oct 25", times: ["07:00 AM", "14:00 PM", "16:30 PM", "18:00 PM"] },
      { day: "Friday, Oct 26", times: ["08:00 AM", "10:00 AM"] }
    ]
  };

  return (
    <div className="min-h-screen bg-off-white">
      <DashboardNavbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Back navigation */}
        <Link href="/dashboard/trainers" className="inline-flex items-center gap-2 text-sm font-medium text-charcoal-light hover:text-charcoal transition-colors mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Directory
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content: Profile & About */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Header section */}
            <section className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-48 bg-charcoal relative w-full">
                 <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center"></div>
              </div>
              <div className="px-8 pb-8">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-16 mb-6">
                  <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200 shrink-0 shadow-md">
                     <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h1 className="text-3xl font-bold text-charcoal mb-1">{trainer.name}</h1>
                        <p className="text-muted-blue font-medium">{trainer.specialty}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-off-white px-3 py-1.5 rounded-sm text-sm font-medium text-charcoal shadow-sm border border-gray-100 self-start sm:self-auto">
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {trainer.rating} <span className="text-gray-400 font-normal">({trainer.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
                  <div>
                    <p className="text-xs font-semibold text-charcoal-light uppercase tracking-wider mb-1">Location</p>
                    <p className="text-sm font-medium text-charcoal">{trainer.location}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal-light uppercase tracking-wider mb-1">Experience</p>
                    <p className="text-sm font-medium text-charcoal">{trainer.experience}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal-light uppercase tracking-wider mb-1">Session</p>
                    <p className="text-sm font-medium text-charcoal">{trainer.sessionLength}</p>
                  </div>
                  <div>
                     <p className="text-xs font-semibold text-charcoal-light uppercase tracking-wider mb-1">Rate</p>
                     <p className="text-sm font-medium text-charcoal">{trainer.price}</p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* About / Biography section */}
            <section className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-charcoal mb-6">About Marcus</h2>
              <div className="prose prose-sm max-w-none text-charcoal-light leading-relaxed">
                <p className="mb-6 text-base">{trainer.bio}</p>
                <div className="bg-off-white p-6 border-l-4 border-muted-blue rounded-r-sm mb-8">
                  <p className="italic text-charcoal text-base font-medium">"{trainer.philosophy}"</p>
                </div>
                
                <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-3">Certifications & Credentials</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {trainer.certifications.map((cert, idx) => (
                    <li key={idx} className="text-charcoal-light">{cert}</li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
          
          {/* Scheduling Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-charcoal mb-2">Book a Session</h2>
              <p className="text-charcoal-light text-sm mb-6 pb-6 border-b border-gray-100">
                Select an available time slot below to secure your training session with Marcus.
              </p>
              
              <div className="space-y-6 mb-8">
                {trainer.availableSlots.map((daySlot, idx) => (
                  <div key={idx}>
                    <h3 className="text-sm font-semibold text-charcoal mb-3">{daySlot.day}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {daySlot.times.map((time, tIdx) => (
                        <label key={tIdx} className="cursor-pointer group">
                          <input type="radio" name="timeSlot" className="peer sr-only" value={`${daySlot.day}-${time}`} />
                          <div className="py-2.5 px-3 text-center border border-gray-200 rounded-sm text-sm font-medium text-charcoal peer-checked:bg-charcoal peer-checked:text-white peer-checked:border-charcoal group-hover:border-charcoal/30 transition-all">
                            {time}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-off-white p-4 rounded-sm border border-gray-100 mb-6 flex justify-between items-center">
                <span className="text-sm font-medium text-charcoal">Total Price</span>
                <span className="text-lg font-bold text-charcoal">{trainer.price}</span>
              </div>
              
              <button className="w-full py-4 bg-charcoal text-white rounded-sm font-medium hover:bg-charcoal-light transition-all shadow-sm flex justify-center items-center text-sm uppercase tracking-wider">
                Book Session
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
