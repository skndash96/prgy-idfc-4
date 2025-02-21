import { useNavigate } from "react-router-dom";

const Level4 = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center min-h-screen flex flex-col items-center justify-center bg-[#D5F6FA]">
      <h1 className="text-4xl font-bold">Master of Deception</h1>
      <p className="text-lg mt-4">Understand deepfake and fraud tactics.</p>
      <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate("/levels")}>
        Back to Levels
      </button>
    </div>
  );
};

export default Level4;
