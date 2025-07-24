import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
    <div  className="bg-[#0f172a] text-[#f1f5f9] min-h-screen">
        
      <BrowserRouter>
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
