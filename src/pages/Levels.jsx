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
      <div className="relative top-4 left-4 w-max">
        <img src="logo.png" alt="Game Logo" className="w-12 h-12" />
      </div>
      <h1 className="text-center text-[60px] pt-2 text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#A2FEFE_0%,#D5F6FA_40%,#DDF5F9_60%,#E9DBFC_80%,#ADC3FC_100%)] font-[Saira_Stencil_One] drop-shadow-[-15px_4px_8px_#6B1868]">
        Select Your Challenge!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 px-[15%]">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`p-6 rounded-[50px] shadow-lg sm:w-50 md:w-70 lg:w-80 h-[220px] ${
              level.unlocked ? "bg-[linear-gradient(to_bottom,#FDFEF2_0%,#FDF045_15%,#FDE409_40%,#FAC206_80%)] drop-shadow-[0px_0px_20px_#72314B]" : "bg-[linear-gradient(to_bottom,#F96D6D_10%,#FD4B45_30%,#FA0606_90%,#853E00_100%)] drop-shadow-[0px_0px_20px_#72314B] text-white"
            }`}
          >
            <h2 className="font-[Paytone-One] font-[900] text-[25px] pt-10">{level.name}</h2>
            <button
              onClick={() => level.unlocked && navigate(`/game/${level.id}`)}
              disabled={!level.unlocked}
            >
              {level.unlocked ? <img src="play.svg" className="mt-[40px]"></img> : <img src="locked.svg" className="mt-[40px]"></img>}
            </button>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[20px] sm:w-10 text-center text-white font-[Paytone-One] font-[900] fixed bottom-4 right-4">
        Privacy Policy | Terms of Use
      </p>
    </div>
  );
};

export default LevelSelection;
