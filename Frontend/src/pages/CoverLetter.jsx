import React, { useState } from 'react';

const CoverLetter = () => {
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    companyName: '',
    skills: '',
  });

  const [generatedLetter, setGeneratedLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateCoverLetter = async () => {
    setLoading(true);
    setCopied(false);
    setError('');
    setGeneratedLetter('');

    try {
      const API = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${API}/api/cover-letter/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Something went wrong');

      setGeneratedLetter(data.coverLetter || 'No cover letter generated.');
    } catch (error) {
      console.error('Error generating cover letter:', error);
      setError(error.message || 'Failed to generate cover letter.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#141414] to-[#1e1e1e] text-white flex flex-col items-center px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
           AI Cover Letter Generator
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Fill in your details and get a personalized, professional cover letter tailored for your dream job.
        </p>
      </div>

      {/* Form */}
      <div className="w-full max-w-2xl bg-[#2a2a2a] p-6 rounded-2xl shadow-lg space-y-4 border border-gray-700">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-[#1a1a1a] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 transition"
        />

        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title (e.g. Frontend Developer)"
          value={formData.jobTitle}
          onChange={handleChange}
          className="w-full bg-[#1a1a1a] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 transition"
        />

        <input
          type="text"
          name="companyName"
          placeholder="Company Name (e.g. TechNova Inc.)"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full bg-[#1a1a1a] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 transition"
        />

        <textarea
          name="skills"
          placeholder="Key Skills, Strengths, or Achievements (comma separated)"
          rows="4"
          value={formData.skills}
          onChange={handleChange}
          className="w-full bg-[#1a1a1a] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 transition resize-none"
        />

        {error && (
          <p className="text-red-400 text-center font-medium">{error}</p>
        )}

        <button
          onClick={generateCoverLetter}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-lg transition-all ${
            loading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {loading ? '⏳ Generating Your Cover Letter...' : '✨ Generate Cover Letter'}
        </button>
      </div>

      {/* Generated Cover Letter */}
      {generatedLetter && (
        <div className="mt-12 w-full max-w-3xl bg-[#222222] p-8 rounded-2xl shadow-2xl relative border border-gray-700">
          {/* Copy Button (Top-Right Corner) */}
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-4 py-2 rounded-lg shadow-md transition"
          >
            {copied ? '✅ Copied' : '📋 Copy'}
          </button>

          <h2 className="text-2xl font-bold mb-4 text-yellow-400 text-center">
            📄 Your AI-Generated Cover Letter
          </h2>

          <div className="bg-[#1a1a1a] p-6 rounded-xl text-gray-100 leading-relaxed whitespace-pre-wrap font-light tracking-wide border border-gray-700 shadow-inner">
            {generatedLetter}
          </div>

          {/* Generate Another (Bottom-Centered) */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={generateCoverLetter}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-3 rounded-lg shadow-md transition"
            >
              🔄 Generate Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverLetter
