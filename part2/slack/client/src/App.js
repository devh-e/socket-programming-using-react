import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { IndexContainer, MainContainer } from "./containers";
import { StoreProvider } from "./context";
function App() {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<IndexContainer />} />
          <Route path="/main" element={<MainContainer />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
}

export default App;
