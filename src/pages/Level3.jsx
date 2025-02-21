import { useNavigate } from "react-router-dom";

const Level3 = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center min-h-screen flex flex-col items-center justify-center bg-[#FAC206]">
      <h1 className="text-4xl font-bold">Cyber Detective</h1>
      <p className="text-lg mt-4">Spot real-time scams and secure your online presence.</p>
      <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate("/levels")}>
        Back to Levels
      </button>
    </div>
  );
};

export default Level3;
