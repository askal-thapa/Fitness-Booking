import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-off-white py-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-muted-blue opacity-[0.03] blur-[100px] -z-10 rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-2 space-y-8">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2 group">
            <span className="w-8 h-8 bg-muted-blue rounded-lg flex items-center justify-center text-white font-bold text-lg rotate-3 group-hover:rotate-0 transition-transform">A</span>
            ASKAL FIT
          </Link>
          <p className="text-off-white/40 font-medium max-w-sm leading-relaxed italic">
            The premium platform for booking elite fitness professionals. 
            Elevate your training experience with curated experts and sophisticated technology.
          </p>
        </div>
        
        <div>
          <h4 className="text-muted-blue font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">Ecosystem</h4>
          <ul className="space-y-4">
            <li><Link href="/trainers" className="text-off-white/40 hover:text-white transition-colors text-sm font-semibold tracking-tight">Browse Trainers</Link></li>
            <li><Link href="/about" className="text-off-white/40 hover:text-white transition-colors text-sm font-semibold tracking-tight">About Us</Link></li>
            <li><Link href="/careers" className="text-off-white/40 hover:text-white transition-colors text-sm font-semibold tracking-tight">Careers</Link></li>
            <li><Link href="/contact" className="text-off-white/40 hover:text-white transition-colors text-sm font-semibold tracking-tight">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-muted-blue font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">Legal</h4>
          <ul className="space-y-4">
            <li><Link href="/privacy" className="text-off-white/40 hover:text-white transition-colors text-sm font-semibold tracking-tight">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-off-white/40 hover:text-white transition-colors text-sm font-semibold tracking-tight">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-off-white/20 text-[10px] font-bold tracking-widest uppercase">
        <p>&copy; {new Date().getFullYear()} Askal Fit. Engineered for Excellence.</p>
        <div className="flex gap-8 mt-6 md:mt-0">
          <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
          <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
        </div>
      </div>
    </footer>
  );
}
