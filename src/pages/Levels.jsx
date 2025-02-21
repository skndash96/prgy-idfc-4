import { useNavigate } from "react-router-dom";

const levels = [
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
    unlocked: true,
  },
  {
    id: 3,
    name: "Cyber Detective",
    description: "Spot real-time scams.",
    unlocked: false,
  },
  {
    id: 4,
    name: "Master of Deception",
    description: "Understand deepfake and fraud tactics.",
    unlocked: false,
  },
  {
    id: 5,
    name: "Fraud Terminator",
    description: "Master all scam detection skills.",
    unlocked: false,
  },
];

const LevelSelection = () => {
  const navigate = useNavigate(); // Replaces useRouter()

  return (
    <div className="container text-center min-h-screen bg-gradient-to-b from-[#070625] via-40% to-[#3D348E] min-w-screen">
      <div className="absolute top-4 left-4">
        <img src="logo.png" alt="Game Logo" className="w-12 h-12" />
      </div>
      <h1 className="text-center text-[60px] pt-2 text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#A2FEFE_0%,#D5F6FA_40%,#DDF5F9_60%,#E9DBFC_80%,#ADC3FC_100%)] font-[Saira_Stencil_One] drop-shadow-[-15px_4px_8px_#6B1868]">
        Select Your Challenge!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`p-6 border rounded-[50px] shadow-lg ${
              level.unlocked ? "bg-[linear-gradient(to_bottom,#FDFEF2_0%,#FDF045_15%,#FDE409_40%,#FAC206_80%)] w-[450px] h-[220px]" : "bg-gray-300"
            }`}
          >
            <h2 className="text-xl font-semibold">{level.name}</h2>
            <button
              onClick={() => level.unlocked && navigate(`/game/${level.id}`)}
              disabled={!level.unlocked}
            >
              {level.unlocked ? <img src="play.svg"></img> : "Locked 🔒"}
            </button>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[20px] text-center text-white font-[Paytone-One] font-[900] absolute bottom-4 right-4">
        Privacy Policy | Terms of Use
      </p>
    </div>
  );
};

export default LevelSelection;
