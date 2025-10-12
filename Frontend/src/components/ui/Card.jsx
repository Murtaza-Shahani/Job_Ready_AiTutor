import React from "react";

const Card = ({ Icon, title, description }) => {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
      <div className="bg-blue-600 p-4 rounded-full mb-4">
        <Icon className="text-4xl text-white" />
      </div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default Card;
