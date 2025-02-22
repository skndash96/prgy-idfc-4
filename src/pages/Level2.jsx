import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const audios = [
  { id: 1, title: "Scam Call 1", src: "/scam-1.mp3", scam: true },
  { id: 2, title: "Scam Call 2", src: "/genuine-1.mp3", scam: false },
  { id: 3, title: "Scam Call 3", src: "/scam-2.mp3", scam: true },
  { id: 4, title: "Scam Call 4", src: "/genuine-2.mp3", scam: false},
];

const Level2 = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [currentAudio, setCurrentAudio] = useState(0);
  const [scam, setScam] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = () => {
    if (scam === null) {
      alert("Please select an option before submitting.");
      return;
    }

    // Score update logic
    setScore(prevScore => (scam === audios[currentAudio].scam ? prevScore + 3 : prevScore - 1));

    if (currentAudio < audios.length - 1) {
      setCurrentAudio(prev => prev + 1);
      setScam(null); // Reset selection for the next question
    } else {
      setShowPopup(true); // Show final score popup
    }
  };

  return (
    <div className="text-center flex flex-col items-center justify-around gap-y-8">
      <div className="flex flex-col justify-between gap-y-4">
        <h1 className="text-6xl font-bold font-paytone flex">Scam Buster</h1>
        <p className="text-xl font-paytone mt-4">Identify scam calls.</p>
        <audio key={currentAudio} controls src={audios[currentAudio].src}></audio>
      </div>

      <div className="flex gap-x-9">
        {/* Scam Option */}
        <div className="bg-gradient-to-b from-yellow-100 to-yellow-500 text-black h-16 w-56 flex justify-center items-center text-3xl font-paytone rounded-4xl">
          <input
            type="radio"
            id="scam-input"
            name="scam-choice"
            checked={scam === true}
            onChange={() => setScam(true)}
            className="h-6 w-6"
          />
          <label htmlFor="scam-input" className="mb-2 ml-2 cursor-pointer">Scam</label>
        </div>

        {/* Not Scam Option */}
        <div className="bg-gradient-to-b from-yellow-100 to-yellow-500 text-black h-16 w-56 flex justify-center items-center text-3xl font-paytone rounded-4xl">
          <input
            type="radio"
            id="noscam-input"
            name="scam-choice"
            checked={scam === false}
            onChange={() => setScam(false)}
            className="h-6 w-6"
          />
          <label htmlFor="noscam-input" className="mb-2 ml-2 cursor-pointer">Not Scam</label>
        </div>

        {/* Submit Button */}
        <button
          className="bg-gradient-to-b from-yellow-100 to-yellow-500 text-black h-16 w-56 flex justify-center items-center text-3xl font-paytone rounded-4xl hover:cursor-pointer"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      <h2 className="text-4xl font-bold font-paytone">Score: {score}</h2>

      {/* Back to Levels Button */}
      <button
        className="mt-10 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer font-paytone hover:cursor-pointer"
        onClick={() => navigate("/levels")}
      >
        Back to Levels
      </button>

      {/* Final Score Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-8 rounded-lg text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
            <p className="text-2xl">Your final score: {score}</p>
            <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md font-bold hover:cursor-pointer"
              onClick={() => {
                setShowPopup(false);
                navigate("/game/3");
              }}
            >
              Next Level
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level2;
