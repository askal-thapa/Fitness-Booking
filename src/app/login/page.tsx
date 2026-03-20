"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'user' | 'trainer'>('user');

  return (
    <div className="min-h-screen flex bg-off-white">
      {/* Left side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-charcoal items-center justify-center overflow-hidden">
        {/* Subtle background image and overlay */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" 
            alt="Fitness background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-charcoal via-charcoal/80 to-transparent z-10"></div>
        
        <div className="relative z-20 flex flex-col p-16 max-w-xl text-white">
          <Link href="/" className="text-3xl font-semibold tracking-tight text-white flex items-center gap-2 mb-16 hover:opacity-90 transition-opacity w-fit">
            <span className="w-10 h-10 bg-white rounded-sm flex items-center justify-center text-charcoal font-bold text-xl">F</span>
            Fit
          </Link>
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Commit to your excellence.
          </h2>
          <p className="text-lg text-gray-300 font-light leading-relaxed">
            Join our exclusive platform connecting dedicated individuals with world-class fitness professionals. Elevate your training standard.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="lg:hidden text-2xl font-semibold tracking-tight text-charcoal flex items-center gap-2 mb-12">
            <span className="w-8 h-8 bg-charcoal rounded-sm flex items-center justify-center text-white font-bold text-lg">F</span>
            Fit
          </Link>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-charcoal mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className="text-charcoal-light font-light">
              {isLogin 
                ? 'Enter your credentials to access your account.' 
                : 'Join our premium fitness platform today.'}
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                <label className="block text-sm font-medium text-charcoal">Select your role</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole('user')}
                    className={`py-3 px-4 border rounded-sm text-sm font-medium transition-all ${
                      role === 'user' 
                        ? 'border-charcoal bg-charcoal text-white' 
                        : 'border-gray-200 text-charcoal hover:border-charcoal/30 hover:bg-gray-50'
                    }`}
                  >
                    Fitness User
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('trainer')}
                    className={`py-3 px-4 border rounded-sm text-sm font-medium transition-all ${
                      role === 'trainer' 
                        ? 'border-charcoal bg-charcoal text-white' 
                        : 'border-gray-200 text-charcoal hover:border-charcoal/30 hover:bg-gray-50'
                    }`}
                  >
                    Trainer
                  </button>
                </div>
              </div>
            )}

            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-charcoal">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-charcoal focus:border-charcoal outline-none transition-all placeholder:text-gray-400 text-sm"
                    placeholder="Marcus"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-charcoal">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-charcoal focus:border-charcoal outline-none transition-all placeholder:text-gray-400 text-sm"
                    placeholder="Sterling"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-charcoal">Email address</label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-charcoal focus:border-charcoal outline-none transition-all placeholder:text-gray-400 text-sm"
                placeholder="marcus@example.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm font-medium text-charcoal">Password</label>
                {isLogin && (
                  <Link href="#" className="text-xs font-medium text-muted-blue hover:text-charcoal transition-colors">
                    Forgot password?
                  </Link>
                )}
              </div>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-charcoal focus:border-charcoal outline-none transition-all placeholder:text-gray-400 text-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-charcoal text-white rounded-sm font-medium hover:bg-charcoal-light transition-all shadow-sm flex justify-center items-center mt-8 text-sm uppercase tracking-wider"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-charcoal-light mt-10">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-charcoal hover:text-muted-blue transition-colors underline underline-offset-4"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
