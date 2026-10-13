import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import useDocumentTitle from '../newHooks/useDocumentTitle';

export default function SavedEstates() {
  useDocumentTitle('Saved Estates & Wishlist');

  const [savedEstates, setSavedEstates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load saved estate IDs from localStorage and merge with estates.json data
  useEffect(() => {
    fetch('/estates.json')
      .then((res) => res.json())
      .then((data) => {
        const localSavedIds = JSON.parse(localStorage.getItem('saved_estates')) || [];
        const filtered = data.filter((item) => localSavedIds.includes(String(item.id)));
        setSavedEstates(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading saved estates:', err);
        setLoading(false);
      });
  }, []);

  // Remove single estate from saved list
  const handleRemove = (id) => {
    const localSavedIds = JSON.parse(localStorage.getItem('saved_estates')) || [];
    const updatedIds = localSavedIds.filter((savedId) => savedId !== String(id));
    
    localStorage.setItem('saved_estates', JSON.stringify(updatedIds));
    setSavedEstates((prev) => prev.filter((item) => String(item.id) !== String(id)));
    toast.info('Estate removed from your saved list.');
  };

  // Clear all saved estates
  const handleClearAll = () => {
    localStorage.removeItem('saved_estates');
    setSavedEstates([]);
    toast.info('Cleared all saved estates.');
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-[#F9A51A]"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#F9A51A]">Portfolio Wishlist</span>
          <h1 className="text-3xl font-black text-white mt-1">Saved Estates</h1>
          <p className="text-slate-400 text-sm mt-1">
            {savedEstates.length} {savedEstates.length === 1 ? 'property' : 'properties'} saved in your private collection.
          </p>
        </div>

        {savedEstates.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold rounded-xl transition"
          >
            Clear Wishlist
          </button>
        )}
      </div>

      {/* Empty State Display */}
      {savedEstates.length === 0 ? (
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-12 text-center space-y-6 max-w-xl mx-auto my-12 shadow-2xl">
          <div className="w-16 h-16 bg-[#F9A51A]/10 text-[#F9A51A] rounded-full flex items-center justify-center mx-auto border border-[#F9A51A]/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Your Wishlist is Empty</h2>
            <p className="text-slate-400 text-sm">
              Explore our exclusive luxury collection and bookmark your favorite residences.
            </p>
          </div>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-[#F9A51A] hover:bg-[#e09212] text-slate-950 font-bold text-sm rounded-xl transition shadow-lg shadow-[#F9A51A]/20"
          >
            Browse Luxury Residences
          </Link>
        </div>
      ) : (
        /* Grid Display of Saved Estates */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedEstates.map((estate) => (
            <div
              key={estate.id}
              className="bg-slate-900/80 border border-white/10 rounded-3xl overflow-hidden shadow-xl backdrop-blur-md flex flex-col justify-between hover:border-[#F9A51A]/50 transition duration-300 group"
            >
              <div>
                {/* Image & Price Tag */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={estate.image}
                    alt={estate.estate_title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[#F9A51A] text-xs font-black border border-white/10">
                    {estate.status || 'For Sale'}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-white font-extrabold text-sm border border-white/10">
                    {estate.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <span className="text-xs font-bold text-[#F9A51A] uppercase tracking-wider">
                    {estate.segment_name}
                  </span>
                  <h3 className="text-xl font-bold text-white line-clamp-1 group-hover:text-[#F9A51A] transition">
                    {estate.estate_title}
                  </h3>
                  <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                    {estate.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-slate-400 text-xs pt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F9A51A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="truncate">{estate.location}</span>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <Link
                  to={`/property/${estate.id}`}
                  className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-white/10 transition text-center"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleRemove(estate.id)}
                  title="Remove from wishlist"
                  className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}