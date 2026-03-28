"use client";

import DashboardNavbar from "@/components/DashboardNavbar";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from 'react';
import { onboardingApi, bookingApi } from "@/lib/api";
import { toast } from "sonner";

export default function UserProfilePage() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    gender: "Male",
    height: "", 
    weight: "", 
    fitnessGoal: "Muscle Building & Strength",
    imageUrl: ""
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingIncomplete, setIsOnboardingIncomplete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const user = session?.user as any;

  useEffect(() => {
    if (user?.accessToken) {
      fetchData();
    }
  }, [user?.accessToken]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [onboardingData, bookingsData] = await Promise.all([
        onboardingApi.getMe(user.accessToken),
        bookingApi.getMyBookings(user.accessToken)
      ]);
      
      const isComplete = !!(onboardingData && onboardingData.age && onboardingData.height && onboardingData.weight);
      setIsOnboardingIncomplete(!onboardingData || !isComplete);

      setFormData({
        fullName: user.name || onboardingData.fullName || "",
        email: user.email || onboardingData.email || "",
        age: onboardingData.age?.toString() || "",
        gender: "Male",
        height: onboardingData.height?.toString() || "",
        weight: onboardingData.weight?.toString() || "",
        fitnessGoal: onboardingData.goal || "Muscle Building & Strength",
        imageUrl: onboardingData.imageUrl || ""
      });
      setSessionCount(bookingsData.length);
    } catch (err) {
      console.error("Failed to fetch profile data:", err);
      setIsOnboardingIncomplete(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.accessToken) return;

    try {
      setIsUploading(true);
      setUploadProgress(0);
      const res = await onboardingApi.uploadProfileImage(
        file,
        (percent) => setUploadProgress(percent),
        user.accessToken
      );
      setFormData(prev => ({ ...prev, imageUrl: res.imageUrl }));
    } catch (err) {
      console.error("Failed to upload image:", err);
      toast.error("Failed to upload image.");
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.accessToken) return;

    setIsSaving(true);
    try {
      await onboardingApi.save({
        fullName: formData.fullName,
        goal: formData.fitnessGoal,
        age: parseInt(formData.age) || 0,
        height: parseInt(formData.height) || 0,
        weight: parseInt(formData.weight) || 0,
        activityLevel: "Moderate", // Default fallback if not in form
        experienceLevel: "Intermediate", // Default fallback
        healthConditions: [], // Default fallback
        workoutType: "Gym", // Default fallback
        dietPreference: "None" // Default fallback
      }, user.accessToken);
      
      setIsOnboardingIncomplete(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to save profile:", err);
      toast.error("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-muted-blue border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal pb-20">
      <DashboardNavbar />
      
      <main className="page-container">
        {isOnboardingIncomplete && (
          <div className="mb-10 bg-muted-blue/10 border border-muted-blue/20 rounded-[30px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl animate-pulse">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-muted-blue rounded-2xl flex items-center justify-center text-white shadow-lg shadow-muted-blue/40">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Finish Your Profile Setup</h3>
                <p className="text-off-white/40 text-sm font-medium">Please provide your health metrics to get an accurate fitness plan.</p>
              </div>
            </div>
            <button 
              onClick={() => document.getElementById('age')?.focus()}
              className="px-8 py-3 bg-white text-charcoal text-xs font-black uppercase tracking-widest rounded-xl hover:bg-muted-blue hover:text-white transition-all shadow-xl active:scale-95"
            >
              Complete Now
            </button>
          </div>
        )}

        <div className="mb-14">
          <h1 className="section-header">Client <span className="text-muted-blue">Identity</span></h1>
          <p className="text-muted text-lg">Manage your personal metrics and fitness trajectory.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Profile Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-premium p-0 overflow-hidden sticky top-32">
              <div className="h-32 bg-muted-blue/20 relative">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center"></div>
              </div>
              <div className="px-8 pb-8 relative text-center">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-28 h-28 rounded-[32px] border-4 border-charcoal overflow-hidden bg-muted-blue/10 shadow-2xl -mt-14 mb-6 mx-auto relative group cursor-pointer transition-transform hover:scale-105 duration-300"
                >
                  <img 
                    src={formData.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"} 
                    alt="User Avatar" 
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isUploading ? 'opacity-30' : 'opacity-100'}`} 
                  />
                  
                  <div className={`absolute inset-0 bg-charcoal/60 flex flex-col items-center justify-center transition-opacity duration-300 ${isUploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    {isUploading ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span className="text-[10px] font-black text-white">{uploadProgress}%</span>
                      </div>
                    ) : (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    )}
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    className="hidden" 
                    accept="image/*" 
                  />
                </div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-1">{formData.fullName}</h2>
                  <p className="text-sm font-bold text-muted-blue uppercase tracking-widest">{formData.email}</p>
                </div>
                
                <div className="space-y-5 pt-8 border-t border-white/5">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                    <span className="text-off-white/20">Primary Objective</span>
                    <span className="text-white">{formData.fitnessGoal?.split(' ')[0] || 'Fitness'}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                    <span className="text-off-white/20">Member Since</span>
                    <span className="text-white">Oct 2026</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                    <span className="text-off-white/20">Total Sessions</span>
                    <span className="inline-flex items-center justify-center px-3 py-1 bg-muted-blue/10 text-muted-blue rounded-full border border-muted-blue/20">{sessionCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Editable Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSave} className="card-premium">
              <h2 className="text-2xl font-black text-white mb-10 pb-6 border-b border-white/5 flex items-center gap-4">
                <span className="w-2 h-8 bg-muted-blue rounded-full shadow-[0_0_12px_rgba(74,101,114,0.5)]"></span>
                Account Identity
              </h2>
              
              <div className="space-y-8">
                {/* Full Name */}
                <div className="space-y-4">
                  <label htmlFor="fullName" className="block text-[10px] font-black text-muted-blue uppercase tracking-[0.4em] ml-2">Full Name</label>
                  <input 
                    type="text" 
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="input-premium w-full"
                  />
                </div>

                {/* Email (Disabled typically) */}
                <div className="space-y-4">
                  <label htmlFor="email" className="block text-[10px] font-black text-muted-blue uppercase tracking-[0.4em] ml-2">Registry Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="input-premium w-full opacity-40 cursor-not-allowed italic bg-charcoal/50"
                  />
                  <p className="text-[10px] text-off-white/20 font-bold uppercase tracking-[0.2em] ml-2">Contact operations for registry modification.</p>
                </div>

                <div className="pt-12 mt-6 border-t border-white/5">
                  <h3 className="text-xl font-black text-white mb-10 flex items-center gap-4">
                    <span className="w-2 h-6 bg-muted-blue/40 rounded-full shadow-[0_0_12px_rgba(74,101,114,0.3)]"></span>
                    Physical Metrics
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label htmlFor="age" className="block text-[10px] font-black text-muted-blue uppercase tracking-[0.4em] ml-2">Age</label>
                      <input 
                        type="number" 
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="input-premium w-full"
                      />
                    </div>
                    <div className="space-y-4">
                      <label htmlFor="gender" className="block text-[10px] font-black text-muted-blue uppercase tracking-[0.4em] ml-2">Gender Identification</label>
                      <select 
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="input-premium w-full appearance-none cursor-pointer"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                    
                    <div className="space-y-4">
                      <label htmlFor="height" className="block text-[10px] font-black text-muted-blue uppercase tracking-[0.4em] ml-2">Height (cm)</label>
                      <input 
                        type="number" 
                        id="height"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        className="input-premium w-full"
                      />
                    </div>
                    <div className="space-y-4">
                      <label htmlFor="weight" className="block text-[10px] font-black text-muted-blue uppercase tracking-[0.4em] ml-2">Current Weight (kg)</label>
                      <input 
                        type="number" 
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className="input-premium w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-12 mt-6 border-t border-white/5">
                  <h3 className="text-xl font-black text-white mb-10 flex items-center gap-4">
                    <span className="w-2 h-6 bg-muted-blue/40 rounded-full shadow-[0_0_12px_rgba(74,101,114,0.3)]"></span>
                    Fitness Strategy
                  </h3>
                  
                  <div className="space-y-4">
                    <label htmlFor="fitnessGoal" className="block text-[10px] font-black text-muted-blue uppercase tracking-[0.4em] ml-2">Primary Objective</label>
                    <select 
                      id="fitnessGoal"
                      name="fitnessGoal"
                      value={formData.fitnessGoal}
                      onChange={handleChange}
                      className="input-premium w-full appearance-none cursor-pointer"
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
                
                <div className="pt-12 mt-10 flex flex-col sm:flex-row justify-end items-center gap-8 border-t border-white/5">
                  <button type="button" className="btn-secondary w-full sm:w-auto border-none">
                    Discard Changes
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="btn-primary w-full sm:min-w-[240px] flex items-center justify-center gap-3"
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Syncing Identity...</span>
                      </>
                    ) : (
                      "Update Identity"
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
