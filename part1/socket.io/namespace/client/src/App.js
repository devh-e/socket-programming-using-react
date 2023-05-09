// 1
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import GoodsPage from "./GoodsPage";
import UserPage from "./UserPage";
import "./App.css";

function App() {
    return (
        // 2
        <Router>
            <Routes>
                <Route path="/" element={<Navigate replace to="/goods" />} />
                <Route path="/goods" element={<GoodsPage />} />
                <Route path="/user" element={<UserPage />} />
            </Routes>
        </Router>
    );
}

export default App;
