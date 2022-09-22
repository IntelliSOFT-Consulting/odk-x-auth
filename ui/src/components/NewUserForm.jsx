import TextInput from "@carbon/react/lib/components/TextInput";
import { Button, Form, Select, SelectItem } from "carbon-components-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../api/cookie";
import Swal from "sweetalert2";
import base from "../api/airtable";

const NewUserForm = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const cookieRoles = JSON.parse(getCookie("odk-roles"));

  const roleSelectComponents = cookieRoles.map((row) => (
    <SelectItem value={row.role_name} text={row.role_name} />
  ));
  const addUser = () => {
    console.log(userInfo);
    let requiredFields = [
      "first_name",
      "email",
      "last_name",
      "password",
      "role",
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
      base("Users").create(
        [
          {
            fields: {
              user_name: userInfo.email,
              last_name: userInfo.last_name,
              password: userInfo.password,
              first_name: userInfo.first_name,
              email: userInfo.email,
              role: userInfo.role,
            },
          },
        ],
        function (err, records) {
          if (err) {
            console.error(err);
            Swal.fire({
              title: `Error!:${err.error}`,
              html: `${err.message}`,
              icon: "error",
              confirmButtonText: "Okay",
            });
            return;
          }
          records.forEach(function (record) {
            console.log(record.getId());
            Swal.fire({
              title: "Success!",
              html: `Created User ${
                userInfo.email
              } with ID:[ <b style="color:blue">${record.getId()}</b>] .`,
              icon: "success",
              confirmButtonText: "Okay",
            });
            refreshUserList();
          });
        }
      );
    }
    const refreshUserList = () => {
      base("Users")
        .select({
          view: "Grid view",
        })
        .eachPage((records, fetchNextPage) => {
          console.log(`${records.length} Users`);
          // let users = records.map((row) => row._rawJson.fields);
          // setCookie("odk-users", users, 1);
          navigate("/");
        });
    };
  };
  return (
    <>
      <Form style={{ "backgroundColor": "gray;" }}>
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
                    id="email"
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
                    id="password"
                    placeholder="Input Password"
                    required
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
                      setUserInfo({ ...userInfo, confirm_password: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="cds--row">
                <div className="cds--col">
                  <Select
                    id="role_name"
                    defaultValue="placeholder-item"
                    labelText="Group Name"
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, role: e.target.value });
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
              <br/>
              <div className="cds--row">
                <div className="cds--col">
                  <Button className="block" kind="secondary" onClick={() => {
                    navigate("/users");
                  }}>
                    Cancel
                  </Button>
                  <Button className="block" kind="primary" onClick={() => {
                    addUser();
                  }}>
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
  return (
    <div>Some Data</div>
  );
};



export default NewUserForm;
