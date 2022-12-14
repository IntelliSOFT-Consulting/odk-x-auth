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
  const changePassword = async() => {
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
      !payload.confirm_password 

    ) {
      Swal.fire({
        title: "Missing Information",
        icon: "error",
        text: "Please check that you have provided all information",
      });
      return;
    }
    let url ="/api/auth/set-password"
    let method = "POST"
    let body ={"password":payload.password}
    let data = await (
      await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
        html: `Updated password for ${actualID} `,
        icon: "success",
        confirmButtonText: "Okay",
      });
      
    }
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
