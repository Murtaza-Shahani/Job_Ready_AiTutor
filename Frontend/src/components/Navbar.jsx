import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-[#0f172a] text-[#f1f5f9] px-6 py-4 shadow-lg fixed top-0 left-0 w-full ">
      <div className="flex justify-between items-center">
        {/* Left: Logo */}
        <div className="text-2xl font-bold tracking-wide text-[#38bdf8]">
          <Link to="/">JobReadyTutor</Link>
        </div>

        {/* Center: Menu Links (hidden on small) */}
        <div className="hidden md:flex gap-6 text-base">
          <Link to="/" className="hover:text-[#38bdf8] transition">Home</Link>
          <Link to="/learn" className="hover:text-[#38bdf8] transition">Learn</Link>
          <Link to="/quiz" className="hover:text-[#38bdf8] transition">Quiz</Link>
          <Link to="/jobs" className="hover:text-[#38bdf8] transition">Jobs</Link>
        </div>

        {/* Right: Buttons + Profile */}
        <div className="hidden md:flex gap-4 items-center">
          <Link
            to="/login"
            className="px-4 py-2 border border-[#38bdf8] rounded-md text-[#38bdf8] hover:bg-[#38bdf8] hover:text-[#0f172a] transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-[#9333ea] text-white rounded-md hover:bg-[#7e22ce] transition"
          >
            Signup
          </Link>
          <Link to="/dashboard" className="text-2xl text-[#38bdf8] hover:text-[#0ea5e9]">
            <FaUserCircle />
          </Link>
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
          <Link to="/" className="hover:text-[#38bdf8] transition" onClick={toggleMenu}>Home</Link>
          <Link to="/learn" className="hover:text-[#38bdf8] transition" onClick={toggleMenu}>Learn</Link>
          <Link to="/quiz" className="hover:text-[#38bdf8] transition" onClick={toggleMenu}>Quiz</Link>
          <Link to="/jobs" className="hover:text-[#38bdf8] transition" onClick={toggleMenu}>Jobs</Link>

          {/* Auth Buttons - Separated */}
          <Link
            to="/login"
            className="w-[130px] px-4 py-2 border border-[#38bdf8] rounded-md text-[#38bdf8] hover:bg-[#38bdf8] hover:text-[#0f172a] transition text-center"
            onClick={toggleMenu}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="w-[130px] px-4 py-2 bg-[#9333ea] text-white rounded-md hover:bg-[#7e22ce] transition text-center"
            onClick={toggleMenu}
          >
            Signup
          </Link>
          <Link
            to="/dashboard"
            className="text-2xl text-[#38bdf8] hover:text-[#0ea5e9] flex justify-start mt-2"
            onClick={toggleMenu}
          >
            <FaUserCircle />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
