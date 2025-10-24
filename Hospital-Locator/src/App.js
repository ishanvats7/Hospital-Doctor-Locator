import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import HospitalPage from "./pages/HospitalPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./pages/context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/hospital/:id" element={<HospitalPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
