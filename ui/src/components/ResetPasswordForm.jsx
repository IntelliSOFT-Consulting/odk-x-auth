import TextInput from "@carbon/react/lib/components/TextInput";
import { Button, Form } from "carbon-components-react";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../api/cookie";
import ApplicationContext from "../ApplicationContext";
import ResetPasswordEmailTemplate from "./ResetPasswordEmailTemplate";
import Swal from "sweetalert2";
import { Link } from "@carbon/react";

const getToken = (length, chars) => {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};
const ResetPasswordForm = () => {
  
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const sendLink = () => {
    if(!userInfo.email){
      Swal.fire({
        title:"Error",
        text:"Oops, you did not enter your email",
        icon:"error"
      })
      return;
    }
    const userName = "there";
    const token = getToken(
      32,
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    );
    setCookie("password_reset_token", token, 1);

    let user =getCookie("username");
    const fullName = "Esteemed user";
    const url =`${window.location.href.split(window.location.pathname)[0]}/confirm-password?password_reset_token=${token}&user_reset=${user}`;
    const emailBody = (
      <ResetPasswordEmailTemplate
        userName={userName}
        fullName={fullName}
        subject="Password Reset"
        confirmationUrl={url}
      />
    );
    Swal.fire({
      title: "Password reset link",
      html:`${url}`,
      icon: "info",
    });
 

  };
  return (
    <>
      <div className="cds--grid">
        <div className="cds--row">
          <div class="cds--col-lg-4 col--md-4 col--sm-0"></div>

          <div className="cds--col-lg-8 col--md-8 col--sm-4">
            <Form>
              <div className="cds--row">
                <div className="cds--col-lg-16">
                  <TextInput
                    type="email"
                    id="email"
                    placeholder="Enter the email linked to your account"
                    labelText="Email Address"
                    onChange={(e) => {
                      setUserInfo({
                        ...userInfo,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="cds--row">
                <div className="cds--col-lg-16">
                  <Button
                    kind="secondary"
                    className="block"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="block"
                    onClick={() => {
                      sendLink();
                    }}
                  >
                    Request Link
                  </Button>
                </div>
              </div>
            </Form>
          </div>
          <div class="cds--col-lg-4 col--sm-2"></div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;
