import React from "react";
import "./App.scss";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Groups from "./pages/Groups";
import NewGroup from "./pages/NewGroup";
import AssignUserToGroup from "./pages/AssignUserToGroup";
import AccountInformation from "./pages/AccountInformation";
import ResetPassword from "./pages/ResetPassword";
import ConfirmPassword from "./pages/ConfirmPassword";
import NewUser from "./pages/NewUser";
import {ApplicationProvider} from "./ApplicationContext";
import Login from "./pages/Login";
function App() {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" exact element={<ApplicationProvider><Dashboard /></ApplicationProvider>} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/dashboard" element={<ApplicationProvider><Dashboard /></ApplicationProvider>} />
        <Route path="/users" exact element={<ApplicationProvider><Users /></ApplicationProvider>} />
        <Route path="/new-user" exact element={<ApplicationProvider><NewUser /></ApplicationProvider>} />
        <Route path="/groups" exact element={<ApplicationProvider><Groups /></ApplicationProvider>} />
        <Route path="/new-group" exact element={<NewGroup />} />
        <Route path="/assign-user-to-group" exact element={<ApplicationProvider><AssignUserToGroup /></ApplicationProvider>} />
        <Route path="/account-information" exact element={<ApplicationProvider><AccountInformation /></ApplicationProvider>} />
        <Route path="/reset-password" exact element={<ResetPassword />} />
        <Route path="/confirm-password" exact element={<ConfirmPassword />} />
      </Routes>
    </Router>
  
    </>
  );
}

export default App;
