import { ComboBox } from "@carbon/react";
import TextInput from "@carbon/react/lib/components/TextInput";
import { Button, Form } from "carbon-components-react";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import ApplicationContext from "../ApplicationContext";
import * as qs from 'query-string';
import Swal from "sweetalert2";
import base from "../api/airtable";

const ConfirmPasswordForm = () => {
  const { users } = useContext(ApplicationContext);

  const args = qs.parse(window.location.search);
  const [userInfo, setUserInfo] = useState({});
  const handleCancel =()=>{
    console.log(args);
  };
  const changePassword = () => {
    const userRecord = users.filter(
      (user) => user.user_name === args.username_rp
    );
    const actualID = userRecord[0].uid;

    const payload = { ...userInfo, id: actualID };

    if (payload.password !== payload.confirm_password) {
      Swal.fire({
        title: "Password Mismatch",
        icon: "error",
        text: "Please check that your password matches",
      });
      return;
    }

    if (
      !payload.password ||
      !payload.confirm_password ||
      !payload.user_name ||
      !actualID
    ) {
      Swal.fire({
        title: "Missing Information",
        icon: "error",
        text: "Please check that you have provided all information",
      });
      return;
    }
    

    delete payload["username"]
    delete payload["confirm_password"]
    delete payload["id"]

    base('Users').update([
      {
        "id": actualID,
        "fields": payload
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
          title:"Password Change Successful",
          icon: "success",
          html:`Password changed for record for ${userInfo.user_name}`,
          confirmButtonText: "Okay",
        })

      });
    });
  };

  return (
    <>
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-lg-2 cds--col-md-2"></div>
          <div className="cds--col-lg-8">
            <Form>
              
              <div className="cds--row">
                <div className="cds--col-lg-16">
                  <TextInput
                    id="new_password"
                    type="password"
                    placeholder="Input New Password"
                    labelText="Password"
                    onChange={(e) => {
                      setUserInfo({
                        ...userInfo,
                        password: e.target.value,
                      });
                    }}
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
                <div className="cds--col-lg-16">
                  <Button kind="secondary" className="block" onClick={()=>{handleCancel()}}>
                    Cancel
                  </Button>
                  <Button
                    className="block"
                    onClick={() => {
                      changePassword();
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Form>
          </div>
          <div className="cds--col-lg-2 cds--col-md-2"></div>
        </div>
      </div>
    </>
  );
};

export default ConfirmPasswordForm;
