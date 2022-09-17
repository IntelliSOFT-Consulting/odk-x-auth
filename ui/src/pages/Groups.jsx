import React from 'react'
import { LDAPApi } from '../api/auth';
import { getCookie } from '../api/cookie';
import AppHeader from '../components/AppHeader';
import DataGrid from '../components/DataGrid';
import DynamicDataGrid from '../components/DynamicDataGrid';


// let allGroups = await LDAPApi({ url: `/api/groups`, method: 'GET' })

const headers = [
    {
      key: 'group_name',
      header: 'Group Name',
    },
    {
      key: 'role',
      header: 'Role',
    },
    {
        key: 'created_by',
        header: 'Created By',
      },
      {
        key: 'date_created',
        header: 'Date Created',
      },
      {
        key: 'number_of_users',
        header: 'Number of Users',
      },
  ];
  
const Groups = () => {
  const cookieGroups = JSON.parse(getCookie("odk-groups")) 
 console.log("The Cookie Users: ",cookieGroups)  
  const groupList =[];
  cookieGroups.forEach(group =>{
    let row =  {
      id: group.id || group.group_name,
      group_name: group.group_name,
      role:group.roles ? group.roles.join(", ") : "-" ,
      created_by: group.created_by.name,
      date_created: group.created_time,
      number_of_users: group.Users ? group.Users.length : 0
    }
    groupList.push(row)
  })
  console.log(groupList)

  let groupComponent = <DynamicDataGrid headers={headers} rows={groupList} title="Groups"  description="This table contains a list of created Groups"/>;
  return <AppHeader children={groupComponent} pageHeading="Groups" />;
  
}

export default Groups
