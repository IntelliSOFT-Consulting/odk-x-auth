import { ComboBox } from "@carbon/react";
import TextInput from "@carbon/react/lib/components/TextInput";
import { Button, Form } from "carbon-components-react";
import React from "react";
import { useState } from "react";
import * as qs from "query-string";
import Swal from "sweetalert2";
import base from "../api/airtable";
import { getCookie } from "../api/cookie";
import { LDAPApi } from "../api/auth";

const ConfirmPasswordForm = () => {
  const args = qs.parse(window.location.search);
  const actualID = args.user_reset;
  const token = args.token;
  const [userInfo, setUserInfo] = useState({});
  const handleCancel = () => {
    console.log(args);
  };
  const changePassword = () => {
    const payload = { ...userInfo, id: actualID };

    if (payload.password !== payload.confirm_password) {
      Swal.fire({
        title: "Password Mismatch",
        icon: "error",
        text: "Please check that your password matches",
      });
      return;
    }

    if (
      !payload.password ||
      !payload.confirm_password ||
    
      !actualID
    ) {
      Swal.fire({
        title: "Missing Information",
        icon: "error",
        text: "Please check that you have provided all information",
      });
      return;
    }

    if (getCookie("user_reset")===undefined || getCookie("user_reset")===null) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Link Expired or Invalid",
      });
    }
    if (token !==getCookie("password_reset_token")) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Sorry, invalid token. Please request for a new link and ensure that you use the SAME device.",
      });
    }

    let url ="/api/auth/reset-password"
    let method = "GET"
    let body ={"token":token,"password":payload.password,"user":actualID}
    let params ={url,method,body}
    LDAPApi(params).then(res=>{
      console.log(res);
      if (res.status === "error" || res.data.error) {
        Swal.fire({
          title: "Error",
          html: res.statusText,
          icon: "error",
        });
        return;
      }
      Swal.fire({
        title: "Success!",
        html: `Updated password for ${actualID}  .${res.statusText}`,
        icon: "success",
        confirmButtonText: "Okay",
      });
    })
  };

  return (
    <>
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-lg-2 cds--col-md-2"></div>
          <div className="cds--col-lg-8">
            <Form>
              <div className="cds--row">
                <div className="cds--col-lg-16">
                  <TextInput
                    id="new_password"
                    type="password"
                    placeholder="Input New Password"
                    labelText="Password"
                    onChange={(e) => {
                      setUserInfo({
                        ...userInfo,
                        password: e.target.value,
                      });
                    }}
                  />
                  <br />
                </div>
              </div>
              <div className="cds--row">
                <div className="cds--col-lg-16">
                  <TextInput
                    type="password"
                    id="confirm_password"
                    placeholder="Confirm New Password"
                    labelText="Confirm Password"
                    onChange={(e) => {
                      setUserInfo({
                        ...userInfo,
                        confirm_password: e.target.value,
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
                      handleCancel();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="block"
                    onClick={() => {
                      changePassword();
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Form>
          </div>
          <div className="cds--col-lg-2 cds--col-md-2"></div>
        </div>
      </div>
    </>
  );
};

export default ConfirmPasswordForm;
