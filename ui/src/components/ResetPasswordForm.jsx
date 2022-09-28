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
  const { users } = useContext(ApplicationContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const sendLink = () => {
    console.log("Starting operation...");
    const userName = "salim7916";
    const token = getToken(
      32,
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    );
    setCookie("password_reset_token", token, 1);
    setCookie("username_rp", token, 1);
    //Get User details based on provided email.

    const fullName = "Salim Mwaura Ruru";
    const url = `${window.location.hostname}/confirm-password?username_rp=${userName}&password_reset_token=${token}`;
    const emailBody = (
      <ResetPasswordEmailTemplate
        userName={userName}
        fullName={fullName}
        subject="Password Reset"
        confirmationUrl={url}
      />
    );
    Swal.fire({
      title: "Password reset",
      html: <Link href={url}>Password reset</Link>,
      icon: "info",
    });
    //Send the email here
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
                    id="email_address"
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
