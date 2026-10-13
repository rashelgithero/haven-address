import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { authContext } from '../layouts/AuthProvider/AuthProvider';
import { toast } from 'react-toastify';
import useDocumentTitle from '../newHooks/useDocumentTitle';

export default function Register() {
  useDocumentTitle('Create Account');

  const { createUser, updateUserProfile } = useContext(authContext) || {};
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    // Password validation checks (at least 6 chars, 1 uppercase, 1 lowercase)
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter.');
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError('Password must contain at least one lowercase letter.');
      return;
    }

    setLoading(true);

    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photoURL)
          .then(() => {
            setLoading(false);
            toast.success('Account created successfully!');
            navigate('/');
          })
          .catch((err) => {
            setLoading(false);
            console.error(err);
            setError('Failed to update user profile info.');
          });
      })
      .catch((err) => {
        setLoading(false);
        if (err.code === 'auth/email-already-in-use') {
          setError('This email is already in use. Please sign in instead.');
        } else if (err.code === 'auth/invalid-email') {
          setError('Please provide a valid email address.');
        } else {
          setError('Registration failed. Please try again.');
        }
      });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-8 bg-slate-900/90 border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-md">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-black text-white tracking-tight">
            Join <span className="text-[#F9A51A]">Haven Address</span>
          </h2>
          <p className="text-xs text-slate-400 mt-2">Create an account to save luxury properties</p>
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

        {/* Registration Form */}
        <form className="mt-8 space-y-5" onSubmit={handleRegister}>
          
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#F9A51A] focus:ring-1 focus:ring-[#F9A51A] transition"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#F9A51A] focus:ring-1 focus:ring-[#F9A51A] transition"
            />
          </div>

          {/* Photo URL Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Photo URL</label>
            <input
              type="url"
              required
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#F9A51A] focus:ring-1 focus:ring-[#F9A51A] transition"
            />
          </div>

          {/* Password Field with Eye Icon Toggle */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#F9A51A] focus:ring-1 focus:ring-[#F9A51A] transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3.5 flex items-center text-slate-400 hover:text-white transition focus:outline-none"
              >
                {showPassword ? (
                  /* Eye Off Icon (Hide Password) */
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  /* Eye Icon (Show Password) */
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1.5">Must have 6+ characters, upper & lowercase letters.</p>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-[#F9A51A] hover:bg-[#e09212] text-slate-950 font-bold rounded-xl shadow-lg shadow-[#F9A51A]/20 transition duration-200 disabled:opacity-50 flex justify-center items-center"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>

        {/* Footer Link to Login */}
        <div className="text-center pt-2">
          <p className="text-sm text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#F9A51A] hover:underline font-semibold ml-1"
            >
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}