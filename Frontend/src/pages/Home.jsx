import React from "react";
import Slider from "react-slick";
import { theme } from "../theme";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { FaArrowRight,FaBriefcase,FaUserGraduate,FaChartLine } from "react-icons/fa";
import HowItWorks from "../components/sections/HowItWorks";
import CTASection from "../components/sections/CTASection";
import Footer from "../components/sections/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
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
      Icon: FaBriefcase,
      title: "Explore Jobs",
      description: "Find jobs that match your skills and passion.",
    },
    {
      Icon: FaUserGraduate,
      title: "Get Interview Ready",
      description: "Prepare with mock questions and career tips.",
    },
    {
      Icon: FaChartLine,
      title: "Grow Professionally",
      description: "Learn from curated resources and mentors.",
    },
  ];

  return (
    <div className={`w-full bg-[${theme.colors.background}] text-white`}>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12">
        {/* Left Section */}
        <div className="md:w-1/2 w-full mb-10 md:mb-0">
          <h1 className="text-5xl font-bold mb-4 font-[Poppins]">
            Welcome to <span className="text-blue-500">JobReadyTutor</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Discover opportunities, boost your confidence, and achieve your
            career goals with our platform.
          </p>
          <Button>
            Explore Jobs <FaArrowRight className="inline ml-2" />
          </Button>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 w-full max-w-md mx-auto">
          <Slider {...settings}>
            {images.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="rounded-xl object-cover w-full h-72 md:h-80 shadow-lg"
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
