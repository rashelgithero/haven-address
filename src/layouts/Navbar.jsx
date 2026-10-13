import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
// import HavenAddressLogo from './HavenAddressLogo';
import { authContext } from './AuthProvider/AuthProvider';

export default function NavBar() {
  const { user, logOut } = useContext(authContext) || {};

  // Extract initial for user profile avatar fallback
  const userInitial = user?.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : user?.email
    ? user.email.charAt(0).toUpperCase()
    : 'U';

  // Active link styling helper
  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors duration-200 ${
      isActive
        ? 'text-[#F9A51A] border-b-2 border-[#F9A51A] pb-1'
        : 'text-gray-200 hover:text-[#F9A51A]'
    }`;

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/update-profile" className={navLinkClass}>
          Update Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/user-profile" className={navLinkClass}>
          User Profile
        </NavLink>
      </li>
      {
        user && 
      <li>
        <NavLink to="/saved-states" className={navLinkClass}>
          Saved Estates
        </NavLink>
      </li>
      }
    </>
  );

  return (
    <div className=" backdrop-blur-md container lg:max-w-5xl mx-auto bg-[#972828] border-b border-white/10 sticky top-0 z-50">
      <div className="navbar  px-4 sm:px-6 py-3">
        
        {/* Navbar Start: Mobile Dropdown & Brand Logo */}
        <div className="navbar-start gap-2">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-slate-900 border border-white/10 rounded-2xl w-52 space-y-3"
            >
              {navLinks}
            </ul>
          </div>

          {/* Website Name / Logo */}
          <h2 className='text-[#FFF9F2] font-extrabold text-2xl text-center'><Link to="/">Haven  Address</Link></h2>
        </div>

        {/* Navbar Center: Desktop Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-8">{navLinks}</ul>
        </div>

        {/* Navbar End: User Profile Avatar & Login/Logout */}
        <div className="navbar-end flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Profile Avatar / Initial */}
              <div
                className="tooltip tooltip-bottom"
                data-tip={user.displayName || user.email || 'User'}
              >
                <Link to="/user-profile" className="avatar">
                  <div className="w-10 h-10 rounded-full border-2 border-[#F9A51A] bg-[#F9A51A] flex items-center justify-center text-slate-950 font-bold overflow-hidden shadow-md">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-base">{userInitial}</span>
                    )}
                  </div>
                </Link>
              </div>

              {/* Logout Button */}
              <button
                onClick={logOut}
                className="btn btn-md bg-[#FCAD38] hover:bg-[#e09212]  text-gray hover:text-gray-100 border-white/20 rounded-xl font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-md bg-[#FCAD38] hover:bg-[#e09212] text-gray hover:text-gray-100 border-none font-bold px-6 rounded-xl shadow-lg shadow-[#F9A51A]/20"
            >
              Login
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}