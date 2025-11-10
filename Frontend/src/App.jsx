import React, { useState } from "react";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Learn from "./pages/Learn";
import Quiz from "./pages/Quiz";
import Jobs from "./pages/Jobs";
import CoverLetter from "./pages/CoverLetter";
import AuthForm from "./components/sections/AuthForm";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className={`px-1 bg-[#0f172a] text-[#f1f5f9] min-h-screen ${isMobileMenuOpen ? 'pt-90' : 'pt-20'}`}>
        <BrowserRouter>
          <Navbar onMenuToggle={setIsMobileMenuOpen} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthForm />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/coverLetter" element={<CoverLetter />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
        />
      </div>
    </>
  );
}

export default App;