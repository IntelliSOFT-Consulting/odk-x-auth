import React from "react";

import {
  FormLabel,
  
  FormGroup,
  TextInput,
  Button,
} from "carbon-components-react";

const LoginForm = () => {
  return (
    <>
      <h4>Login to ODX-K Admin</h4>

      <FormGroup>
        <FormLabel>Login</FormLabel>

        <TextInput
          id="username"
          labelText="User Name"
          placeholder="Input User Name"
        />
        <TextInput
          type="password"
          required
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
        />

        <Button kind="secondary">Cancel</Button>

        <Button onClick={()=>{window.location.href = "/dashboard/"}}>Log In </Button>
      </FormGroup>
    </>
  );
};

export default LoginForm;
