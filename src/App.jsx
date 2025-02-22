import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LevelSelection from "./pages/Levels";
import Level1 from "./pages/Level1";
import Level2 from "./pages/Level2";
import Level3 from "./pages/Level3";
import Level4 from "./pages/Level4";
import Level5 from "./pages/Level5";
import Level6 from "./pages/Level6";
import ThankYou from "./pages/Thankyou";
import { ProfileProvider } from "./hooks/useProfile";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const App = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.loop = true;
      isMuted ? audioRef.current.pause() : audioRef.current.play();
    }
  }, [isMuted]);

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <ProfileProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#070625] via-40% to-[#3D348E] text-white relative">
        <audio ref={audioRef} src="/music.mp3" autoPlay loop />
        <button 
          onClick={toggleMute} 
          className="border-blue-300 border-4 absolute top-4 right-4 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-600"
        >
          {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
        </button>
        <Header />
        <div className="grow flex flex-col h-full">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/levels" element={<LevelSelection />} />
              <Route path="/game/1" element={<Level1 />} />
              <Route path="/game/2" element={<Level2 />} />
              <Route path="/game/3" element={<Level3 />} />
              <Route path="/game/4" element={<Level4 />} />
              <Route path="/game/5" element={<Level5 />} />
              <Route path="/game/6" element={<Level6 />} />
              <Route path="/thankyou" element={<ThankYou />} />
            </Routes>
          </Router>
        </div>
        <Footer />
      </div>
    </ProfileProvider>
  );
};

export default App;
