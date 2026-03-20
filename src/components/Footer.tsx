import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-off-white py-16 border-t border-charcoal-light/30">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2 mb-6">
            <span className="w-8 h-8 bg-white rounded-sm flex items-center justify-center text-charcoal font-bold text-lg">F</span>
            Fit
          </Link>
          <p className="text-gray-300 font-light max-w-md leading-relaxed">
            The premium platform for booking elite fitness professionals. 
            Elevate your training experience with curated experts and sophisticated technology.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Platform</h4>
          <ul className="space-y-4">
            <li><Link href="/trainers" className="text-gray-400 hover:text-white transition-colors">Find a Trainer</Link></li>
            <li><Link href="/programs" className="text-gray-400 hover:text-white transition-colors">Programs</Link></li>
            <li><Link href="/ai-assistant" className="text-gray-400 hover:text-white transition-colors">AI Assistant</Link></li>
            <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Company</h4>
          <ul className="space-y-4">
            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Askal Fit. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
          <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
          <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
        </div>
      </div>
    </footer>
  );
}
