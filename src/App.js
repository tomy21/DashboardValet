import React from "react";
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
