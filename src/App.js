import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayout from "./pages/DashboardLayout";
import Transactions from "./pages/Transactions";
import UserManagement from "./pages/UserManagement";
import Login from "./pages/Login";

function App() {
  const isLoggedIn = localStorage.getItem("token");

  useEffect(() => {
    const closeConsoleWarning = () => {
      console.log("%cSTOP!", "color: red; font-size: 40px; font-weight: bold;");
      console.log(
        "%cThis is a browser feature intended for developers.",
        "font-size: 18px;"
      );
      console.log(
        "%cIf someone told you to copy-paste something here, it is a scam.",
        "font-size: 18px;"
      );
    };

    window.addEventListener("contextmenu", closeConsoleWarning);
    window.addEventListener("keydown", (e) => {
      if (e.key === "F12") {
        closeConsoleWarning();
        e.preventDefault();
      }
    });

    return () => {
      window.removeEventListener("contextmenu", closeConsoleWarning);
      window.removeEventListener("keydown", closeConsoleWarning);
    };
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/userManagement" element={<UserManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
