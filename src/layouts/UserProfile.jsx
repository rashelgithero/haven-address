import React, { useContext } from 'react';
import { Link } from 'react-router';
import { authContext } from '../layouts/AuthProvider/AuthProvider';
import useDocumentTitle from '../newHooks/useDocumentTitle';

export default function UserProfile() {
  useDocumentTitle('User Profile');

  const { user } = useContext(authContext) || {};

  // Identify authentication method/provider
  const providerId = user?.providerData[0]?.providerId || 'password';
  const getProviderName = (id) => {
    if (id === 'google.com') return 'Google Account';
    if (id === 'github.com') return 'GitHub Account';
    return 'Email & Password';
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      
      {/* Container Card */}
      <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden space-y-8">
        
        {/* Background Decorative Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F9A51A]/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        {/* Top Header & Edit Action */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#F9A51A]">Account Portfolio</span>
            <h1 className="text-3xl font-black text-white mt-1">User Profile</h1>
          </div>
          <Link
            to="/update-profile"
            className="px-5 py-2.5 bg-[#F9A51A] hover:bg-[#e09212] text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-[#F9A51A]/20 transition flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Profile
          </Link>
        </div>

        {/* User Profile Card */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-slate-950/60 p-6 rounded-2xl border border-white/5">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full border-2 border-[#F9A51A] overflow-hidden bg-slate-800 shrink-0 shadow-lg">
            <img
              src={user?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
              alt={user?.displayName || "User Avatar"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";
              }}
            />
          </div>

          {/* User Display Info */}
          <div className="space-y-2 text-center sm:text-left flex-grow">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-black text-white">{user?.displayName || 'Anonymous Member'}</h2>
              {user?.emailVerified ? (
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  Verified
                </span>
              ) : (
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  Active Member
                </span>
              )}
            </div>
            <p className="text-slate-400 text-sm font-medium">{user?.email || 'No Email Associated'}</p>
            
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#F9A51A]"></span>
                Connected via {getProviderName(providerId)}
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          
          {/* Display Name Box */}
          <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</p>
            <p className="text-slate-200 font-semibold">{user?.displayName || 'Not Provided'}</p>
          </div>

          {/* Email Address Box */}
          <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
            <p className="text-slate-200 font-semibold truncate">{user?.email || 'Not Provided'}</p>
          </div>

          {/* User UID Box */}
          <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">User Account ID</p>
            <p className="text-slate-400 text-xs font-mono truncate">{user?.uid || 'N/A'}</p>
          </div>

          {/* Photo URL Box */}
          <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avatar Source</p>
            <p className="text-slate-400 text-xs truncate">{user?.photoURL || 'Default Placeholder'}</p>
          </div>

        </div>

        {/* Quick Links Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs text-slate-400">
          <span>Haven Address Luxury Real Estate</span>
          <Link to="/saved-estates" className="text-[#F9A51A] hover:underline font-semibold">
            View Saved Estates →
          </Link>
        </div>

      </div>
    </div>
  );
}