import TextInput from '@carbon/react/lib/components/TextInput';
import { Button, Form, Select, SelectItem } from 'carbon-components-react';
import React, { useContext } from 'react'
import ApplicationContext from '../ApplicationContext';

const AccountInformationForm = () => {

  const {users, groups} = useContext(ApplicationContext);

  const groupList = groups.map(row=><SelectItem value={row.group_name} text={row.group_name} />)
  return (
    <div className="LoginFormComponent">
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-16" style={{"backgroundColor": "lightgray"}}>
            
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
                 {groupList}
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