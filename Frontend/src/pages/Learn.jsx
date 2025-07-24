import React, { useState } from "react";

const Learn = () => {
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [response, setResponse] = useState("");

  const handleLearn = () => {
    const selectedSubject = subject === "other" ? customSubject : subject;
    if (!selectedSubject || !level) {
      alert("Please select a subject and level.");
      return;
    }

    // TODO: Connect to backend or AI API
    setResponse(
      `📘 Here's a beginner-friendly introduction to ${selectedSubject} at the ${level} level.`
    );
  };

  const handleNewTopic = () => {
    setSubject("");
    setCustomSubject("");
    setLevel("");
    setResponse("");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f1f5f9] py-16 px-6 md:px-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#38bdf8] mb-4 animate-pulse">
          Learn Anything, Boost Your Knowledge
        </h1>
        <p className="text-lg md:text-xl text-[#cbd5e1]">
          Pick your topic and level — start your learning journey now!
        </p>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-10 bg-[#0f172a]">
        {/* Subject Select */}
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="p-3 rounded-md text-[#0f172a] bg-white w-full md:w-[200px]"
        >
          <option value="">Select Subject</option>
          <option value="JavaScript">JavaScript</option>
          <option value="React">React</option>
          <option value="Node">Node</option>
          <option value="Express">Express</option>
          <option value="MongoDB">MongoDB</option>
          <option value="Tailwind CSS">Tailwind CSS</option>
          <option value="other">Other</option>
        </select>

        {/* Custom Subject Input */}
        {subject === "other" && (
          <input
            type="text"
            placeholder="Enter subject"
            value={customSubject}
            onChange={(e) => setCustomSubject(e.target.value)}
            className="p-3 rounded-md text-[#0f172a] bg-white w-full md:w-[200px]"
          />
        )}

        {/* Level Select */}
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="p-3 rounded-md text-[#0f172a] bg-white w-full md:w-[200px]"
        >
          <option value="">Select Level</option>
          <option value="Basic">Basic</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {/* Learn Button */}
        <button
          onClick={handleLearn}
          className="bg-[#38bdf8] text-[#0f172a] px-6 py-3 rounded-md hover:bg-[#0ea5e9] transition"
        >
          Learn
        </button>
      </div>

      {/* AI Response Area */}
      {response && (
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-[#38bdf8]">Learning Material:</h2>
          <p className="text-[#f8fafc] mb-6">{response}</p>

          <div className="flex gap-4">
            <button
              onClick={handleNewTopic}
              className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition"
            >
              🔄 New Topic
            </button>
            <button
              onClick={() =>
                alert(`Quiz: You selected ${subject} - ${level}`)
              }
              className="px-4 py-2 bg-[#9333ea] text-white rounded-md hover:bg-[#7e22ce] transition"
            >
              🧠 Give Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Learn;
