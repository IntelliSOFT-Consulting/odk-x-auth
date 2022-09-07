import React from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";


const confirmSession = () => {
  return false;
};
const Index = () => {
  if (!confirmSession()){
    return <Login/>
  }else{
    return <Dashboard/>
  }
};

export default Index;
