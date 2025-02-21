import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialLevels = [
  {
    id: 1,
    name: "Beginner's Luck",
    description: "Learn basic scams.",
    unlocked: true,
  },
  {
    id: 2,
    name: "Scam Buster",
    description: "Identify social engineering fraud.",
    unlocked: false,
  },
  {
    id: 3,
    name: "Cyber Detective",
    description: "Spot real-time scams.",
    unlocked: false,
  },
  {
    id: 4,
    name: "Phishing Awareness Quiz",
    description: "Test your knowledge of detection skills.",
    unlocked: false,
  },
  {
    id: 5,
    name: "Master of Deception",
    description: "Understand deepfake and fraud tactics.",
    unlocked: false,
  },
];

const LevelSelection = () => {
  const navigate = useNavigate();
  const [levels, setLevels] = useState(initialLevels);

  // Load unlocked levels from localStorage on mount
  useEffect(() => {
    const savedLevels =
      JSON.parse(localStorage.getItem("unlockedLevels")) || [];

    // Merge savedLevels with initialLevels while keeping names/descriptions
    const updatedLevels = initialLevels.map((level, index) => {
      const savedLevel = savedLevels.find((l) => l.id === level.id);
      return savedLevel ? { ...level, unlocked: savedLevel.unlocked } : level;
    });

    setLevels(updatedLevels);
  }, []);

  // Function to unlock the next level after completion
  const unlockNextLevel = (completedLevelId) => {
    setLevels((prevLevels) => {
      const updatedLevels = prevLevels.map((level) =>
        level.id === completedLevelId + 1 ? { ...level, unlocked: true } : level
      );

      // Save updated unlocked levels to localStorage
      localStorage.setItem("unlockedLevels", JSON.stringify(updatedLevels));
      return updatedLevels;
    });
  };

  return (
    <div className="text-center">
      <h1 className="text-5xl font-saira pt-2 text-center text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#A2FEFE_0%,#D5F6FA_40%,#DDF5F9_60%,#E9DBFC_80%,#ADC3FC_100%)] drop-shadow-[-15px_4px_8px_#6B1868] font-bold">
        Select Your Challenge!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12 w-fit mx-auto">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`p-4 flex flex-col items-center justify-center rounded-4xl shadow-lg w-80 h-60 ${
              level.unlocked
                ? "bg-gradient-to-b from-yellow-300 to-yellow-500 text-black"
                : "bg-gradient-to-b from-red-500 to-red-700 text-white opacity-50"
            }`}
          >
            <h2 className="font-bold text-3xl">{level.name}</h2>
            <p className="text-sm mt-2">{level.description}</p>

            <button
              className="mt-4"
              onClick={() => {
                if (level.unlocked) {
                  navigate(`/game/${level.id}`);
                  unlockNextLevel(level.id); // Unlock the next level after finishing
                }
              }}
              disabled={!level.unlocked}
            >
              <img
                src={level.unlocked ? "play.svg" : "locked.svg"}
                alt="play button"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelSelection;
