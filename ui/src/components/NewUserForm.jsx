import TextInput from "@carbon/react/lib/components/TextInput";
import { Button, Form, Select, SelectItem } from "carbon-components-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../api/cookie";
import Swal from "sweetalert2";
import base from "../api/airtable";
import ApplicationContext from "../ApplicationContext";
import { useContext } from "react";
import { LDAPApi } from "../api/auth";

const NewUserForm = () => {
  const navigate = useNavigate();

  const { groups } = useContext(ApplicationContext);
  const [userInfo, setUserInfo] = useState({});
  const allGroups = groups; //JSON.parse(getCookie("odk-roles"));

  const roleSelectComponents = allGroups.map((row) => (
    <SelectItem value={row.group_name} text={row.group_name} />
  ));
  const addUser = async () => {
    console.log(userInfo);
    let requiredFields = [
      "first_name",
      "email",
      "last_name",
      "password",
      "group_name",
    ];
    let filledInFields = Object.keys(userInfo);
    let missingFields =
      requiredFields.filter((key) => !filledInFields.includes(key)) || [];
    let passwordMatch = userInfo.password === userInfo.confirm_password;
    if (!passwordMatch) {
      Swal.fire({
        title: "Error!",
        html: `Sorry, your passwords do not match`,
        icon: "error",
        confirmButtonText: "Okay, let me check",
      });
      return;
    }
    if (missingFields.length > 0) {
      Swal.fire({
        title: "Error!",
        html: `Missing MANDATORY fields:[ <b style="color:blue">${missingFields.join(
          ", "
        )}</b>] .`,
        icon: "error",
        confirmButtonText: "Okay",
      });
    } else {
      let group = groups
        ? groups.filter((row) => row.group_name === userInfo.group_name)
        : [];
      console.log("Selected "+JSON.stringify(group))
      let actualID = group[0] ? group[0]["uid"] : "";
      let payload = {
        user_name: userInfo.email,
        last_name: userInfo.last_name,
        password: userInfo.password,
        first_name: userInfo.first_name,
        email: userInfo.email,
        gidNumber: actualID,
      };
      let method = "POST";
      let url = "/api/auth/register";
      let body = payload;
      const params = { method: method, url: url, body: body };
      console.log(params);

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
          html: `Created User ${userInfo.last_name} ${userInfo.first_name} with Group ID:[ <b style="color:blue">${actualID} </b>] .${data.statusText}`,
          icon: "success",
          confirmButtonText: "Okay",
        });
      }

      //   LDAPApi(params).then((res) => {
      //     console.log(res);
      //     if (res.status === "error" || res.data.error) {
      //       Swal.fire({
      //         title: "Error",
      //         html: res.statusText,
      //         icon: "error",
      //       });
      //       return;
      //     }
      //     Swal.fire({
      //       title: "Success!",
      //       html: `Created User ${userInfo.last_name} ${userInfo.first_name} with Group ID:[ <b style="color:blue">${actualID} </b>] .${res.statusText}`,
      //       icon: "success",
      //       confirmButtonText: "Okay",
      //     });
      //   });
      //   navigate("/users");
    }
  };
  return (
    <>
      <Form style={{ backgroundColor: "gray;" }}>
        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--col-lg-2 cds--col-md-2"></div>
            <div className="cds--col">
              <div className="cds--row">
                <div className="cds--col">
                  <TextInput
                    className="input-block"
                    id="first_name"
                    placeholder="Input First Name"
                    required
                    labelText="First Name"
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, first_name: e.target.value });
                    }}
                  />
                  <TextInput
                    className="input-block"
                    id="last_name"
                    placeholder="Input Last Name"
                    labelText="Last Name"
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, last_name: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="cds--row">
                <div className="cds--col">
                  <TextInput
                    className="spacing-05"
                    type="email"
                    id="email_addr"
                    autocomplete="off"
                    placeholder="Input Email Address"
                    labelText="Input Email Address"
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, email: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="cds--row">
                <div className="cds--col">
                  <TextInput
                    className="input-block"
                    type="password"
                    id="password_info"
                    placeholder="Input Password"
                    required
                    autocomplete="off"
                    labelText="Input Password"
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, password: e.target.value });
                    }}
                  />
                </div>
                <div className="cds--col">
                  <TextInput
                    className="input-block"
                    type="password"
                    id="confirm_password"
                    placeholder="Confirm Password"
                    required
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
                <div className="cds--col">
                  <Select
                    id="group_name"
                    defaultValue="placeholder-item"
                    labelText="Group Name"
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, group_name: e.target.value });
                    }}
                  >
                    <SelectItem
                      disabled
                      hidden
                      value="placeholder-item"
                      text="Choose Group Name"
                    />
                    {roleSelectComponents}
                  </Select>
                </div>
              </div>
              <br />
              <div className="cds--row">
                <div className="cds--col">
                  <Button
                    className="block"
                    kind="secondary"
                    onClick={() => {
                      navigate("/users");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="block"
                    kind="primary"
                    onClick={() => {
                      addUser();
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
            <div className="cds--col-lg-2 cds--col-md-2"></div>
          </div>
        </div>
      </Form>
    </>
  );
};
const FormArea = () => {
  return <div>Some Data</div>;
};

export default NewUserForm;
