import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LevelSelection from "./pages/Levels"; // Ensure this file exists
import Level1 from "./pages/Level1";
import Level2 from "./pages/Level2";
import Level3 from "./pages/Level3";
import Level4 from "./pages/Level4";
import Level5 from "./pages/Level5";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/levels" element={<LevelSelection />} />
        <Route path="/game/1" element={<Level1 />} />
        <Route path="/game/2" element={<Level2 />} />
        <Route path="/game/3" element={<Level3 />} />
        <Route path="/game/4" element={<Level4 />} />
        <Route path="/game/5" element={<Level5 />} />
      </Routes>
    </Router>
  );
};

export default App;
