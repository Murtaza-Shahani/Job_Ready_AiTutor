import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
  const [techStack, setTechStack] = useState('');
  const [customTechStack, setCustomTechStack] = useState('');
  const [level, setLevel] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleFindJobs = async () => {
    setError('');
    if (!techStack || !level || !selectedLocation) {
      setError('❌ Please fill in all fields.');
      return;
    }

    const finalLocation =
      selectedLocation === 'Other' ? customLocation.trim() : selectedLocation;

    if (!finalLocation) {
      setError('❌ Please provide a valid location.');
      return;
    }

    const finalStack =
      techStack === 'Other' ? customTechStack.trim() : techStack;

    if (!finalStack) {
      setError('❌ Please provide a valid tech stack.');
      return;
    }

    setLoading(true);
    try {
      const API = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${API}/api/jobs/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stack: finalStack,
          level,
          location: finalLocation,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Something went wrong');
      }

      setJobs(result.data);
    } catch (err) {
      setError(err.message || '❌ Failed to fetch jobs');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTechStack('');
    setCustomTechStack('');
    setLevel('');
    setSelectedLocation('');
    setCustomLocation('');
    setJobs([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-cover bg-center h-[300px] flex items-center justify-center">
        <div className="bg-opacity-60 p-6 max-w-3xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Jobs Based on Your Interests</h1>
          <p className="text-lg">Filter jobs by tech stack, level of expertise, and location preferences.</p>
        </div>
      </div>

      {/* Filter Form */}
      <div className="max-w-5xl mx-auto bg-[#2a2a2a] p-6 rounded-xl shadow-lg mb-12 mt-5 ">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 " onSubmit={(e) => e.preventDefault()}>
          {/* Tech Stack */}
          <div>
            <label className="block mb-1 font-medium">Tech Stack</label>
            <select
              className="w-full p-2 rounded bg-[#1f1f1f] bg-white text-black"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
            >
              <option value="">Select Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="MERN">MERN Stack</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Other">Other</option>
            </select>
            {techStack === 'Other' && (
              <input
                type="text"
                placeholder="Enter custom stack"
                className="mt-2 w-full p-2 rounded bg-[#1f1f1f] bg-white text-black"
                value={customTechStack}
                onChange={(e) => setCustomTechStack(e.target.value)}
              />
            )}
          </div>

          {/* Level */}
          <div>
            <label className="block mb-1 font-medium">Experience Level</label>
            <select
              className="w-full p-2 rounded bg-[#1f1f1f] bg-white text-black"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Select Level</option>
              <option value="Junior">Junior</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <select
              className="w-full p-2 rounded bg-[#1f1f1f] bg-white text-black"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              <option value="Onsite">Onsite</option>
              <option value="Remote">Remote</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Other">Other</option>
            </select>
            {selectedLocation === 'Other' && (
              <input
                type="text"
                placeholder="Enter custom location"
                className="mt-2 w-full p-2 rounded bg-[#1f1f1f] bg-white text-black"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
              />
            )}
          </div>
        </form>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold transition"
            onClick={handleFindJobs}
            disabled={loading}
          >
            {loading ? '⏳ Finding Jobs for You...' : 'Find Jobs'}
          </button>
          {error && <p className="text-red-400 mt-2">{error}</p>}
        </div>
      </div>

      {/* Job Listings */}
      {jobs.length > 0 && (
        <div className="text-center text-2xl font-bold mb-6 animate-fade-in">
          Jobs for you 👇
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
        {!loading && jobs.length === 0 && (
          <p className="text-center text-gray-400 col-span-full">No jobs found. Try it now.</p>
        )}

        {loading && (
          <div className="col-span-full text-center text-blue-400 text-lg animate-pulse">
            ⏳ Fetching jobs, please wait...
          </div>
        )}

        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-[#2a2a2a] p-5 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
            <p className="text-sm mb-1"><span className="font-medium">Company:</span> {job.company}</p>
            <p className="text-sm mb-1"><span className="font-medium">Location:</span> {job.location}</p>
            <p className="text-sm mb-1"><span className="font-medium">Type:</span> {job.type}</p>
            <p className="text-sm mb-2"><span className="font-medium">Description:</span> {job.description}</p>
            <p className="text-sm"><span className="font-medium">HR Email:</span>{' '}
              <a href={`mailto:${job.email}`} className="text-blue-400 underline">{job.email}</a>
            </p>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      {jobs.length > 0 && (
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
          <button
            className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-6 rounded-lg font-semibold shadow-md transition mb-8"
            onClick={resetForm}
          >
            🔄 Explore Other Jobs
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-semibold shadow-md transition mb-8"
            onClick={() => navigate('/coverLetter')}
          >
            ✍️ Get Cover Letter
          </button>
        </div>
      )}
    </div>
  );
};

export default Jobs;
