import TextInput from "@carbon/react/lib/components/TextInput";
import { Button, Form, Select, SelectItem } from "carbon-components-react";
import React from "react";

const NewUserForm = () => {
  return (
    <div className="LoginFormComponent">
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-16">
            <p>Group Name</p>
            <Form style={{ minWidth: "500px" }}>
              <TextInput
                className="spacing-05"
                id="group_name"
                placeholder="Input Group Name"
              />
              <div className="inline-component">
                <p>First Name</p>
                <TextInput
                  className="spacing-05"
                  id="first_name"
                  placeholder="Input First Name"
                  required
                />
                <p>Last Name</p>
                <TextInput
                  className="spacing-05"
                  id="last_name"
                  placeholder="Input Last Name"
                />
                <p>Email</p>
                <TextInput
                  className="spacing-05"
                  type="email"
                  id="email"
                  placeholder="Input Email Address"
                />
                <p>Common Name</p>
                <TextInput
                  className="spacing-05"
                  id="common_name"
                  placeholder="Input common Name"
                />
                <p>User ID</p>
                <TextInput
                  className="spacing-05"
                  id="user_id"
                  placeholder="Input User ID"
                />
                <hr />
                <p>Password</p>
                <TextInput
                  className="spacing-05"
                  type="password"
                  id="password"
                  placeholder="Input Password"
                  required
                />

                <p>Confirm Password</p>
                <TextInput
                  className="spacing-05"
                  type="password"
                  id="confirm_password"
                  placeholder="Confirm Password"
                  required
                />
                <hr />
                <p>UID Number</p>
                <TextInput
                  className="spacing-05"
                  id="uid_number"
                  placeholder="Input UID Number"
                />
                <p>GID Number</p>
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

export default NewUserForm;
