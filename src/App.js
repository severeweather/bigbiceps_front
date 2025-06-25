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
import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import { Register } from "./pages/Register";
import { Logout } from "./pages/Logout";

function App() {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    loading: true,
    user: null,
  });

  const refreshAuth = () => {
    fetch("http://localhost:8000/auth/status/", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setAuth({
          isAuthenticated: data.is_authenticated,
          loading: false,
          user: data.user || null,
        });
      })
      .catch(() => {
        setAuth({
          isAuthenticated: false,
          loading: false,
          user: null,
        });
      });
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return !auth.loading ? (
    <AuthContext.Provider value={{ auth, refreshAuth }}>
      <Router>
        <div id="container">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/browse" replace />} />
            <Route path="/browse" element={<BrowseFood />} />
            <Route path="/tracking" element={<FoodTracking />} />
            <Route path="/new/*" element={<NewItem />} />
            <Route path="/account/login" element={<Login />} />
            <Route path="/account/register" element={<Register />} />
            <Route path="/account/logout" element={<Logout />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  ) : (
    <>loading</>
  );
}

export default App;
