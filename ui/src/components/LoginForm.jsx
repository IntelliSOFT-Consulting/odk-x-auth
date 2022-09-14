import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'


import { Form, TextInput, Button } from "carbon-components-react";

import { setCookie } from "../api/cookie";
import { apiHost } from "../api/auth";
import Footer from "../pages/Footer";

const LoginForm = () => {
  const [loginInfo, setLoginInfo] = useState({});
  let navigate = useNavigate();
  let [open, setOpen] = useState(false);
  let [message, setMessage] = useState(false);
  const login =()=>{
    navigate("/dashboard")
  }

  return (
    
    <>
      <h1 className="LoginHeading">Login to ODK-X Admin</h1>
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-16">
            <p>UserName</p>
            <Form className="loginForm">
              <TextInput
                className="spacing-05"
                id="username"
                placeholder="Input User Name"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, username: e.target.value });
                }}
              />
              <p>Password</p>
              <TextInput
                className="spacing-05"
                type="password"
                placeholder="Input Password"
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, password: e.target.value });
                }}
              />
              <div className="LoginButtons">
                <Button kind="secondary">Cancel</Button>
                <Button onClick={()=>{login()}}>Log In</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>

     
    </>
  );
};

export default LoginForm;
