import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import Home from "../src/pages/home";
import LevelSelection from "../src/pages/Levels";


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/levels" element={<LevelSelection />} />
          </Routes>
      </Router>
  );
}

export default App;   
