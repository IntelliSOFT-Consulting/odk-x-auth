import {
  Checkbox,
  ComboBox,
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from "@carbon/react";
import TextInput from "@carbon/react/lib/components/TextInput";
import { Button, Form, Select, SelectItem } from "carbon-components-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../api/cookie";
import Swal from "sweetalert2";
import base from "../api/airtable";
import { useContext } from "react";
import ApplicationContext from "../ApplicationContext";


const AssignUserToGroupForm = () => {
  const {users, groups} = useContext(ApplicationContext);
  const cookieGroups = groups;
  const cookieUsers = users;
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const usersList = [];
  let allGroups =[];
  cookieUsers.forEach((u) => {
    usersList.push(u.user_name || u.id );
  });

  cookieGroups.forEach((groupObj)=>allGroups.push(groupObj.group_name))
  console.log("e===>"+JSON.stringify(cookieUsers))
  
  const adduserToGroup = () => {
    if (!userInfo.user_name || !userInfo.group_name) {
        Swal.fire({
          title: `Error!`,
          html: `Please Provide both Username and Group`,
          icon: "error",
          confirmButtonText: "Okay",
        })
      return;
    }
    let contextGroup = cookieGroups.filter(row => row.group_name === userInfo.group_name)
    let contextUser = cookieUsers.filter(row => row.user_name === userInfo.user_name)
    
    
    const actualID = contextUser[0].uid;
    const group_name = userInfo.group_name
    console.log(actualID, group_name);
    base('Users').update([
      {
        "id": actualID,
        "fields": {group_name}
      }
      
    ], function(err, records) {
      if (err) {
        Swal.fire({
          title:`Error!:${err.error}`,
          icon: "error",
          html:`${err.message}`,
          confirmButtonText: "Okay",
        })
        return;
      }
      records.forEach(function(record) {
        Swal.fire({
          title:"Assignment Successful",
          icon: "success",
          html:`Updated record for ${userInfo.user_name}`,
          confirmButtonText: "Okay",
        })

      });
    });
  }
  return (
    <>
    <p>{ }</p>
      <div className="cds--grid" >
        <div className="cds--row">
          <div className="cds--col-lg-2 cds--col-md-2"></div>
          <div className="cds--col-lg-8 formWrapper">
            <div className="cds--row">
              <div className="cds--col-lg-16">
                <ComboBox
                  ariaLabel="ComboBox"
                  id="user_id"
                  items={usersList}
                  label="Combo box menu options"
                  className="input-block"
                  titleText="Select A user"
                  onChange={(e) => {
                    setUserInfo({
                      ...userInfo,
                      user_name: e.selectedItem,
                    });
                  }}
                />
              </div>
            </div>
            <div className="cds--row">
              <div className="cds--col-lg-16">
                <ComboBox
                  ariaLabel="ComboBox"
                  id="group_name"
                  items={allGroups}
                  label="Select a Group"
                  className="input-block"
                  titleText="Select A Group"
                  onChange={(e) => {
                    setUserInfo({
                      ...userInfo,
                      group_name: e.selectedItem,
                    });
                  }}
                />
              </div>
            </div>
            <br />
            <div className="cds--row" style={{"margin": "auto;"}}>
              <div className="cds--col-lg-16" style={{"margin": "0 !important;"}}>
                <Button kind="secondary" className="block" onClick={() =>{navigate("/")}}>
                  Cancel
                </Button>
                <Button className="block" onClick={() => {adduserToGroup()}} >
                  Save
                </Button>
              </div>
            </div>
          </div>
          <div className="cds--col-lg-2 cds--col-md-2"></div>
        </div>
      </div>
    </>
  );
};

const TestForm = () => {};

export default AssignUserToGroupForm;
