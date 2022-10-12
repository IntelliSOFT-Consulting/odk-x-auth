import {
  Button,
  Checkbox,
  ExpandableTile,
  Form,
  TextInput,

} from "@carbon/react";

import React, { useState } from "react";


import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import { LDAPApi } from "../api/auth";
import { getCookie } from "../api/cookie";

const NewGroupForm = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const saveData = async() => {
    console.log(userInfo);
    let requiredFields = ["group_name", "group_id"];
    let filledInFields = Object.keys(userInfo);
    let missingFields =
      requiredFields.filter((key) => !filledInFields.includes(key)) || [];

    if (missingFields.length > 0) {
      Swal.fire({
        title: "Error. Missing data!",
        html: `Missing MANDATORY fields :[ <b style="color:red">${missingFields.join(
          ", "
        )}</b>] .`,
        icon: "error",
        confirmButtonText: "Okay",
      });
    } else {
      const method = "POST";
      const url = "/api/groups";
      const params = { method, url };
      let gid = parseInt(userInfo.group_id);
      let group_name = userInfo.group_name;
      let body = { "gidNumber": gid, "name": group_name };
      let payload = { ...params, url, body };
      console.log(payload);
      ///

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
          html: `Created Grouo ${userInfo.group_name}  with Group ID:[ <b style="color:blue">${userInfo.group_id} </b>] `,
          icon: "success",
          confirmButtonText: "Okay",
        });
        window.location.href ="/users"
        // navigate("/groups")
      }

     
    }
  };

  return (
    <>
      <Form className="loginForm">
        <div className="cds--grid">
          <div className="cds--col-lg-2 cds--col-md-2"></div>
          <div className="cds--col-lg-8">
            <div className="cds--row">
              <div className="cds--col-lg-16">
                <TextInput
                  id="group_id"
                  placeholder="Input Group ID"
                  labelText = "Group ID"
                  onChange={(e) => {
                    setUserInfo({
                      ...userInfo,
                      group_id: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="cds--row">
              <div className="cds--col-lg-16">
                <TextInput
                  id="group_name"
                  placeholder="Input Group Name"
                  labelText = "Group Name"
                  onChange={(e) => {
                    setUserInfo({
                      ...userInfo,
                      group_name: e.target.value,
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
                    saveData();
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
            <div className="cds--col-lg-2 cds--col-md-2"></div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default NewGroupForm;
