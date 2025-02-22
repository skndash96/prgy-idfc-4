import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useProfile } from "../hooks/useProfile";

const newsArticles = [
  {
    id: 1,
    text: "Breaking: Government announces 70% tax on all online transactions!",
    correct: "Phished",
  },
  {
    id: 2,
    text: "New study finds coffee can boost memory and brain function!",
    correct: "Genuine",
  },
  {
    id: 3,
    text: "Urgent: Your bank account has been compromised! Click here to secure it.",
    correct: "Phished",
  },
  {
    id: 4,
    text: "Scientists discover a new exoplanet with potential signs of life!",
    correct: "Genuine",
  },
];

const Level6 = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [currentNews, setCurrentNews] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [passed, setPassed] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { addScore } = useProfile();
  const [startTime, setStartTime] = useState(Date.now());

  const handleSubmit = () => {
    if (!selectedOption) {
      alert("Please select an option before submitting.");
      return;
    }

    const isCorrect = selectedOption === newsArticles[currentNews].correct;
    const newScore = score + (isCorrect ? 3 : -1);
    setScore(newScore);

    if (currentNews < newsArticles.length - 1) {
      setCurrentNews((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      addScore(6, newScore, Math.floor((Date.now() - startTime) / 1000));
      setPassed(newScore > 5);
      setShowPopup(true);
    }
  };

  return (
    <div className="text-center flex flex-col items-center justify-around gap-y-8 p-6">
      <h1 className="text-5xl font-bold font-paytone">Fake News Detection</h1>
      <p className="text-xl font-paytone mt-4">
        Read the news article and decide if it's Genuine or Phished.
      </p>

      <div className="bg-gradient-to-b from-red-100 to-red-500 text-black font-paytone p-6 rounded-lg shadow-md w-3/4">
        <p className="text-2xl font-semibold">
          {newsArticles[currentNews].text}
        </p>

        <div className="mt-4 flex flex-col gap-y-2">
          {["Genuine", "Phished"].map((option) => (
            <button
              key={option}
              className={`p-3 text-lg rounded-lg ${
                selectedOption === option
                  ? "bg-blue-400 text-white"
                  : "bg-gray-100"
              } hover:bg-blue-300 transition hover:cursor-pointer`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button
        className="bg-green-500 text-white px-6 py-3 rounded-md text-xl font-bold hover:cursor-pointer"
        onClick={handleSubmit}
      >
        Submit Answer
      </button>

      <h2 className="text-3xl font-bold font-paytone">Score: {score}</h2>

      <button
        className="mt-10 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer font-paytone hover:cursor-pointer"
        onClick={() => navigate("/levels")}
      >
        Back to Levels
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-8 rounded-lg text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
            <p className="text-2xl">
              {passed
                ? "You beat Level 6! Great job!"
                : "Try again to score higher!"}
            </p>
            <button
              className={`mt-4 px-6 py-2 text-white rounded-md font-bold hover:cursor-pointer ${
                passed ? "bg-green-500" : "bg-red-500"
              }`}
              onClick={() => {
                setShowPopup(false);
                navigate("/levels");
              }}
            >
              Back to Levels
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level6;
