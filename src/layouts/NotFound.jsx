import React from 'react';
import { Link } from 'react-router';
import useDocumentTitle from '../newHooks/useDocumentTitle';

export default function NotFound() {
    useDocumentTitle('404 - Page Not Found');
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-16">
      
      {/* 404 Large Glowing Badge */}
      <div className="relative mb-6">
        <div className="absolute -inset-4 bg-[#F9A51A]/10 rounded-full blur-2xl"></div>
        <h1 className="relative text-7xl sm:text-9xl font-black text-white tracking-widest drop-shadow-lg">
          4<span className="text-[#F9A51A]">0</span>4
        </h1>
      </div>

      {/* Error Message */}
      <div className="max-w-md space-y-3 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Property or Page Not Found
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          The residence or page you are looking for might have been removed, had its address changed, or is temporarily unavailable.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <Link
          to="/"
          className="w-full sm:w-auto px-8 py-3.5 bg-[#F9A51A] hover:bg-[#e09212] text-slate-950 font-bold text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Return to Homepage
        </Link>
        
        <button
          onClick={() => window.history.back()}
          className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl border border-white/10 transition backdrop-blur-md"
        >
          Go Back
        </button>
      </div>

    </div>
  );
}