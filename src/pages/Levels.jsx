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
    <div className="">
      <h1 className="text-center text-5xl pt-2 text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#A2FEFE_0%,#D5F6FA_40%,#DDF5F9_60%,#E9DBFC_80%,#ADC3FC_100%)] font-saira drop-shadow-[-15px_4px_8px_#6B1868]">
        Select Your Challenge!
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 w-fit mx-auto">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`p-4 flex flex-col items-center justify-center rounded-4xl shadow-lg sm:w-50 md:w-70 lg:w-80 h-60 ${
              level.unlocked ? "bg-[linear-gradient(to_bottom,#FDFEF2_0%,#FDF045_15%,#FDE409_40%,#FAC206_80%)] drop-shadow-[0px_0px_20px_#72314B] text-black" : "bg-[linear-gradient(to_bottom,#F96D6D_10%,#FD4B45_30%,#FA0606_90%,#853E00_100%)] drop-shadow-[0px_0px_20px_#72314B] text-white"
            }`}
          >
            <h2 className="text-center font-paytone text-3xl">{level.name}</h2>
            <button
              className="absolute bottom-4 right-4"
              onClick={() => level.unlocked && navigate(`/game/${level.id}`)}
              disabled={!level.unlocked}
            >
              {level.unlocked ? <img src="play.svg" className=""></img> : <img src="locked.svg" className=""></img>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelSelection;
