import TextInput from "@carbon/react/lib/components/TextInput";
import { Button, Form } from "carbon-components-react";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../api/cookie";

const ResetPasswordForm = () => {
  const navigate = useNavigate();

  const [userInfo,setUserInfo] = useState({});

  const sendLink =()=> {

  }
  return (
    <>
    <div className="cds--grid">
        <div className="cds--row">
        <div class="cds--col-lg-4 col--md-4 col--sm-0"></div>

          <div className="cds--col-lg-8 col--md-8 col--sm-4">
            <Form>
              <div className="cds--row">
                <div className="cds--col-lg-16">
                  <TextInput
                    type="email"
                    id="email_address"
                    placeholder="Enter the email linked to your account"
                    labelText="Email Address"
                    onChange={(e) => {
                      setUserInfo({
                        ...userInfo,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="cds--row">
                <div className="cds--col-lg-16">
                  <Button kind="secondary" className="block" onClick={()=>{navigate("/")}}>
                    Cancel
                  </Button>
                  <Button
                    className="block"
                    onClick={() => {
                      sendLink();
                    }}
                  >
                    Request Link
                  </Button>
                </div>
              </div>
            </Form>
          </div>
          <div class="cds--col-lg-4 col--sm-2"></div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;
