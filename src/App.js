import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FoodTracking } from "./pages/FoodTracking";
import { Header } from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/tracking" element={<FoodTracking />} />
      </Routes>
    </Router>
  );
}

export default App;
