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

import Swal from "sweetalert2";

import { useContext } from "react";
import ApplicationContext from "../ApplicationContext";
import { LDAPApi } from "../api/auth";


const AssignUserToGroupForm = () => {
  const {users, groups} = useContext(ApplicationContext);
  
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const usersList = [];
  let allGroups =[];
  users.forEach((u) => {
    usersList.push(u.user_name || u.id );
  });
  groups.forEach((groupObj)=>allGroups.push(groupObj.group_name))
  console.log("e===>"+JSON.stringify(users))
  
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
    let contextGroup = groups.filter(row => row.group_name === userInfo.group_name)

    let gidNumber = contextGroup!==undefined || contextGroup!==null ? contextGroup[0] || "" : ""

    if(!gidNumber){
      Swal.fire({
        title: "Error",
        html: "Sorry, Invalid GID Number",
        icon: "error",
      });
      return
    }
    let url ="/api/groups/"+gidNumber
    let body ={"user":userInfo.user_name}
    let method = "POST"
    let params = {url,body,method}
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
        html: `Assigned User  ${userInfo.user_name} to GID:[ <b style="color:blue">${gidNumber} </b>] .${res.statusText}`,
        icon: "success",
        confirmButtonText: "Okay",
      });
    })
    
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
