import TextInput from "@carbon/react/lib/components/TextInput";
import { Button, Form } from "carbon-components-react";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../api/cookie";
import ResetPasswordEmailTemplate from "./ResetPasswordEmailTemplate";
import Swal from "sweetalert2";

const getToken = (length, chars) => {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};
const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const sendLink = async () => {
    if (!userInfo.email) {
      Swal.fire({
        title: "Error",
        text: "Oops, you did not enter your email",
        icon: "error",
      });
      return;
    }

    let url = "/api/auth/reset-password";
    let method = "POST";
    let body = { "user": userInfo.email };

    let data = await (
      await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
        body: JSON.stringify(body),
      })
    ).json();

    if (data.status === "error") {
      Swal.fire({
        title: "Error",
        text: data.statusText || data.error,
        icon: "error",
      });
      return;
    } else {
      Swal.fire({
        title: "Success!",
        html: `${data.message || data.status || data.statusText}`,
        icon: "success",
        confirmButtonText: "Okay",
      });
    }

   
  };
  return (
    <>
      <div className="cds--grid">
        <div className="cds--row">
        
        <div class="cds--col-lg-3 cds--col-md-3"></div>


          <div className="cds--col-lg-8 col--md-8 col--sm-4" style={{"place-items":"left!important"}}>
            <Form>
              <div className="cds--row">
                <div className="cds--col-lg-16">
                  <TextInput
                    type="email"
                    id="email"
                    placeholder="Enter the email address linked to your account"
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
          <div class="cds--col-lg-5"></div>

        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;
