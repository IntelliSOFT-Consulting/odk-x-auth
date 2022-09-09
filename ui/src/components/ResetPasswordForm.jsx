import TextInput from '@carbon/react/lib/components/TextInput';
import { Button, Form } from 'carbon-components-react';
import React from 'react'

const ResetPasswordForm = () => {
  return (
    <div className="LoginFormComponent">
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-16">
            
            <Form style={{ minWidth: "500px" }}>
            <p>User Name</p>
              <TextInput

                type ="email"
                id="email_address"
                placeholder="Input Email Address"
              />
              

              <div className="inline_component">
                <Button kind="secondary">Cancel</Button>
                <Button
                  onClick={() => {
                    window.location.href = "#";
                  }}
                >
                  Request Link
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordForm