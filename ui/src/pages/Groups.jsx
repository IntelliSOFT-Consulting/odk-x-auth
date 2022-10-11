import React from "react";
import { useContext } from "react";
import { LDAPApi } from "../api/auth";
import { getCookie } from "../api/cookie";
import ApplicationContext from "../ApplicationContext";
import AppHeader from "../components/AppHeader";
import DataGrid from "../components/DataGrid";
import DynamicDataGrid from "../components/DynamicDataGrid";

// let allGroups = await LDAPApi({ url: `/api/groups`, method: 'GET' })

const headers = [
  {
    key: "id",
    header: "GID",
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
  // },
  {
    key: "users",
    header: "Number of Users",
  },
];

const Groups = () => {
  const { groups } = useContext(ApplicationContext);
  const cookieGroups = groups;
  console.log("The Cookie Groups: ", cookieGroups);
  const groupList = [];
  cookieGroups.forEach((group) => {
    let row = {
      id: group.uid,
      group_name: group.group_name,
      created_by: group.created_by.name || group.created_by,
      // date_created: group.created_time,
      users: group.users || 0,
    };
    groupList.push(row);
  });

  let groupComponent = (
    <DynamicDataGrid
      headers={headers}
      rows={groupList}
      title="Groups"
      description="This table contains a list of created Groups"
    />
  );
  return <AppHeader children={groupComponent} pageHeading="Groups" breadCrumbPath="Groups / Groups"/>;
};

export default Groups;
