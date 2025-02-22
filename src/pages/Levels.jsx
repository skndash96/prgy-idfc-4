import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";

const initialLevels = [
  {
    id: 1,
    name: "Beginner's Luck",
    description: "Learn basic scams.",
    minScore: 8,
  },
  {
    id: 2,
    name: "Scam Buster",
    description: "Identify social engineering fraud.",
    minScore: 8,
  },
  {
    id: 3,
    name: "Phishing Awareness Quiz",
    description: "Test your knowledge of detection skills.",
    minScore: 8,
  },
  {
    id: 4,
    name: "Cyber Detective",
    description: "Spot real-time scams.",
    minScore: 8,
  },
  {
    id: 5,
    name: "Master of Deception",
    description: "Understand deepfake and fraud tactics.",
    minScore: 2,
  },
  {
    id: 6,
    name: "Fake news Detector",
    description: "Do you believe everything you see on social media?",
    minScore: 8,
  },
];

const LevelSelection = () => {
  const { profile } = useProfile()
  const navigate = useNavigate();
  const [levels, setLevels] = useState(initialLevels);

  return (
    <div className="pb-12 text-center">
      <h1 className="text-5xl font-saira pt-2 text-center text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#A2FEFE_0%,#D5F6FA_40%,#DDF5F9_60%,#E9DBFC_80%,#ADC3FC_100%)] drop-shadow-[-15px_4px_8px_#6B1868] font-bold">
        Select Your Challenge!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12 w-fit mx-auto">
        {levels.map((level, i) => {
          const prevLevel = i === 0 ? null : levels[i - 1];
          const unlocked = i === 0 || profile.stats[prevLevel.id]?.map(s => s.score).reduce((a, v, i) => i === 0 ? v : v > a ? v : a, 0) >= prevLevel.minScore;
          const score = profile.stats[level.id]?.reduce((a, v, i) => i === 0 ? v.score : v.score > a ? v.score : a, 0);

          return (
            <div
              key={level.id}
              className={`p-4 relative flex flex-col items-center justify-center rounded-4xl shadow-lg w-80 h-60 ${unlocked
                  ? "bg-gradient-to-b from-yellow-300 to-yellow-500 text-black"
                  : "bg-gradient-to-b from-red-500 to-red-700 text-white opacity-50"
                }`}
            >
              <h2 className="font-bold text-3xl font-paytone">{level.name}</h2>
              <p className="text-sm mt-2 font-paytone">{level.description}</p>

              {score && (
                <span className="absolute font-saira bottom-4 right-4">
                  High Score: {score}
                </span>
              )}

              <button
                className="mt-4"
                onClick={() => {
                  if (unlocked) {
                    navigate(`/game/${level.id}`);
                    unlockNextLevel(level.id); // Unlock the next level after finishing
                  }
                }}
                disabled={!unlocked}
              >
                <img
                  src={unlocked ? "play.svg" : "locked.svg"}
                  alt="play button"
                  className={unlocked ? "hover:cursor-pointer hover:scale-105" : "hover:cursor-not-allowed"}
                />
              </button>
            </div>
          )
        }
        )}
      </div>
    </div>
  );
};

export default LevelSelection;
