import React, { useState } from 'react';
import { Link } from "react-router-dom";

// Using inline SVG icons to replace react-icons/fa to avoid compilation errors
const MenuIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className="w-5 h-5"
    {...props}
  >
    <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
  </svg>
);

const CloseIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className="w-5 h-5"
    {...props}
  >
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
  </svg>
);


const Navbar = () => {
  // State to manage whether the mobile navigation is open or not
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Function to toggle the navigation menu
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Side: Logo/Brand Name */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white no-underline">
              VidyaVedas
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link 
              to="/home" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors no-underline"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors no-underline"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors no-underline"
            >
              Contact
            </Link>
          </div>

          {/* Right Side: Auth and Student Form Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors no-underline"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-500 transition-colors no-underline text-white"
            >
              Sign Up
            </Link>
            <Link
              to="/studentform"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-500 transition-colors no-underline"
            >
              Student Form
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleNav}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-label="Main menu"
              aria-expanded="false"
            >
              {isNavOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isNavOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/home" onClick={toggleNav} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 no-underline">
              Home
            </Link>
            <Link to="/about" onClick={toggleNav} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 no-underline">
              About
            </Link>
            <Link to="/contact" onClick={toggleNav} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 no-underline">
              Contact
            </Link>
            <hr className="border-gray-600 my-2" />
            <Link to="/studentform" onClick={toggleNav} className="block bg-blue-500 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 no-underline">
              Student Form
            </Link>
            <Link to="/login" onClick={toggleNav} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 no-underline">
              Login
            </Link>
            <Link to="/register" onClick={toggleNav} className="block bg-gray-600 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-500 no-underline">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;