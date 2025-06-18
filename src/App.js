import "./styles/App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { FoodTracking } from "./pages/FoodTracking";
import { Header } from "./components/Header";
import { BrowseFood } from "./pages/BrowseFood";
import { NewItem } from "./pages/NewItem";

function App() {
  return (
    <Router>
      <div id="container">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/browse" replace />} />
          <Route path="/browse" element={<BrowseFood />} />
          <Route path="/tracking" element={<FoodTracking />} />
          <Route path="/new/*" element={<NewItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
