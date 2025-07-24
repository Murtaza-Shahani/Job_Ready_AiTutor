// src/components/Home.jsx
import React from "react";
import Slider from "react-slick";
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

  return (
    <div className="w-full bg-gray-900 text-white flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12">
      {/* Left Section */}
      <div className="md:w-1/2 w-full mb-10 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-pulse">
          Welcome to JobReadyTutor
        </h1>
        <p className="text-lg md:text-xl mb-6 leading-relaxed text-gray-300">
          Your one-stop solution to discover job opportunities, get interview
          ready, and explore curated resources for career success.
        </p>
        <a
          href="/listings"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-6 py-3 rounded transition-all duration-300"
        >
          Explore Jobs
        </a>
      </div>

      {/* Right Section - Image Slider */}
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
  );
};

export default Home;
