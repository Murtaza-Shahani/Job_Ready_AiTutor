import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { subject, level } = location.state || {};

  useEffect(() => {
    if (!subject || !level) {
      setError("Missing subject or level.");
      setLoading(false);
      return;
    }

    const fetchQuiz = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/quiz/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subject, level }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load quiz");

        setQuizData(data.data);
        setSelectedOptions(Array(data.data.length).fill(null));
        setTimeLeft(data.data.length * 60); // 1 min per question
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [subject, level]);

  // Timer
  useEffect(() => {
    if (submitted || loading || error) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); // Auto submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, loading, error]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    const updated = [...selectedOptions];
    updated[questionIndex] = optionIndex;
    setSelectedOptions(updated);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleTryAgain = () => {
    navigate("/quiz", { state: { subject, level } }); // Reloads quiz
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl">
        ⏳ Generating quiz for <span className="text-sky-400 mx-1">{subject}</span>...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-400 flex items-center justify-center text-xl">
        ❌ {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white py-10 px-4 md:px-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-400 animate-pulse">🧠 Quiz Time</h1>
        {!submitted && (
          <div className="text-lg font-semibold text-yellow-400">
            ⏳ Time Left: <span className="font-mono">{formatTime(timeLeft)}</span>
          </div>
        )}
      </div>

      <div className="space-y-10">
        {quizData.map((q, i) => (
          <div key={i} className="bg-[#2c2c2c] p-6 rounded-xl shadow-lg">
            <h2 className="text-lg md:text-xl font-semibold mb-4">{i + 1}. {q.question}</h2>
            <div className="grid gap-3 md:w-[80%]">
              {q.options.map((opt, j) => (
                <label
                  key={j}
                  className={`p-3 rounded-lg border cursor-pointer transition-all
                    ${selectedOptions[i] === j ? "bg-purple-600 border-purple-400" : "bg-[#3a3a3a] border-[#555]"}
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
            🎉 Your Score: {getScore()} / {quizData.length}
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleTryAgain}
              className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 transition rounded-lg shadow-md"
            >
              🔁 Try Again
            </button>
            <button
              onClick={() => navigate("/listings")}
              className="px-6 py-2 text-white bg-emerald-600 hover:bg-emerald-700 transition rounded-lg shadow-md"
            >
              💼 Explore Jobs
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
