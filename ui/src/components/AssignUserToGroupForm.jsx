import TextInput from "@carbon/react/lib/components/TextInput";
import { Button, Form, Select, SelectItem } from "carbon-components-react";
import React from "react";

const AssignUserToGroupForm = () => {
  return (
    <div>
      <p>User ID</p>
      <Form>
        <div className="cds--grid">
          <div className="cds--row">
            <div class="cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
              <TextInput
                className="spacing-05"
                id="user_id"
                placeholder="Input User ID"
              />
            </div>
          </div>
          <div className="cds--row">
            <div class="cds--col-lg-8 cds--col-md-4 cds--col-sm-2 inline-component">
              <p>Group ID</p>
              <TextInput
                className="spacing-05"
                placeholder="Input Group ID"
                required
              />
            </div>
            <div class="cds--col-lg-8 cds--col-md-4 cds--col-sm-2 inline-component">
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
          </div>
          <br/>
          <div className="cds--row">
            <div class="cds--col-lg-8 cds--col-md-4 cds--col-sm-2 inline-component">
              <Button kind="secondary">Cancel</Button>
            </div>
            <div class="cds--col-lg-8 cds--col-md-4 cds--col-sm-2 inline-component">
              <Button
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
      <div class="cds--col-lg-4"></div>
    </div>
  );
};

export default AssignUserToGroupForm;
