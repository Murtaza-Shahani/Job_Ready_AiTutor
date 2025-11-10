import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [isAutoStart, setIsAutoStart] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Auto-start if navigated from Learn.jsx
  useEffect(() => {
    const initSubject = location.state?.subject || "";
    const initLevel = location.state?.level || "";

    if (initSubject && initLevel) {
      setSubject(initSubject);
      setLevel(initLevel);
      setIsAutoStart(true);
      handleStart(initSubject, initLevel);
    }
  }, []);

  const fetchQuiz = async (subject, level) => {
    setLoading(true);
    try {
      const API = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${API}/api/quiz/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, level }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load quiz");

      setQuizData(data.data);
      setSelectedOptions(Array(data.data.length).fill(null));
      setTimeLeft(data.data.length * 60);
      setSubmitted(false);
      setError("");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleStart = async (subject, level) => {
    if (!subject || !level) {
      setError("Please enter both subject and level.");
      return;
    }

    setHasStarted(true);
    await fetchQuiz(subject, level);
  };

  const handleOptionChange = (questionIndex, optionIndex) => {
    const updated = [...selectedOptions];
    updated[questionIndex] = optionIndex;
    setSelectedOptions(updated);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleTryAgain = () => {
    setQuizData([]);
    setSelectedOptions([]);
    setSubmitted(false);
    setHasStarted(false);
    setSubject("");
    setLevel("");
    setError("");
    setIsAutoStart(false);
  };

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const getScore = () => {
    return selectedOptions.reduce((score, selected, index) => {
      if (selected === quizData[index].answerIndex) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  useEffect(() => {
    if (submitted || loading || error || !hasStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, loading, error, hasStarted]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center text-xl">
        ⏳ Generating quiz{subject && <> for <span className="text-sky-400 mx-1">{subject}</span></>}...
      </div>
    );
  }

  if (!hasStarted && !isAutoStart) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center space-y-6 ">
        <h1 className="text-3xl font-bold text-purple-400"> Start a New Quiz</h1>

        {error && <div className="text-red-400">{error}</div>}

        <div className="space-y-4 w-[300px]">
          <input
            type="text"
            placeholder="Enter subject (e.g., JavaScript)"
            className="w-full p-2 rounded-md text-black bg-white"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <select
            className="w-full p-2 rounded-md text-black bg-white"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="">Select level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <button
            className="w-full py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition"
            onClick={() => handleStart(subject, level)}
          >
             Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-red-400 flex items-center justify-center text-xl pt-8">
        ❌ {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-10 px-4 md:px-16 pt-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-400 animate-pulse">
           Quiz Time
        </h1>
        {!submitted && (
          <div className="text-lg font-semibold text-yellow-400">
            ⏳ Time Left: <span className="font-mono">{formatTime(timeLeft)}</span>
          </div>
        )}
      </div>

      <div className="space-y-10">
        {quizData.map((q, i) => (
          <div key={i} className="bg-[#1e293b] p-6 rounded-xl shadow-lg">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              {i + 1}. {q.question}
            </h2>
            <div className="grid gap-3 md:w-[80%]">
              {q.options.map((opt, j) => (
                <label
                  key={j}
                  className={`p-3 rounded-lg border cursor-pointer transition-all
                    ${
                      selectedOptions[i] === j
                        ? "bg-purple-600 border-purple-400"
                        : "bg-[#334155] border-[#475569]"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name={`question-${i}`}
                    value={j}
                    checked={selectedOptions[i] === j}
                    onChange={() => handleOptionChange(i, j)}
                    className="mr-3"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <div className="text-center mt-10">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 text-lg bg-purple-600 hover:bg-purple-700 transition rounded-md font-medium"
          >
            Submit Quiz
          </button>
        </div>
      ) : (
        <div className="text-center mt-10 space-y-6">
          <div className="text-2xl font-bold text-green-400">
             Your Score: {getScore()} / {quizData.length}
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleTryAgain}
              className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 transition rounded-lg shadow-md"
            >
              🔁 Try Again
            </button>
            <button
              onClick={() => navigate("/jobs")}
              className="px-6 py-2 text-white bg-emerald-600 hover:bg-emerald-700 transition rounded-lg shadow-md"
            >
               Explore Jobs
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;