import React from "react";
import Button from "../ui/Button";
import { FaArrowRight } from "react-icons/fa";

const CTASection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 px-6 md:px-16 text-center rounded-3xl mx-6 md:mx-16 mt-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        Start your journey today
      </h2>
      <p className="text-gray-200 mb-8">
        Learn, apply, and succeed with JobReadyTutor. Everything you need for your career in one place.
      </p>
      <Button>
        Explore Jobs <FaArrowRight className="inline ml-2" />
      </Button>
    </div>
  );
};

export default CTASection;
