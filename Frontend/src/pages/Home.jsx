import React from "react";
import Slider from "react-slick";
import { theme } from "../theme";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useNavigate } from 'react-router-dom';
import {
  FaArrowRight,
  FaLayerGroup,
  FaBookOpen,
  FaClipboardCheck,
  FaBriefcase,
  FaFileSignature,
  FaChartLine,
} from "react-icons/fa";
import HowItWorks from "../components/sections/HowItWorks";
import CTASection from "../components/sections/CTASection";
import Footer from "../components/sections/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
const navigate = useNavigate(); 
  const handleClick = () => {
    navigate("/login"); // Navigate to the login page when the button is clicked
  };
  
  const images = ["/image1.jpg", "/image2.jpg", "/image3.png", "/image4.jpg"];
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  

const cards = [
  {
    Icon: FaLayerGroup,
    title: "All-in-One Platform",
    description:
      "Access everything in one place — learning, quizzes, job search, and AI tools to accelerate your career growth.",
  },
  {
    Icon: FaBookOpen,
    title: "Learn at Your Level",
    description:
      "Master any topic at your own pace — from beginner to expert, with personalized AI guidance.",
  },
  {
    Icon: FaClipboardCheck,
    title: "Test Your Skills",
    description:
      "Challenge yourself with quizzes and assessments designed to strengthen your learning and confidence.",
  },
  {
    Icon: FaBriefcase,
    title: "Explore Jobs",
    description:
      "Discover jobs that perfectly match your skills, location, and career level — Junior, Mid, or Senior.",
  },
  {
    Icon: FaFileSignature,
    title: "Get Your Cover Letter",
    description:
      "Instantly generate professional, customized cover letters with the power of AI.",
  },
  {
    Icon: FaChartLine,
    title: "Grow Professionally",
    description:
      "Keep improving with curated career insights, tips, and learning resources tailored for your success.",
  },
];


  return (
    <div className={`w-full bg-[${theme.colors.background}] text-white`}>
      {/* Hero Section */}
     <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-4 sm:px-6 md:px-12 lg:px-16 py-10 lg:py-16 gap-8">
  {/* Left Section */}
  <div className="w-full lg:w-1/2 text-center lg:text-left">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-[Poppins] leading-tight">
      Welcome to <span className="text-blue-500">JobReadyTutor</span>
    </h1>
    <p className="text-base sm:text-lg text-gray-300 mb-6 max-w-md mx-auto lg:mx-0">
      Discover opportunities, boost your confidence, and achieve your
      career goals with our platform.
    </p>
    <div className="flex justify-center lg:justify-start">
      <Button onClick={handleClick} className="flex items-center gap-2 cursor-pointer">
        Get Started <FaArrowRight className="inline" />
      </Button>
    </div>
  </div>

  {/* Right Section */}
  <div className="w-full lg:w-1/2 max-w-md mx-auto">
    <Slider {...settings}>
      {images.map((img, index) => (
        <div key={index} className="flex justify-center">
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="rounded-xl object-cover w-full h-56 sm:h-64 md:h-72 lg:h-80 shadow-lg"
          />
        </div>
      ))}
    </Slider>
  </div>
</div>


      {/* Cards Section */}
      <div className="px-6 md:px-16 py-16 bg-slate-800">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose JobReadyTutor?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <Card key={i} {...card} />
          ))}
        </div>
      </div>
      {/* How It Works */}
      <HowItWorks />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
