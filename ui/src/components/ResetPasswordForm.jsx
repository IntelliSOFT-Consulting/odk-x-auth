import TextInput from "@carbon/react/lib/components/TextInput";
import { Button, Form } from "carbon-components-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../api/cookie";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  return (
    <div className="LoginFormComponent">
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-16">
            <Form>
              <p>User Name</p>
              <TextInput
                type="email"
                id="email_address"
                placeholder="Input Email Address"
                defaultValue={getCookie("login_id")}
              />

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
                <Button className="block" onClick={() => {alert("Link sent to email.")}}>
                  Request Link
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
