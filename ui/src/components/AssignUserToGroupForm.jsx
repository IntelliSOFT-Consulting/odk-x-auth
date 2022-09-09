import TextInput from "@carbon/react/lib/components/TextInput";
import { Button, Form, Select, SelectItem } from "carbon-components-react";
import React from "react";

const AssignUserToGroupForm = () => {
  return (
    <div className="LoginFormComponent">
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-16">
            <p>User ID</p>
            <Form style={{ minWidth: "500px" }}>
              <TextInput
                className="spacing-05"
                id="user_id"
                placeholder="Input User ID"
              />
              <div className="inline-component">
                <p>Group ID</p>
                <TextInput
                  className="spacing-05"
                  placeholder="Input Group ID"
                  required
                />

                <Select
                  id="select-1"
                  defaultValue="placeholder-item"
                  labelText="Role"
                >
                  <SelectItem
                    disabled
                    hidden
                    value="placeholder-item"
                    text="Select a role"
                  />
                  <SelectItem value="Admin" text="Admin" />
                  <SelectItem value="User" text="User" />
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

export default AssignUserToGroupForm;
