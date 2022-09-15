import React from "react";
import DataGrid from "../components/DataGrid";
import AppHeader from "../components/AppHeader";
import { LDAPApi } from "../api/auth";
import DynamicDataGrid from "../components/DynamicDataGrid";
import { getCookie } from "../api/cookie";

// let allUsers = await LDAPApi({ url: `/api/users`, method: 'GET' })

const headers = [
  {
    key: "user_name",
    header: "User Name",
  },
  {
    key: "role",
    header: "Role",
  },
  {
    key: "created_by",
    header: "Created By",
  },
  {
    key: "date_created",
    header: "Date Created",
  },
  {
    key: "number_of_groups",
    header: "Number of Groups",
  },
  {
    key: "header",
    header: "Header",
  },
];
const rows = [
  {
    id: "9593593",
    user_name: "pgreg",
    role: "Admin",
    created_by: "Admin 1",
    date_created: "2017-01-01",
    number_of_groups: 3,
    header: "Content",
  },
];

const Users = () => {
 const cookieUsers = JSON.parse(getCookie("odk-users")) 
 console.log("The Cookie Users: ",cookieUsers)  
  const userList =[];
  cookieUsers.forEach(user =>{
    let row =  {
      id: user.id || user.user_name,
      user_name: user.user_name,
      role: user.role,
      created_by: user.created_by.name,
      date_created: user.created_time,
      number_of_groups: !user.group_name ? 0: user.group_name.length,
      header: "Content",
    }
    userList.push(row)
  })
  console.log(userList)
  
  let userComponent = <DynamicDataGrid headers={headers} rows={userList} title="Users"  description="This table contains a list of created Users"/>;
  return <AppHeader children={userComponent} pageHeading="Users" />;
};

export default Users;
