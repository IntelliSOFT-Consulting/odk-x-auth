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
function App() {
  return (
    <>
    <ApplicationProvider>
    <Router>
      <Routes>
        <Route path="/" exact element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" exact element={<Users />} />
        <Route path="/new-user" exact element={<NewUser />} />
        <Route path="/groups" exact element={<Groups />} />
        <Route path="/new-group" exact element={<NewGroup />} />
        <Route path="/assign-user-to-group" exact element={<AssignUserToGroup />} />
        <Route path="/account-information" exact element={<AccountInformation />} />
        <Route path="/reset-password" exact element={<ResetPassword />} />
        <Route path="/confirm-password" exact element={<ConfirmPassword />} />
      </Routes>
    </Router>
    </ApplicationProvider>
    </>
  );
}

export default App;
