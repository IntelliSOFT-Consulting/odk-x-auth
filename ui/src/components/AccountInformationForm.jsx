import TextInput from "@carbon/react/lib/components/TextInput";
import { Button, Form, Select, SelectItem } from "carbon-components-react";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getCookie } from "../api/cookie";
import ApplicationContext from "../ApplicationContext";
import Swal from "sweetalert2";
import { LDAPApi } from "../api/auth";

const AccountInformationForm = () => {
  const [uid, setUID] = useState("");

  const { users, groups } = useContext(ApplicationContext);
  const [userInfo, setUserInfo] = useState({})
  const navigate = useNavigate();
  useEffect(() => {
    let sessionUser = getCookie("username");
    let context = users.filter((user) => user.user_name === sessionUser);
    let userPayload = context ? context[0] : [];
    let userID = userPayload ? userPayload.uid || sessionUser : sessionUser
    setUID(userID);
   
  }, []);

  const groupList = groups.map((row) => (
    <SelectItem value={row.group_name} text={row.group_name} />
  ));
  const saveData =async() =>{
    console.log(JSON.stringify(userInfo))
    let groupContext = groups.filter(row => row.name===userInfo.group_name )
    let gid = groupContext !== undefined || groupContext!== null ? groupContext[0].uid : ""
    if(!gid || gid ===""){
      Swal.fire({
        title: "Error",
        html: `Sorry, we cannot validate GID ${gid}`,
        icon: "error",
      });
      return;
    }
    let url ="/api/groups/"+gid
    let method ="POST"
    let body ={"user":uid, "gidNumber":gid}

    let params ={url,method,body}


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
        html: `Updated User ${uid} with GID:[ <b style="color:blue">${gid} </b>] `,
        icon: "success",
        confirmButtonText: "Okay",
      });
      navigate("/")
    }

    // LDAPApi(params).then(res=>{
    //   console.log(res);
    //   if (res.status === "error" || res.data.error) {
    //     Swal.fire({
    //       title: "Error",
    //       html: res.statusText,
    //       icon: "error",
    //     });
    //     return;
    //   }
    //   Swal.fire({
    //     title: "Success!",
    //     html: `Updated User ${uid} with GID:[ <b style="color:blue">${gid} </b>] .${res.statusText}`,
    //     icon: "success",
    //     confirmButtonText: "Okay",
    //   });
    // })

  }
  return (
    <div className="LoginFormComponent">
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-16">
            <Form style={{ minWidth: "500px" }}>
              <p>User Name</p>
              <TextInput
                className="spacing-05"
                id="user_name"
                placeholder="Input User Name"
                disabled
                defaultValue={uid}
              />
              <p>User ID</p>
              <TextInput
                className="spacing-05"
                id="user_id"
                placeholder="Input User ID"
                required
                disabled
                defaultValue={uid}
              />
              {/* <div className="inline-component">
                <p>Groups</p>

                <Select
                  id="select-1"
                  defaultValue="placeholder-item"
                  labelText="Your Groups"
                  onChange={(e)=>{
                    setUserInfo(...userInfo, {group_name:e.selected});
                  }}
                >
                  <SelectItem
                    disabled
                    hidden
                    value="placeholder-item"
                    text="Select a user group"
                  />
                  {groupList}
                </Select>
              </div> */}

              <div className="cds--row">
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
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInformationForm;
