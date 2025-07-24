import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Learn from "./pages/Learn";
function App() {
  return (
    <>
    <div className="pt-90 md:pt-20 px-1 bg-[#0f172a] text-[#f1f5f9] min-h-screen">
   
      <BrowserRouter>
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element = {<Learn/>}/>
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
