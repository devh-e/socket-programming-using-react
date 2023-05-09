import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginContainer, PostingContainer } from "./containers";
import { StoreProvider } from "./context";

const App = () => {
    return (
        <StoreProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginContainer />} />
                    <Route path="/post" element={<PostingContainer />} />
                </Routes>
            </Router>
        </StoreProvider>
    );
};

export default App;
