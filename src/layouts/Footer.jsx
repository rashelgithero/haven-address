import React from 'react';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-white/10 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (2 Columns Wide on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span className="text-[#F9A51A]">haven</span>address
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Discover extraordinary residential estates, luxury waterfront villas, and prime penthouses tailored for exclusive living.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* Social Icons */}
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform) => (
                <a
                  key={platform}
                  href={`#${platform}`}
                  className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#F9A51A] hover:border-[#F9A51A]/50 transition"
                  aria-label={platform}
                >
                  <span className="capitalize text-xs font-bold">{platform[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wider uppercase text-xs text-[#F9A51A]">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-[#F9A51A] transition">Home</Link></li>
              <li><Link to="/properties" className="hover:text-[#F9A51A] transition">Properties</Link></li>
              <li><Link to="/update-profile" className="hover:text-[#F9A51A] transition">Update Profile</Link></li>
              <li><Link to="/user-profile" className="hover:text-[#F9A51A] transition">User Profile</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wider uppercase text-xs text-[#F9A51A]">
              Estates
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#villas" className="hover:text-[#F9A51A] transition">Luxury Villas</a></li>
              <li><a href="#penthouses" className="hover:text-[#F9A51A] transition">Penthouses</a></li>
              <li><a href="#suburban" className="hover:text-[#F9A51A] transition">Suburban Homes</a></li>
              <li><a href="#waterfront" className="hover:text-[#F9A51A] transition">Waterfront Properties</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wider uppercase text-xs text-[#F9A51A]">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <span className="text-[#F9A51A]">📍</span>
                <span>742 Evergreen Terrace, Miami, FL 33101</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-[#F9A51A]">📞</span>
                <span>+1 (800) 555-HAVEN</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-[#F9A51A]">✉️</span>
                <span>concierge@havenaddress.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Newsletter Subscription Bar */}
        <div className="py-8 my-4 bg-slate-800/50 border border-white/5 rounded-2xl px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-white font-bold text-lg">Subscribe to Exclusive Property Alerts</h4>
            <p className="text-slate-400 text-xs mt-1">Get off-market luxury estate listings delivered to your inbox weekly.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#F9A51A] w-full md:w-64"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#F9A51A] hover:bg-[#e09212] text-slate-950 font-bold text-sm rounded-xl transition whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Haven Address Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-slate-400 transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400 transition">Terms of Service</a>
            <a href="#cookies" className="hover:text-slate-400 transition">Cookie Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
}