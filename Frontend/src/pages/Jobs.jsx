import React, { useState } from 'react';

const Jobs = () => {
  const [techStack, setTechStack] = useState('');
  const [level, setLevel] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [customLocation, setCustomLocation] = useState('');

  // Dummy data for preview
  const dummyJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      techStack: 'React, Tailwind',
      level: 'Junior',
      location: 'Remote',
      company: 'TechNova',
      email: 'hr@technova.com',
    },
    {
      id: 2,
      title: 'Backend Engineer',
      techStack: 'Node.js, MongoDB',
      level: 'Mid Level',
      location: 'Karachi',
      company: 'CodeWorks',
      email: 'jobs@codeworks.io',
    },
    {
      id: 3,
      title: 'ML Engineer',
      techStack: 'Python, TensorFlow',
      level: 'Senior',
      location: 'Islamabad',
      company: 'AI Vision',
      email: 'careers@aivision.ai',
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Background Image and Header */}
      <div
        className="bg-cover bg-center h-[300px] flex items-center justify-center"
        
      >
        <div className=" bg-opacity-60 p-6  max-w-3xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Jobs Based on Your Interests</h1>
          <p className="text-lg">Filter jobs by tech stack, level of expertise, and location preferences.</p>
        </div>
      </div>

      {/* Filter Form */}
      <div className="max-w-3xl mx-auto bg-[#2a2a2a] p-6 rounded-xl shadow-lg mb-12 mt-10">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tech Stack */}
          <div>
            <label className="block mb-1 font-medium">Tech Stack</label>
            <select
              className="w-full p-2 rounded bg-[#1f1f1f] text-white"
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
                className="mt-2 w-full p-2 rounded bg-[#1f1f1f] text-white"
                
              />
            )}
          </div>

          {/* Level */}
          <div>
            <label className="block mb-1 font-medium">Experience Level</label>
            <select
              className="w-full p-2 rounded bg-[#1f1f1f] text-white"
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
              className="w-full p-2 rounded bg-[#1f1f1f] text-white"
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
                className="mt-2 w-full p-2 rounded bg-[#1f1f1f] text-white"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
              />
            )}
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold transition"
            onClick={() => console.log('Submit filter')} // Will replace with backend integration later
          >
            Find Jobs
          </button>
        </div>
      </div>

      {/* Job Listings Section */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
        {dummyJobs.map((job) => (
          <div
            key={job.id}
            className="bg-[#2a2a2a] p-5 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
            <p className="text-sm mb-1"><span className="font-medium">Company:</span> {job.company}</p>
            <p className="text-sm mb-1"><span className="font-medium">Tech Stack:</span> {job.techStack}</p>
            <p className="text-sm mb-1"><span className="font-medium">Level:</span> {job.level}</p>
            <p className="text-sm mb-1"><span className="font-medium">Location:</span> {job.location}</p>
            <p className="text-sm"><span className="font-medium">HR Email:</span> <a href={`mailto:${job.email}`} className="text-blue-400 underline">{job.email}</a></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
