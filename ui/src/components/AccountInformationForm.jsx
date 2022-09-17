import TextInput from '@carbon/react/lib/components/TextInput';
import { Button, Form, Select, SelectItem } from 'carbon-components-react';
import React from 'react'

const AccountInformationForm = () => {
  return (
    <div className="LoginFormComponent">
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-16">
            
            <Form style={{ minWidth: "500px" }}>
            <p>User Name</p>
              <TextInput
                className="spacing-05"
                id="user_name"
                placeholder="Input User Name"
              />
              <p>User ID</p>
              <TextInput
                className="spacing-05"
                id="user_id"
                placeholder="Input User ID"
                required
              />
              <div className="inline-component">
                <p>Groups</p>

                <Select
                  id="select-1"
                  defaultValue="placeholder-item"
                  labelText="Your Groups"
                >
                  <SelectItem
                    disabled
                    hidden
                    value="placeholder-item"
                    text="Select a user group"
                  />
                  <SelectItem value="Group 1" text="Admin" />
                  <SelectItem value="Group 2" text="User" />
                </Select>
              </div>

              <div className="cds--row">
                <Button kind="secondary" className="block">Cancel</Button>
                <Button
                className="block"
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
  )
}

export default AccountInformationForm