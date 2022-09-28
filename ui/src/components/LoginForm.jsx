import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Form, TextInput, Button } from "carbon-components-react";

import { setCookie } from "../api/cookie";
import { apiHost } from "../api/auth";
import Footer from "../pages/Footer";
import base from "../api/airtable";
import Swal from "sweetalert2";
import { Modal } from "@carbon/react";
import ApplicationContext from "../ApplicationContext";
import { useContext } from "react";


const LoginForm = () => {
  const [loginInfo, setLoginInfo] = useState({});
  let navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(false);
  const [passwordChangeInfo, setPasswordChangeInfo] = useState({});

  const [allRecords, setAllRecords] = useState([]);
  useEffect(() => {
    base("Users")
      .select({
        view: "Grid view",
      })
      .eachPage((records, fetchNextPage) => {
        setAllRecords(records);
        fetchNextPage();
      });
  }, []);
  const validateCredentials = async (user, password) => {
    const data = { user, password };
    const url = "/api/auth/login";

    const method = "GET";
    const params = { method, data, url, apiHost };
    console.log("Params: "+JSON.stringify(params));
    try {
      let response = await fetch(String(`${apiHost}${params.url}`), {
        headers: { "Content-Type": "application/json"},
        method: params.method ? String(params.method) : "GET",
        ...(params.method !== "GET" && { body: String(params.data) }),
      });
      let responseJSON = await response.json();
      let res = {
        status: "success",
        statusText: response.statusText,
        data: responseJSON,
      };
      return res;
    } catch (error) {
      console.error(error);
      let res = {
        statusText: "LDAPAPIFetch: "+JSON.stringify(params),
        status: "error",
        error: error,
      };
      console.error(error);
      return res;
    }
  };
  const login = () => {
   
    if (!loginInfo["username"] || !loginInfo["password"]) {
      Swal.fire({
        title: "Error!",
        text: "You must provide both login credentials to proceed",
        icon: "error",
        confirmButtonText: "Okay",
      });
    } else {
      console.log(loginInfo["username"], loginInfo["password"])
      validateCredentials(loginInfo["username"], loginInfo["password"]).then(
        (res) => {
          if (res.status === "error") {
            Swal.fire({
              title: "Error!",
              text: res.statusText,
              icon: "error",
              confirmButtonText: "Okay",
            });
          } else {
            setCookie("token", res["token"], 1);
            setCookie("username", loginInfo["username"], 1);
            navigate("/dashboard");
          }
        }
      );
    }
  };
  const defaultModaloptions = () => {
    const danger = false;
    const modalHeading = "Change Password";
    const modalLabel = "";
    const primaryButtonText = "Save";
    const secondaryButtonText = "Cancel";
    let content = (
      <ChangePasswordForm setPasswordChangeInfo={setPasswordChangeInfo} />
    );
    const someFun = () => {
      alert("I am pied piper...");
    };
    return {
      danger,
      modalHeading,
      modalLabel,
      secondaryButtonText,
      primaryButtonText,
      content,
      someFun,
    };
  };
  let onRequestClose = () => {
    setIsOpen(false);
  };
  let onRequestSubmit = () => {
    setIsOpen(false);
    const payload = passwordChangeInfo;

    const actualID = payload.id;
    delete payload["id"];
    console.log("id:" + actualID + ", fields: " + JSON.stringify(payload));

    if (actualID === undefined || payload === {}) {
      Swal.fire({
        title: "No data to change",
        icon: "info",
        text: "Nothing to change",
      });

      return;
    }
    base("Users").update(
      [
        {
          id: actualID,
          fields: payload,
        },
      ],
      function (err, records) {
        if (err) {
          Swal.fire({
            title: `Error!:${err.error}`,
            icon: "error",
            html: `${err.message}`,
            confirmButtonText: "Okay",
          });
          return;
        }
        // records.forEach(function (record) {
        Swal.fire({
          title: "Records Updated",
          icon: "success",
          html: `Updated record for ${actualID}`,
          confirmButtonText: "Okay",
        });
        window.location.reload(false);
      }
    );
  };

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
                <Button
                  onClick={() => {
                    login();
                  }}
                >
                  Log In
                </Button>
              </div>
              <div>
                <Button kind="ghost"></Button>
                <Button
                  kind="ghost"
                  onClick={() => {
                    navigate("/reset-password");
                  }}
                >
                  Forgot Password
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      {isOpen && (
        <ChangePasswordModal
          options={{
            ...defaultModaloptions(),
            onRequestClose,
            onRequestSubmit,
          }}
        />
      )}
    </>
  );
};

const ChangePasswordModal = ({ options }) => {
  return (
    <Modal
      open
      alert={true}
      danger={options.danger}
      modalHeading={options.modalHeading}
      modalLabel={options.modalLabel || ""}
      primaryButtonText={options.primaryButtonText}
      secondaryButtonText={options.secondaryButtonText}
      onRequestClose={options.onRequestClose}
      onRequestSubmit={options.onRequestSubmit}
    >
      {options.content}
    </Modal>
  );
};

const ChangePasswordForm = ({ setPasswordChangeInfo }) => {
  const { users, groups } = useContext(ApplicationContext);
  const [passwordPayload, setPasswordPayLoad] = useState({});
  return (
    <>
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-lg-16">
            <Form>
              <div className="cds--row">
                <div className="cds--col-lg-16">
                  <Button kind="danger--ghost">Get token</Button>
                  <br />
                </div>
              </div>
              <div className="cds--row">
                <div className="cds--col-lg-16">
                  <TextInput
                    id="token"
                    type="text"
                    required
                    placeholder="Input Token"
                  />
                  <br />
                </div>
              </div>

              <div className="cds--row">
                <div className="cds--col-lg-16">
                  <TextInput
                    id="new_password"
                    type="password"
                    placeholder="Input New Password"
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
                  />
                </div>
              </div>
            </Form>
          </div>
        </div>{" "}
      </div>
    </>
  );
};
export default LoginForm;
