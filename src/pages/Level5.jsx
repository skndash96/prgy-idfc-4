import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const videos = [
  {
    id: 1,
    url: "https://www.example.com/video1.mp4", // Replace with actual video URL
    correct: "AI-Generated", // Correct answer
  },
  {
    id: 2,
    url: "https://www.example.com/video2.mp4", // Replace with actual video URL
    correct: "Real", // Correct answer
  },
  {
    id: 3,
    url: "https://www.example.com/video3.mp4", // Replace with actual video URL
    correct: "AI-Generated", // Correct answer
  },
];

const Level5 = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [passed, setPassed] = useState(false);

  const handleSubmit = () => {
    if (selectedOption === null) {
      alert("Please select an option before submitting.");
      return;
    }

    // Update score
    const isCorrect = selectedOption === videos[currentVideo].correct;
    const newScore = isCorrect ? score + 3 : score - 1;
    setScore(newScore);

    if (currentVideo < videos.length - 1) {
      setCurrentVideo((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      // Check if user passed and show popup
      setPassed(newScore > 2);
      setShowPopup(true);
    }
  };

  return (
    <div className="text-center flex flex-col items-center justify-around gap-y-8">
      <h1 className="text-6xl font-bold font-paytone">AI Detection Challenge</h1>
      <p className="text-xl font-paytone mt-4">Watch the video and decide if it's AI-Generated or Real.</p>

      <div className="bg-gradient-to-b from-yellow-100 to-yellow-500 text-black font-paytone p-6 rounded-lg shadow-md w-3/4">
        <video width="100%" height="auto" controls>
          <source src={videos[currentVideo].url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="mt-4 flex flex-col gap-y-2">
          <button
            className={`p-3 text-lg rounded-lg ${
              selectedOption === "AI-Generated" ? "bg-blue-400 text-white" : "bg-gray-100"
            } hover:bg-blue-300 transition`}
            onClick={() => setSelectedOption("AI-Generated")}
          >
            AI-Generated
          </button>
          <button
            className={`p-3 text-lg rounded-lg ${
              selectedOption === "Real" ? "bg-blue-400 text-white" : "bg-gray-100"
            } hover:bg-blue-300 transition`}
            onClick={() => setSelectedOption("Real")}
          >
            Real
          </button>
        </div>
      </div>

      <button
        className="bg-green-500 text-white px-6 py-3 rounded-md text-xl font-bold"
        onClick={handleSubmit}
      >
        Submit Answer
      </button>

      <h2 className="text-4xl font-bold font-paytone">Score: {score}</h2>

      {/* Back to Levels Button */}
      <button
        className="mt-10 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer font-paytone"
        onClick={() => navigate("/levels")}
      >
        Back to Levels
      </button>

      {/* Final Score Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-8 rounded-lg text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
            <p className="text-2xl">{passed ? "Congratulations! You can proceed to the next level." : "You need a higher score to advance. Try again!"}</p>
            <button
              className={`mt-4 px-6 py-2 text-white rounded-md font-bold ${
                passed ? "bg-green-500" : "bg-red-500"
              }`}
              onClick={() => {
                setShowPopup(false);
                navigate(passed ? "/game/6" : "/game/5");
              }}
            >
              {passed ? "Next Level" : "Retry Level"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level5;
