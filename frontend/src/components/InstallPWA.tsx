"use client";

import React, { useEffect, useState } from "react";
import { X, Download, Share } from "lucide-react";

export default function InstallPWA() {
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isGenericMobile, setIsGenericMobile] = useState(false);

  useEffect(() => {
    // 1. Check if already installed
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches 
      || (window.navigator as any).standalone 
      || document.referrer.includes("android-app://");

    if (isStandalone) return;

    // 2. Comprehensive Device Tracking
    const ua = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    const android = /Android/i.test(ua);
    const mobile = /Mobi|Tablet|iPad|iPhone|Android/i.test(ua);
    
    setIsIOS(ios);
    setIsGenericMobile(mobile && !ios);

    // 3. Listen for Android/Chrome/Edge native install prompt
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Only show banner automatically if on mobile/tablet
      if (mobile) {
        setShowBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    // 4. Fallback: Show banner for iOS or generic mobile after 4 seconds 
    // unless it's already triggered by a native prompt
    const dismissed = sessionStorage.getItem("pwa-banner-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => {
        if (!deferredPrompt && (ios || (mobile && !android))) {
          setShowBanner(true);
        }
        // For Android, we wait for the native 'beforeinstallprompt' 
        // but if it never comes, we can show generic instructions here too
        if (mobile && !showBanner) {
            setShowBanner(true);
        }
      }, 4000);
      return () => {
        window.removeEventListener("beforeinstallprompt", handler);
        clearTimeout(timer);
      };
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [deferredPrompt, showBanner]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShowBanner(false);
    }
  };

  const dismissBanner = () => {
    setShowBanner(false);
    sessionStorage.setItem("pwa-banner-dismissed", "true");
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 z-[100] animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="relative overflow-hidden rounded-2xl bg-charcoal-light/95 border border-white/10 backdrop-blur-xl p-5 shadow-2xl ring-1 ring-black/20">
        {/* Glow effect */}
        <div className="absolute -left-10 -top-10 h-32 w-32 bg-cyan/10 blur-[80px]" />
        <div className="absolute -right-10 -bottom-10 h-32 w-32 bg-purple/10 blur-[80px]" />

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan to-purple shadow-lg">
            <Download className="h-6 w-6 text-white" />
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white">Install Askal App</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {isIOS 
                ? "Add to home screen for the best experience" 
                : "Book trainers faster and access offline"}
            </p>
          </div>

          <button 
            onClick={dismissBanner}
            className="p-1 text-slate-500 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {deferredPrompt ? (
            <button
              onClick={handleInstallClick}
              className="w-full rounded-xl bg-gradient-to-r from-cyan to-purple py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan/20 active:scale-95 transition-all"
            >
              Install Now
            </button>
          ) : isIOS ? (
            <div className="flex items-center justify-center gap-2 rounded-xl bg-white/5 py-2.5 px-4 text-xs text-white/90 border border-white/5">
              <span className="flex items-center gap-1 font-medium">
                Tap <Share className="h-3.5 w-3.5" />
              </span>
              <span>then "Add to Home Screen"</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 rounded-xl bg-white/5 py-2.5 px-4 text-xs text-white/90 border border-white/5 text-center">
              <span>Open browser menu and select <br /> <b>"Install App"</b> or <b>"Add to Home Screen"</b></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
