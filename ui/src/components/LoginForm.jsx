import React from "react";

import { Form, TextInput, Button } from "carbon-components-react";

const LoginForm = () => {
  return (
    <>
      <h1 className="LoginHeading">Login to ODK-X Admin</h1>
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-16">
            <p>UserName</p>
            <Form style={{ minWidth: "500px" }}>
              <TextInput
                className="spacing-05"
                id="username"
                placeholder="Input User Name"
              />
              <p>Password</p>
              <TextInput
                className="spacing-05"
                type="password"
                placeholder="Input Password"
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              />
              <div className="LoginButtons">
                <Button kind="secondary">Cancel</Button>
                <Button
                  onClick={() => {
                    window.location.href = "/dashboard/";
                  }}
                >
                  Log In
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
