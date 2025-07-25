import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useNavigate } from "react-router-dom";

const Learn = () => {
  // Inside Learn component
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [response, setResponse] = useState("");
  const [displayedContent, setDisplayedContent] = useState(""); // for streaming
  const [isLoading, setIsLoading] = useState(false);

  const handleLearn = async () => {
    const selectedSubject = subject === "other" ? customSubject : subject;
    if (!selectedSubject || !level) {
      alert("Please select a subject and level.");
      return;
    }

    setResponse("");
    setDisplayedContent("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/learn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: selectedSubject, level }),
      });

      const data = await res.json();
      setResponse(data.content);
      simulateStreaming(data.content);
    } catch (error) {
      console.error("Error fetching learning material:", error);
      setResponse("⚠️ Failed to fetch learning material.");
      setDisplayedContent("⚠️ Failed to fetch learning material.");
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate content streaming
  const simulateStreaming = (text) => {
    const lines = text.split("\n\n"); // Split by paragraph
    let index = 0;

    const interval = setInterval(() => {
      if (index < lines.length) {
        setDisplayedContent((prev) => prev + lines[index] + "\n\n");
        index++;
      } else {
        clearInterval(interval);
      }
    }, 200); // 200ms delay between chunks
  };

  const handleNewTopic = () => {
    setSubject("");
    setCustomSubject("");
    setLevel("");
    setResponse("");
    setDisplayedContent("");
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
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-10">
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

        {subject === "other" && (
          <input
            type="text"
            placeholder="Enter subject"
            value={customSubject}
            onChange={(e) => setCustomSubject(e.target.value)}
            className="p-3 rounded-md text-[#0f172a] bg-white w-full md:w-[200px]"
          />
        )}

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

        <button
          onClick={handleLearn}
          className="bg-[#38bdf8] text-[#0f172a] px-6 py-3 rounded-md hover:bg-[#0ea5e9] transition"
        >
          Learn
        </button>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="text-center text-[#94a3b8] mb-6 animate-pulse">
          🧠 Thinking deeply... generating material...
        </div>
      )}

      {/* AI Response */}
      {displayedContent && (
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-[#38bdf8]">
            Learning Material:
          </h2>

          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-gray-800 text-pink-400 px-1 py-0.5 rounded">
                      {children}
                    </code>
                  );
                },
              }}
            >
              {displayedContent}
            </ReactMarkdown>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleNewTopic}
              className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition"
            >
              🔄 New Topic
            </button>
            <button
              onClick={() => navigate("/quiz", { state: { subject, level } })}
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
