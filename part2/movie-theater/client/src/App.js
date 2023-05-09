import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomeContainer, SeatContainer } from "./containers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/seat/:id/:title" element={<SeatContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
