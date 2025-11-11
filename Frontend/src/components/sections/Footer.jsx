import React from "react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleProtectedLinkClick = (path) => {
    const isLoggedIn = !!localStorage.getItem("token");
    
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <footer className="bg-slate-900 py-10 mt-16 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo / Name */}
        <div className="text-2xl font-bold text-white cursor-pointer" onClick={handleHomeClick}>
          JobReadyTutor
        </div>

        {/* Links */}
        <div className="flex gap-6 text-gray-300">
          <button 
            onClick={handleHomeClick}
            className="hover:text-white transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => handleProtectedLinkClick("/learn")}
            className="hover:text-white transition-colors"
          >
            Learn
          </button>
          <button 
            onClick={() => handleProtectedLinkClick("/jobs")}
            className="hover:text-white transition-colors"
          >
            Explore Jobs
          </button>
          <button 
            onClick={() => handleProtectedLinkClick("/quiz")}
            className="hover:text-white transition-colors"
          >
            Quiz
          </button>
          <button 
            onClick={() => handleProtectedLinkClick("/coverLetter")}
            className="hover:text-white transition-colors"
          >
            Cover Letter
          </button>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-gray-300 text-xl">
          <a href="https://www.linkedin.com/in/ghulam-murtaza-shahani/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            <FaLinkedin />
          </a>
          <a href="https://github.com/Murtaza-Shahani" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            <FaGithub />
          </a>
          <a href="https://www.instagram.com/murtaza_shahani1/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Credit Line */}
      <div className="text-center text-gray-400 mt-6 text-sm">
        Design and Develop with ❤️ and passion by{" "}
        <a 
          href="https://www.linkedin.com/in/ghulam-murtaza-shahani/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
        >
          Ghulam Murtaza
        </a>
        , A Full Stack Developer
      </div>

      <div className="text-center text-gray-500 mt-4 text-sm">
        &copy; {new Date().getFullYear()} JobReadyTutor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;