import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { toast } from 'react-toastify';
import useDocumentTitle from '../newHooks/useDocumentTitle';

export default function EstateDetails() {
  const { id } = useParams();
  const [estate, setEstate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Set initial default title
  useDocumentTitle('Property Details');

  // Load estate data & verify bookmark status
  useEffect(() => {
    fetch('/estates.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => String(item.id) === String(id));
        setEstate(found || null);
        setLoading(false);

        // Update document title dynamically with property name
        if (found) {
          document.title = `${found.estate_title} | Haven Address`;
        } else {
          document.title = 'Property Not Found | Haven Address';
        }
      })
      .catch((err) => {
        console.error('Error fetching estate details:', err);
        setLoading(false);
      });

    // Check localStorage for saved status
    const savedIds = JSON.parse(localStorage.getItem('saved_estates')) || [];
    if (savedIds.includes(String(id))) {
      setIsBookmarked(true);
    }
  }, [id]);

  // Toggle Bookmark / Wishlist in LocalStorage
  const handleToggleBookmark = () => {
    const savedIds = JSON.parse(localStorage.getItem('saved_estates')) || [];

    if (savedIds.includes(String(id))) {
      const updatedIds = savedIds.filter((savedId) => savedId !== String(id));
      localStorage.setItem('saved_estates', JSON.stringify(updatedIds));
      setIsBookmarked(false);
      toast.info('Estate removed from your saved list.');
    } else {
      savedIds.push(String(id));
      localStorage.setItem('saved_estates', JSON.stringify(savedIds));
      setIsBookmarked(true);
      toast.success('Estate saved to your wishlist!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#F9A51A]"></span>
      </div>
    );
  }

  if (!estate) {
    return (
      <div className="max-w-xl mx-auto my-16 text-center space-y-6 bg-slate-900 border border-white/10 p-12 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-black text-white">Residence Not Found</h2>
        <p className="text-slate-400 text-sm">
          The requested luxury property listing could not be found or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-[#F9A51A] hover:bg-[#e09212] text-slate-950 font-bold text-sm rounded-xl transition"
        >
          Back to Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 space-y-10">
      
      {/* Top Header & Bookmark Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[#F9A51A]/10 border border-[#F9A51A]/30 text-[#F9A51A] text-xs font-black uppercase tracking-widest rounded-full">
              {estate.segment_name}
            </span>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Status: {estate.status}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
            {estate.estate_title}
          </h1>
          <p className="text-slate-400 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F9A51A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {estate.location}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-left lg:text-right">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">Offered At</span>
            <span className="text-3xl font-black text-[#F9A51A]">{estate.price}</span>
          </div>

          <button
            onClick={handleToggleBookmark}
            className={`px-6 py-3.5 rounded-xl font-bold flex items-center gap-2.5 transition duration-200 border shadow-lg ${
              isBookmarked
                ? 'bg-[#F9A51A]/10 text-[#F9A51A] border-[#F9A51A]'
                : 'bg-slate-800 hover:bg-slate-700 text-white border-white/10'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill={isBookmarked ? '#F9A51A' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            {isBookmarked ? 'Bookmarked' : 'Bookmark Estate'}
          </button>
        </div>
      </div>

      {/* Image Gallery Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
          <img
            src={estate.image}
            alt={estate.estate_title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 h-[420px]">
          <div className="h-full rounded-2xl overflow-hidden border border-white/10 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              alt="Interior View"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-full rounded-2xl overflow-hidden border border-white/10 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
              alt="Architectural Detail"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Key Specifications Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-white/10 p-5 rounded-2xl text-center space-y-1 backdrop-blur-md">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Area</span>
          <p className="text-xl font-black text-white">{estate.area || 'N/A'}</p>
        </div>
        <div className="bg-slate-900 border border-white/10 p-5 rounded-2xl text-center space-y-1 backdrop-blur-md">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Bedrooms</span>
          <p className="text-xl font-black text-white">{estate.bedrooms || '4 Suite'}</p>
        </div>
        <div className="bg-slate-900 border border-white/10 p-5 rounded-2xl text-center space-y-1 backdrop-blur-md">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Bathrooms</span>
          <p className="text-xl font-black text-white">{estate.bathrooms || '5 Full'}</p>
        </div>
        <div className="bg-slate-900 border border-white/10 p-5 rounded-2xl text-center space-y-1 backdrop-blur-md">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Property ID</span>
          <p className="text-xl font-black text-[#F9A51A] font-mono">{estate.id}</p>
        </div>
      </div>

      {/* Overview & Facilities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Description & Features */}
        <div className="lg:col-span-2 space-y-8 bg-slate-900 border border-white/10 p-8 rounded-3xl shadow-xl">
          <div>
            <h2 className="text-2xl font-black text-white mb-4">Residence Overview</h2>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {estate.description}
            </p>
          </div>

          {/* Premium Facilities / Amenities */}
          {estate.facilities && estate.facilities.length > 0 && (
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Features & Amenities</h3>
              <div className="flex flex-wrap gap-3">
                {estate.facilities.map((facility, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-slate-800 border border-white/10 rounded-xl text-slate-200 text-xs font-semibold flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#F9A51A]"></span>
                    {facility}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Map Location & Agent Contact Widget */}
        <div className="space-y-6">
          
          {/* Location Map Box */}
          <div className="bg-slate-900 border border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F9A51A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Location & Map
            </h3>
            <p className="text-xs text-slate-400">{estate.location}</p>
            
            {/* Interactive Map Placeholder */}
            <div className="h-44 bg-slate-950 border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition duration-500" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80')` }}></div>
              <div className="relative z-10 text-center space-y-2 p-4 bg-slate-950/80 backdrop-blur-md rounded-xl border border-white/10">
                <span className="text-xs font-bold text-[#F9A51A] uppercase tracking-wider block">Interactive Map View</span>
                <span className="text-[11px] text-slate-300 block">Coordinates: 34.0522° N, 118.2437° W</span>
              </div>
            </div>
          </div>

          {/* Concierge Agent Contact */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#F9A51A]">Private Concierge</span>
            <h4 className="text-xl font-black text-white">Inquire About This Estate</h4>
            <p className="text-xs text-slate-400">
              Schedule a private viewing or speak directly with our luxury estate advisor.
            </p>
            <button
              onClick={() => toast.success('Concierge inquiry sent! Our advisor will contact you shortly.')}
              className="w-full py-3.5 bg-[#F9A51A] hover:bg-[#e09212] text-slate-950 font-bold text-sm rounded-xl transition shadow-lg shadow-[#F9A51A]/20"
            >
              Request Private Tour
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}