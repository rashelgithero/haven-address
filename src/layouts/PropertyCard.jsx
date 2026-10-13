import React from 'react';
import { Link } from 'react-router';

export default function PropertyCard({ estate }) {
    console.log(estate)
  const {
    id,
    estate_title,
    segment_name,
    image,
    description,
    price,
    status,
    area,
    location,
    facilities,
  } = estate;

  return (
    <div className="bg-slate-900 rounded-2xl border border-white/10 overflow-hidden shadow-xl hover:border-[#F9A51A]/50 transition duration-300 flex flex-col justify-between group">
      
      {/* Top Image Box */}
      <div className="relative h-56 overflow-hidden"> 
        <img
          src={image}
          alt={estate_title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-#757D6F via-transparent to-transparent"></div>

        {/* Status Badge (For Sale / For Rent) */}
        <span
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            status === 'sale'
              ? 'bg-[#F9A51A] text-slate-950'
              : 'bg-emerald-500 text-slate-950'
          }`}
        >
          For {status}
        </span>

        {/* Segment Tag */}
        <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 text-white backdrop-blur-md border border-white/10">
          {segment_name}
        </span>

        {/* Price Tag */}
        <div className="absolute bottom-3 left-4 text-xl font-black text-white drop-shadow-md">
          {price}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 grow flex flex-col justify-between space-y-4">
        <div>
          {/* Location */}
          <p className="text-xs text-[#F9A51A] font-medium flex items-center gap-1 mb-1">
            <span></span> {location}
          </p>

          {/* Title */}
          <h3 className="text-lg font-bold text-white group-hover:text-[#F9A51A] transition line-clamp-1">
            {estate_title}
          </h3>

          {/* Area */}
          <p className="text-xs text-slate-400 mt-1 font-mono">
            📏 Area: <span className="text-slate-200">{area}</span>
          </p>

          {/* Description */}
          <p className="text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Facilities Pills */}
        <div>
          <p className="text-xs font-semibold text-slate-400 mb-2">Facilities:</p>
          <div className="flex flex-wrap gap-1.5">
            {facilities.slice(0, 3).map((facility, index) => (
              <span
                key={index}
                className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-[11px] rounded-md border border-white/5"
              >
                {facility}
              </span>
            ))}
            {facilities.length > 3 && (
              <span className="px-2 py-0.5 bg-slate-800/50 text-slate-400 text-[11px] rounded-md">
                +{facilities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* View Property Button */}
        <div className="pt-2">
          <Link
            to={`/estateDetails/${id}`}
            className="w-full py-2.5 px-4 bg-[#F9A51A] hover:bg-[#e09212] text-slate-950 font-bold text-sm rounded-xl transition flex items-center justify-center gap-2"
          >
            <span>View Property</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
}
