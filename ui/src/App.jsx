import React from "react";
import "./App.scss";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" exact element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" exact element={<Users />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
