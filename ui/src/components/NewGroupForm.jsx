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
import ApplicationContext from "../ApplicationContext";
import { useContext } from "react";

const NewGroupForm = () => {
  const { groups } = useContext(ApplicationContext);
  const allGroups = groups; //JSON.parse(getCookie("odk-roles"));
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const updateSelected = (value, action) => {
    setSelected(selected.filter((item) => item !== value));
    if (action === true) {
      setSelected([...selected, value]);
    }
  };

  const saveData = () => {
    setUserInfo({
      ...userInfo,
      roles: selected,
    });
    console.log(userInfo);

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
                userInfo.group_name
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
      <Form className="loginForm">
        <div className="cds--grid">
          <div className="cds--col-lg-2 cds--col-md-2"></div>
          <div className="cds--col-lg-8">
            <div className="cds--row">
              <div className="cds--col-lg-16">
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
              </div>
            </div>

            <div className="cds--row">
              <div className="cds--col-lg-16">
                <Button kind="secondary" className="block">
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
