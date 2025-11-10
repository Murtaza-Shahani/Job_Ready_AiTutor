import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate } from 'react-router-dom'

const Navbar = ({ onMenuToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    const newMenuState = !menuOpen;
    setMenuOpen(newMenuState);
    // Pass the menu state to parent component
    if (onMenuToggle) {
      onMenuToggle(newMenuState);
    }
  };

  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user");
    navigate("/login")
  }

  const isLoggedIn = !!localStorage.getItem("token");

  // Close menu and notify parent when any link is clicked
  const handleLinkClick = () => {
    setMenuOpen(false);
    if (onMenuToggle) {
      onMenuToggle(false);
    }
  };

  return (
    <nav className="bg-[#0f172a] text-[#f1f5f9] px-6 py-4 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center">
        {/* Left: Logo */}
        <div className="text-2xl font-bold tracking-wide text-[#38bdf8]">
          <Link to="/" onClick={handleLinkClick}>JobReadyTutor</Link>
        </div>

        {/* Center: Menu Links (hidden on small) */}
        <div className="hidden md:flex gap-6 text-base">
          <Link to="/" className="hover:text-[#38bdf8] transition">Home</Link>
          {isLoggedIn && (
            <>
              <Link to="/learn" className="hover:text-[#38bdf8] transition">Learn</Link>
              <Link to="/quiz" className="hover:text-[#38bdf8] transition">Quiz</Link>
              <Link to="/jobs" className="hover:text-[#38bdf8] transition">Jobs</Link>
              <Link to="/coverLetter" className="hover:text-[#38bdf8] transition">Cover Letter</Link>
            </>
          )}
        </div>

        {/* Right: Buttons + Profile */}
        <div className="hidden md:flex gap-4 items-center">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-[130px] px-4 py-2 border border-red-500 rounded-md text-red-500 hover:bg-red-500 hover:text-white transition text-center"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="w-[130px] px-4 py-2 border border-[#38bdf8] rounded-md text-[#38bdf8] hover:bg-[#38bdf8] hover:text-[#0f172a] transition text-center"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile: Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile: Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3">
          <Link to="/" className="hover:text-[#38bdf8] transition" onClick={handleLinkClick}>Home</Link>
          {isLoggedIn && (
            <>
              <Link to="/learn" className="hover:text-[#38bdf8] transition" onClick={handleLinkClick}>Learn</Link>
              <Link to="/quiz" className="hover:text-[#38bdf8] transition" onClick={handleLinkClick}>Quiz</Link>
              <Link to="/jobs" className="hover:text-[#38bdf8] transition" onClick={handleLinkClick}>Jobs</Link>
              <Link to="/coverLetter" className="hover:text-[#38bdf8] transition" onClick={handleLinkClick}>Cover Letter</Link>
            </>
          )}
          {/* Auth Buttons - Separated */}
          {isLoggedIn ? (
            <button
              onClick={() => { handleLogout(); handleLinkClick(); }}
              className="w-[130px] px-4 py-2 border border-red-500 rounded-md text-red-500 hover:bg-red-500 hover:text-white transition text-center"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="w-[130px] px-4 py-2 border border-[#38bdf8] rounded-md text-[#38bdf8] hover:bg-[#38bdf8] hover:text-[#0f172a] transition text-center"
              onClick={handleLinkClick}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;