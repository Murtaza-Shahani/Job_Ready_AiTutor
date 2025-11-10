import React from "react";
import { FaUserPlus, FaCompass, FaRocket } from "react-icons/fa";
import { theme } from "../../theme";

const steps = [
  
  {
    Icon: FaUserPlus,
    title: "Register & Login",
    description: "Create your account and log in to access all features and personalized recommendations.",
  },
  {
    Icon: FaCompass,
    title: "Explore & Select",
    description: "Navigate to any section — Learn, Quiz, or Jobs — and choose what interests you most.",
  },
  {
    Icon: FaRocket,
    title: "Grow Professionally",
    description: "Get instant results, build your knowledge, and advance your career exponentially.",
  },


  
  
];

const HowItWorks = () => {
  return (
    <div className={`bg-[${theme.colors.background}] py-16 px-6 md:px-16`}>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        How It Works
      </h2>
      <div className="grid md:grid-cols-3 gap-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
          >
            <step.Icon className="text-5xl text-blue-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
