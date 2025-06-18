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
import { Login } from "./pages/Login";

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
          <Route path="/account/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
