import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import HospitalPage from "./pages/HospitalPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/hospital/:id" element={<HospitalPage />} />
      </Routes>
    </Router>
  );
}

export default App;
