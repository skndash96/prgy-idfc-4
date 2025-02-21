import { useNavigate } from "react-router-dom";

const Level2 = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center min-h-screen flex flex-col items-center justify-center bg-[#FDE409]">
      <h1 className="text-4xl font-bold">Scam Buster</h1>
      <p className="text-lg mt-4">Identify social engineering fraud and protect yourself.</p>
      <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate("/levels")}>
        Back to Levels
      </button>
    </div>
  );
};

export default Level2;
