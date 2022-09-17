import React from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { getCookie } from "../api/cookie";

const sessionIsValid = () => {
  let cookie = getCookie("token");
  console.log(cookie);
  return cookie;
};
const Index = () => {
  if (!sessionIsValid()) {
    return <Login />;
  } else {
    return <Dashboard />;
  }
};

export default Index;
