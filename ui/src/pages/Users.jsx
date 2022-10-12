import React, { useContext, useEffect } from "react";
import DataGrid from "../components/DataGrid";
import AppHeader from "../components/AppHeader";
import { LDAPApi } from "../api/auth";
import DynamicDataGrid from "../components/DynamicDataGrid";
import { getCookie } from "../api/cookie";
import ApplicationContext from "../ApplicationContext";

// let allUsers = await LDAPApi({ url: `/api/users`, method: 'GET' })

const headers = [
  {
    key: "id",
    header: "UID",
  },
  {
    key: "user_name",
    header: "User Name",
  },
  {
    key: "group_name",
    header: "Group Name",
  },
  {
    key: "created_by",
    header: "Created By",
  },
  // {
  //   key: "date_created",
  //   header: "Date Created",
  // }
];

const Users = () => {
  
  const { users, fetchUsers } = useContext(ApplicationContext);

  // fetchUsers();
  const storedUsers = users; //JSON.parse(getCookie("odk-users"))
  console.log("The Cookie Users From Cookies: ", storedUsers);
  const userList = [];
  storedUsers.forEach((user) => {
    let row = {
      id: user.uid || "-",
      user_name: user.user_name,
      group_name: user.group_name || "",
      created_by: "",
      // date_created: user.created_time,
    };
    userList.push(row);
  });
  console.log(userList);

  let userComponent = (
    <DynamicDataGrid
      headers={headers}
      rows={userList}
      title="Users"
      description="This table contains a list of created Users"
    />
  );
  return (
    <AppHeader
      children={userComponent}
      pageHeading="Users"
      breadCrumbPath="Users / User List"
    />
  );
};

export default Users;
