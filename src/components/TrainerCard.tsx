import Link from 'next/link';
import React from 'react';

type Trainer = {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  price: string;
  image: string;
  rating: string;
  reviews: number;
  location: string;
};

export default function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <Link href={`/dashboard/trainers/${trainer.id}`} className="bg-white rounded-sm overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group flex flex-col w-full text-left">
      <div className="relative h-72 lg:h-80 overflow-hidden bg-gray-100 w-full shrink-0">
        <img 
          src={trainer.image} 
          alt={trainer.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-medium flex items-center gap-1 text-charcoal shadow-sm">
          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {trainer.rating} <span className="text-gray-400 font-normal">({trainer.reviews})</span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-2xl font-semibold text-charcoal mb-1">{trainer.name}</h3>
          <p className="text-muted-blue font-medium text-sm">{trainer.specialty}</p>
        </div>
        
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3 text-sm text-charcoal-light">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {trainer.location}
          </div>
          <div className="flex items-center gap-3 text-sm text-charcoal-light">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            {trainer.experience}
          </div>
          <div className="flex items-center gap-3 text-sm text-charcoal-light">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {trainer.price}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="w-full py-3 border border-charcoal text-charcoal font-medium rounded-sm group-hover:bg-charcoal group-hover:text-white transition-colors flex justify-center items-center gap-2">
            View Details
            <svg className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
