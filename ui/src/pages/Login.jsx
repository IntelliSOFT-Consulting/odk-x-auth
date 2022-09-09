import React from "react";
import LoginHeader from "../components/LoginHeader";
import LoginForm from "../components/LoginForm";
const Login = () => {
  return (
    <>
      <LoginHeader children={<LoginForm/>} pageHeading="Login" className="login-centered"></LoginHeader>
       
    </>
  );
};

export default Login;
