import TextInput from "@carbon/react/lib/components/TextInput";
import { Button, Form } from "carbon-components-react";
import React from "react";

const ConfirmPasswordForm = () => {
  return (
    <div className="LoginFormComponent">
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-16">
            <Form style={{ minWidth: "500px" }}>
              <p>User Name</p>
              <TextInput id="new_password" placeholder="Input New Password" />
              <TextInput id="confirm_password" placeholder="Confirm New Password" />

              <div className="inline_component">
                <Button kind="secondary">Cancel</Button>
                <Button
                  onClick={() => {
                    window.location.href = "#";
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

export default ConfirmPasswordForm;
