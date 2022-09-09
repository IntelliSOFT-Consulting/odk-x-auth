import { Button, Form, TextInput } from "@carbon/react";
import { Select, SelectItem } from "carbon-components-react";
import React from "react";

const NewGroupForm = () => {
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
              <p>Group ID</p>
              <TextInput
                className="spacing-05"
                id="group_id"
                placeholder="Input Group ID"
                required
              />

                <Select
                  id="select-1"
                  defaultValue="placeholder-item"
                  labelText=""
                 
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

export default NewGroupForm;
