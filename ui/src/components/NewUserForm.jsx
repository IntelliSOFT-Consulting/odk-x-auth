import TextInput from "@carbon/react/lib/components/TextInput";
import { Button, Form, Select, SelectItem } from "carbon-components-react";
import React from "react";

const NewUserForm = () => {
  return (
    <div>
      <Form>
        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
              <p>First Name</p>
              <TextInput
                className="spacing-05"
                id="first_name"
                placeholder="Input First Name"
                required
              />
            </div>
            <div className="cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
              <p>Last Name</p>
              <TextInput
                className="spacing-05"
                id="last_name"
                placeholder="Input Last Name"
              />
            </div>
          </div>
          <div className="cds--row">
            <div className="cds--col-lg-16">
              <p>Email</p>
              <TextInput
                className="spacing-05"
                type="email"
                id="email"
                placeholder="Input Email Address"
              />
            </div>
          </div>
          <div className="cds--row">
            <div className="cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
              <p>Password</p>
              <TextInput
                className="spacing-05"
                type="password"
                id="password"
                placeholder="Input Password"
                required
              />
            </div>
            <div className="cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
              <p>Confirm Password</p>
              <TextInput
                className="spacing-05"
                type="password"
                id="confirm_password"
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>
          <div className="cds--row">
            <div className="cds--col-lg-8 cds--col-md-4 cds--col-sm-2"></div>
            <div className="cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
              <Select
                id="gid_number"
                defaultValue="placeholder-item"
                labelText=""
              >
                <SelectItem
                  disabled
                  hidden
                  value="placeholder-item"
                  text="Choose Group"
                />
                <SelectItem value="Group 1" text="Group 1" />
                <SelectItem value="Group 2" text="Group 2" />
              </Select>
            </div>
          </div>
          <br/>
          <div className="cds--row">
            <div className="cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
              <Button style={{ width: "100%" }} kind="secondary">
                Cancel
              </Button>
            </div>
            <div className="cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
              <Button
                style={{ width: "100%" }}
                onClick={() => {
                  window.location.href = "#";
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default NewUserForm;
