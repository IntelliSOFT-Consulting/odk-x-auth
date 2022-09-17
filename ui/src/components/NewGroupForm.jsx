import {
  Button,
  Checkbox,
  ExpandableTile,
  Form,
  TextInput,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from "@carbon/react";
import { Select, SelectItem } from "carbon-components-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { getCookie, setCookie } from "../api/cookie";
import Swal from "sweetalert2";
import base from "../api/airtable";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "carbon-components-react";

const NewGroupForm = () => {
  const cookieRoles = JSON.parse(getCookie("odk-roles"));
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const updateSelected = (value, action) => {
    setSelected(selected.filter((item) => item !== value));
    if (action === true) {
      setSelected([...selected, value]);
    }
  };

  const roleSelectComponents = cookieRoles.map((row, idx) => (
    <Checkbox
      labelText={row.role_name}
      id={row.role_name}
      onChange={(e) => {
        updateSelected(e.target.id, e.target.checked);
       

      }}
    />
  ));

  const saveData = () => {
    setUserInfo({
      ...userInfo,
      roles: selected,
    });
    console.log(userInfo);
    if (selected.length < 1) {
      Swal.fire({
        title: "Error. Missing data!",
        html: `Missing MANDATORY fields :[ <b style="color:red">Roles</b>] .`,
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }
    let requiredFields = ["group_name"];
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
      base("Groups").create(
        [
          {
            fields: {
              group_name: userInfo.group_name,
              roles: selected,
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
              html: `Created Group ${
                userInfo.email
              } with ID:[ <b style="color:blue">${record.getId()}</b>] .`,
              icon: "success",
              confirmButtonText: "Okay",
            });
            refreshGroupList();
          });
        }
      );
    }
  };
  const refreshGroupList = () => {
    base("Groups")
      .select({
        view: "Grid view",
      })
      .eachPage((records, fetchNextPage) => {
        console.log(`${records.length} Users`);
        let groups = records.map((row) => row._rawJson.fields);
        setCookie("odk-groups", groups, 1);
        navigate("/");
      });
  };

  return (
    <>
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-16">
            <Form className="loginForm">
              <p>Group Name</p>
              <TextInput
                id="group_name"
                placeholder="Input Group Name"
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    group_name: e.target.value,
                  });
                }}
              />
              <br />

              <p>Role</p>
              <em style={{ color: "green" }}>
                Roles Selected: [{selected.join(",")}]
              </em>
              <ExpandableTile
                tabIndex={0}
                tileCollapsedIconText="Interact to Expand tile"
                tileExpandedIconText="Interact to Collapse tile"
                tileMaxHeight={0}
                tilePadding={0}
              >
                <TileAboveTheFoldContent>
                  <div style={{ height: "32px" }}>Select Role</div>
                </TileAboveTheFoldContent>
                <TileBelowTheFoldContent>
                  {roleSelectComponents}
                </TileBelowTheFoldContent>
              </ExpandableTile>

              <br />
              <div className="LoginButtons">
                <Button kind="secondary" style={{ width: "100%" }}>
                  Cancel
                </Button>
                <Button
                  style={{ width: "100%" }}
                  onClick={() => {
                    saveData();
                  }}
                >
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewGroupForm;
