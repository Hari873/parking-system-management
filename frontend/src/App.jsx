import "../src/styles.css";
import { Link, Route, Routes } from 'react-router-dom';
import HomePage from "../src/pages/HomePage";
import SlotPage from "../src/pages/SlotPage";
import ExitPage from "../src/pages/ExitPage";
import ReadSlotPage from "../src/pages/ReadSlotPage";

function App() {

  return (
    <div className="App">
      <ul className="top-nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/read-slot">Read Slot</Link>
        </li>
        <li>
          <Link to="/slot">Slot</Link>
        </li>
        <li>
          <Link to="/exit">Exit</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/slot" element={<SlotPage />} />
        <Route path="/exit" element={<ExitPage />} />
        <Route path="/read-slot" element={<ReadSlotPage />} />
      </Routes>
    </div>
  )
}

export default App
