import Link from 'next/link';
import React from 'react';
import { Trainer } from '@/types';
import { Card } from './ui/Card';
import { TRAINING_FOCUS } from '@/lib/constants';

export default function TrainerCard({ trainer }: { trainer: Trainer }) {
  // Map focus names to their icons
  const getIcon = (name: string) => 
    TRAINING_FOCUS.find(f => f.value === name)?.icon || 
    '•';

  // Combine both for the tags display, ensuring unique, trimmed values to avoid key collisions
  const allTags = Array.from(new Set([
    ...(trainer.focus || [])
  ].map(t => t.trim()))).slice(0, 4); // Limit to 4 to prevent clutter

  return (
    <Link href={`/trainers/${trainer.id}`} className="group h-full">
      <Card className="p-4 space-y-4 hover:translate-y-[-4px] transition-transform flex flex-col h-full border-white/5 bg-charcoal-light/50 backdrop-blur-sm">
        <div className="aspect-square rounded-xl overflow-hidden bg-muted-blue/10 relative">
          <img 
            src={trainer.imageUrl || "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=200&auto=format&fit=crop"} 
            alt={trainer.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-charcoal/80 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 text-white border border-white/10 shadow-2xl">
            <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {trainer.rating?.toFixed(1) || "5.0"}
          </div>
        </div>
        <div className="text-center flex-1 space-y-1">
          <h4 className="font-extrabold text-white text-lg group-hover:text-muted-blue transition-colors tracking-tight">{trainer.name}</h4>
          <p className="text-[10px] text-muted-blue font-black uppercase tracking-[0.2em]">{trainer.specialty}</p>
          
          {/* Tags (Specialties & Focus) */}
          <div className="flex flex-wrap justify-center gap-1.5 py-3">
            {allTags.length > 0 ? (
              allTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] bg-white/5 text-off-white/60 px-2 py-1 rounded-full border border-white/5 flex items-center gap-1"
                >
                  <span className="text-[11px]">{getIcon(tag)}</span>
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-[9px] bg-white/5 text-off-white/40 px-2 py-1 rounded-full border border-white/5 italic">General Fitness</span>
            )}
            <span className="text-[9px] bg-muted-blue/10 text-muted-blue px-2 py-1 rounded-full border border-muted-blue/10 font-bold">Lvl {trainer.intensity}</span>
          </div>

          <p className="text-[11px] text-off-white/40 line-clamp-2 leading-relaxed italic font-medium">{trainer.bio}</p>
        </div>
        <div className="pt-4 mt-auto">
          <div className="w-full py-2.5 bg-white/5 border border-white/10 text-off-white text-xs font-bold rounded-xl group-hover:bg-muted-blue group-hover:border-muted-blue transition-all flex justify-center items-center gap-2">
            View Profile
            <svg className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </div>
        </div>
      </Card>
    </Link>
  );
}
