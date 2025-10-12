import React from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 py-10 mt-16 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo / Name */}
        <div className="text-2xl font-bold text-white">JobReadyTutor</div>

        {/* Links */}
        <div className="flex gap-6 text-gray-300">
          <a href="/">Home</a>
          <a href="/listings">Explore Jobs</a>
          <a href="/quiz">Quiz</a>
          <a href="/cover-letter">Cover Letter</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-gray-300 text-xl">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
          <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-6 text-sm">
        &copy; {new Date().getFullYear()} JobReadyTutor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
