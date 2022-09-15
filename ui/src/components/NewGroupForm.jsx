import { Button, FilterableMultiSelect, Form, TextInput } from "@carbon/react";
import { Select, SelectItem } from "carbon-components-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { getCookie, setCookie } from "../api/cookie";
import Swal from "sweetalert2";
import base from "../api/airtable";
import { useNavigate } from "react-router-dom";


const NewGroupForm = () => {
  const cookieRoles = JSON.parse(getCookie("odk-roles"));
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const roleSelectComponents = cookieRoles.map((row) => (
    <SelectItem value={row.role_name} text={row.role_name} />
  ));

  const saveData =()=>{
    console.log(userInfo);
    let requiredFields = [
      "group_name",
      "group_id",
      "role",
    ];
    let filledInFields = Object.keys(userInfo);
    let missingFields =
      requiredFields.filter((key) => !filledInFields.includes(key)) || [];

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
        base("Groups").create(
          [
            {
              fields: {
                group_id: userInfo.group_id,
                group_name: userInfo.group_name,
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
                html: `Created Group ${userInfo.email} with ID:[ <b style="color:blue">${record.getId()}</b>] .`,
                icon: "success",
                confirmButtonText: "Okay",
              });
              refreshUserList()
            });
          }
        );
      }
  
    }
    const refreshUserList =()=>{
      base("Groups")
          .select({
            view: "Grid view",
          })
          .eachPage((records, fetchNextPage) => {
            console.log(`${records.length} Users`);
            let groups = records.map((row) => row._rawJson.fields);
            setCookie("odk-groups",groups,1);
            navigate("/");
          });
    }
  
  return (
    <div>
      <p>Group Name</p>
      <Form>
        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
              <TextInput
                className="spacing-05"
                id="group_name"
                placeholder="Input Group Name"
                onChange={(e) => {
                  setUserInfo({ ...userInfo, group_name: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="cds--row">
            <div className="cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
              <p>Group ID</p>
              <TextInput
                className="spacing-05"
                id="group_id"
                placeholder="Input Group ID"
                required
                onChange={(e) => {
                  setUserInfo({ ...userInfo, group_id: e.target.value });
                }}
              />
            </div>
            <div className="cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
            <Select
                id="role_name"
                defaultValue="placeholder-item"
                labelText=""
                onChange={(e) => {
                  setUserInfo({ ...userInfo, role: e.target.value });
                }}
              >
                <SelectItem
                  disabled
                  hidden
                  value="placeholder-item"
                  text="Choose Role"
                />
                {roleSelectComponents}
              </Select>
            </div>
          </div>
          <br />
          <div className="cds--row">
            <div className="cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
              <Button kind="secondary" style={{ width: "100%" }}>
                Cancel
              </Button>
            </div>
            <div className="cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
              <Button
                style={{ width: "100%" }}
                onClick={() => {
                  saveData();
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default NewGroupForm;
