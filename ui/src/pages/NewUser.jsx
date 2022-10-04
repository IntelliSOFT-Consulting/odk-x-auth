import React from "react";

import AppHeader from "../components/AppHeader";
import NewUserForm from "../components/NewUserForm";

const NewUser = () => {

  return (
    <AppHeader children={<NewUserForm />} pageHeading="New User Account" breadCrumbPath="Users / Create New User"/>
  );
};

export default NewUser;
