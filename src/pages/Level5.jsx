import { useNavigate } from "react-router-dom";

const Level5 = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center min-h-screen flex flex-col items-center justify-center bg-[#ADC3FC]">
      <h1 className="text-4xl font-bold">Fraud Terminator</h1>
      <p className="text-lg mt-4">Master all scam detection skills and become a fraud terminator!</p>
      <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate("/levels")}>
        Back to Levels
      </button>
    </div>
  );
};

export default Level5;
