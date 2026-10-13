import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { authContext } from '../layouts/AuthProvider/AuthProvider';
import { toast } from 'react-toastify';
import useDocumentTitle from '../newHooks/useDocumentTitle';

export default function UpdateProfile() {
  useDocumentTitle('Update Profile');

  const { user, updateUserProfile } = useContext(authContext) || {};
  const navigate = useNavigate();

  const [name, setName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Display name cannot be empty.');
      return;
    }

    setLoading(true);

    updateUserProfile(name, photoURL)
      .then(() => {
        setLoading(false);
        toast.success('Profile updated successfully!');
        navigate('/user-profile');
      })
      .catch((err) => {
        setLoading(false);
        console.error('Failed to update profile:', err);
        setError('Failed to update profile. Please try again.');
      });
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4 sm:px-6">
      <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-md space-y-8">
        
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#F9A51A]">Account Settings</span>
          <h1 className="text-3xl font-black text-white mt-1">Update Your Profile</h1>
          <p className="text-slate-400 text-sm mt-1">
            Modify your public display name and avatar photo URL below.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-center gap-3 text-red-400 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-6">
          
          {/* Email (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Address (Locked)
            </label>
            <input
              type="email"
              disabled
              value={user?.email || ''}
              className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-slate-500 cursor-not-allowed select-none"
            />
            <p className="text-xs text-slate-500 mt-1">Your primary email cannot be changed here.</p>
          </div>

          {/* Display Name Input */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Display Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#F9A51A] focus:ring-1 focus:ring-[#F9A51A] transition"
            />
          </div>

          {/* Photo URL Input */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Photo URL (Avatar Image)
            </label>
            <input
              type="url"
              required
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#F9A51A] focus:ring-1 focus:ring-[#F9A51A] transition"
            />
          </div>

          {/* Live Avatar Preview */}
          <div className="flex items-center gap-4 bg-slate-950/50 p-4 rounded-2xl border border-white/5">
            <div className="w-14 h-14 rounded-full border-2 border-[#F9A51A] overflow-hidden bg-slate-800 shrink-0">
              <img
                src={photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                alt="Avatar Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
                }}
              />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Live Preview</p>
              <p className="text-sm font-bold text-white line-clamp-1">{name || 'Your Name'}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3.5 px-6 bg-[#F9A51A] hover:bg-[#e09212] text-slate-950 font-bold rounded-xl shadow-lg shadow-[#F9A51A]/20 transition duration-200 disabled:opacity-50 flex justify-center items-center"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                'Save Changes'
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/user-profile')}
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-white/10 transition"
            >
              Cancel
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}