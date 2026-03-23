"use client";

import DashboardNavbar from "@/components/DashboardNavbar";
import React, { useState } from 'react';

export default function UserProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "Alexander",
    lastName: "Wright",
    email: "alexander.w@example.com",
    age: "32",
    gender: "Male",
    height: "185", // cm
    weight: "82", // kg
    fitnessGoal: "Muscle Building & Strength"
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-off-white pb-20">
      <DashboardNavbar />
      
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-charcoal mb-2">My Profile</h1>
          <p className="text-charcoal-light font-light text-lg">Manage your personal details and fitness objectives.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="h-32 bg-charcoal relative">
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center"></div>
              </div>
              <div className="px-6 pb-6 relative">
                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-md -mt-12 mb-4 mx-auto relative group cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="User Avatar" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                </div>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-charcoal">{formData.firstName} {formData.lastName}</h2>
                  <p className="text-sm font-medium text-muted-blue">{formData.email}</p>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-charcoal-light">Fitness Goal</span>
                    <span className="font-medium text-charcoal">{formData.fitnessGoal}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-charcoal-light">Registration Date</span>
                    <span className="font-medium text-charcoal">Oct 12, 2026</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-charcoal-light">Sessions Completed</span>
                    <span className="font-medium text-charcoal">14</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Editable Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSave} className="bg-white p-8 sm:p-10 rounded-sm shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-charcoal mb-8 pb-4 border-b border-gray-100">Personal Information</h2>
              
              <div className="space-y-6">
                {/* Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-xs font-semibold text-charcoal uppercase tracking-wider">First Name</label>
                    <input 
                      type="text" 
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-off-white border border-gray-200 text-charcoal text-sm rounded-sm px-4 py-3 outline-none focus:border-charcoal transition-colors focus:bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-xs font-semibold text-charcoal uppercase tracking-wider">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-off-white border border-gray-200 text-charcoal text-sm rounded-sm px-4 py-3 outline-none focus:border-charcoal transition-colors focus:bg-white"
                    />
                  </div>
                </div>

                {/* Email (Disabled typically) */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-semibold text-charcoal uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full bg-gray-50 border border-gray-200 text-gray-500 text-sm rounded-sm px-4 py-3 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-400 mt-1">To change your email, please contact support.</p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-charcoal mb-6">Physical Attributes</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="age" className="block text-xs font-semibold text-charcoal uppercase tracking-wider">Age</label>
                      <input 
                        type="number" 
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full bg-off-white border border-gray-200 text-charcoal text-sm rounded-sm px-4 py-3 outline-none focus:border-charcoal transition-colors focus:bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="gender" className="block text-xs font-semibold text-charcoal uppercase tracking-wider">Gender</label>
                      <select 
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full bg-off-white border border-gray-200 text-charcoal text-sm rounded-sm px-4 py-3 outline-none focus:border-charcoal transition-colors focus:bg-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="height" className="block text-xs font-semibold text-charcoal uppercase tracking-wider">Height (cm)</label>
                      <input 
                        type="number" 
                        id="height"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        className="w-full bg-off-white border border-gray-200 text-charcoal text-sm rounded-sm px-4 py-3 outline-none focus:border-charcoal transition-colors focus:bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="weight" className="block text-xs font-semibold text-charcoal uppercase tracking-wider">Weight (kg)</label>
                      <input 
                        type="number" 
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className="w-full bg-off-white border border-gray-200 text-charcoal text-sm rounded-sm px-4 py-3 outline-none focus:border-charcoal transition-colors focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-charcoal mb-6">Goals & Objectives</h3>
                  
                  <div className="space-y-2">
                    <label htmlFor="fitnessGoal" className="block text-xs font-semibold text-charcoal uppercase tracking-wider">Primary Fitness Goal</label>
                    <select 
                      id="fitnessGoal"
                      name="fitnessGoal"
                      value={formData.fitnessGoal}
                      onChange={handleChange}
                      className="w-full bg-off-white border border-gray-200 text-charcoal text-sm rounded-sm px-4 py-3 outline-none focus:border-charcoal transition-colors focus:bg-white"
                    >
                      <option value="Weight Loss & Toning">Weight Loss & Toning</option>
                      <option value="Muscle Building & Strength">Muscle Building & Strength</option>
                      <option value="Endurance & Cardio">Endurance & Cardio</option>
                      <option value="Flexibility & Mobility">Flexibility & Mobility</option>
                      <option value="General Health & Wellness">General Health & Wellness</option>
                      <option value="Event Preparation (e.g., Marathon)">Event Preparation (e.g., Marathon)</option>
                    </select>
                  </div>
                </div>
                
                <div className="pt-8 mt-4 flex justify-end gap-4 border-t border-gray-100">
                  <button type="button" className="px-6 py-3 border border-gray-200 text-charcoal text-sm font-medium rounded-sm hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="flex items-center justify-center min-w-[140px] px-8 py-3 bg-charcoal text-white text-sm font-medium rounded-sm hover:bg-charcoal-light transition-colors shadow-sm disabled:opacity-70"
                  >
                    {isSaving ? (
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
                
              </div>
            </form>
          </div>
          
        </div>
      </main>
    </div>
  );
}
