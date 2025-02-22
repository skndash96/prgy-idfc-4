import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useProfile } from "../hooks/useProfile";

const questions = [
  {
    id: 1,
    question: "You receive a call claiming you've won a lottery. What do you do?",
    options: [
      "Give them my bank details to claim the prize",
      "Ignore and hang up",
      "Ask them for proof and provide personal details",
      "Call the number back to confirm",
    ],
    correct: 1, // Index of correct answer (0-based)
  },
  {
    id: 2,
    question: "A caller says they are from your bank and need to verify your PIN. What should you do?",
    options: [
      "Provide my PIN immediately",
      "Hang up and call my bank using the official number",
      "Ask them to repeat the request",
      "Tell them I will visit the bank later",
    ],
    correct: 1,
  },
  {
    id: 3,
    question: "A stranger calls saying your relative is in danger and you need to send money. What is the best response?",
    options: [
      "Send money quickly to help",
      "Verify by calling the relative directly",
      "Ask the caller for their details",
      "Ignore and block the number",
    ],
    correct: 1,
  },
  {
    id: 4,
    question: "An unknown caller threatens legal action unless you pay an immediate fine. What do you do?",
    options: [
      "Ask for more details and pay if necessary",
      "Tell them to send an email and follow their instructions",
      "Ignore and report the number",
      "Ask them to call back later",
    ],
    correct: 2,
  },
];

const Level3 = () => {
  const { addScore } = useProfile()
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [passed, setPassed] = useState(false);
  const [startTime, setStartTime] = useState(new Date())

  const handleSubmit = () => {
    if (selectedOption === null) {
      alert("Please select an option before submitting.");
      return;
    }

    if (currentQuestion === 0) {
      setStartTime(new Date())
    }

    // Calculate new score
    const isCorrect = selectedOption === questions[currentQuestion].correct;
    const newScore = isCorrect ? score + 3 : score - 1;

    setScore(newScore); // Update the score

    if (currentQuestion < questions.length - 1) {
      // Move to the next question
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null); // Reset selection for next question
    } else {
      // Check pass condition and show popup
      setPassed(newScore > 5);
      setShowPopup(true);
      addScore(3, newScore, Math.floor((Date.now() - startTime.getTime())/1000));
    }
  };

  return (
    <div className="text-center flex flex-col items-center justify-around gap-y-8">
      <h1 className="text-6xl font-bold font-paytone">Scam Awareness Quiz</h1>
      <p className="text-xl font-paytone mt-4">Choose the best response to avoid scams.</p>

      <div className="bg-gradient-to-b from-yellow-100 to-yellow-500 text-black font-paytone p-6 rounded-lg shadow-md w-3/4">
        <h2 className="text-2xl font-bold">{questions[currentQuestion].question}</h2>

        <div className="mt-4 flex flex-col gap-y-2">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`p-3 text-lg rounded-lg hover:cursor-pointer ${
                selectedOption === index ? "bg-blue-400 text-white" : "bg-gray-100"
              } hover:bg-blue-300 transition`}
              onClick={() => setSelectedOption(index)}
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

      <h2 className="text-4xl font-bold font-paytone">Score: {score}</h2>

      {/* Back to Levels Button */}
      <button
        className="mt-10 bg-blue-500 text-white px-4 py-2 rounded font-paytone hover:cursor-pointer"
        onClick={() => navigate("/levels")}
      >
        Back to Levels
      </button>

      {/* Final Score Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-0">
          <div className="bg-white text-black p-8 rounded-lg text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
            <p className="text-2xl">{passed ? "Congratulations! You can proceed to the next level." : "You need a higher score to advance. Try again!"}</p>
            <button
              className={`mt-4 px-6 py-2 text-white rounded-md font-bold hover:cursor-pointer ${
                passed ? "bg-green-500" : "bg-red-500"
              }`}
              onClick={() => {
                setShowPopup(false);
                navigate(passed ? "/levels" : "/game/3");
              }}
            >
              {passed ? "Back to Levels" : "Retry Level"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level3;
