import React from 'react'
import { LDAPApi } from '../api/auth';
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
        key: 'number_of_groups',
        header: 'Number of Groups',
      },
      {
        key: 'header',
        header: 'Header',
      }
  ];
  const rows = [
    {
      id: '9593d593',
      group_name: 'Administrators',
      role:"Admin",
      created_by: 'Admin 1',
      date_created: '2017-01-01',
      number_of_groups: 3,
      header: 'Content'
    },

  ];
  const users =<DynamicDataGrid headers={headers} rows={rows} title="Groups" description="This table contains a list of created Groups"/> 
const Groups = () => {
  return (
    <AppHeader children={users} pageHeading="Groups"/>
  )
}

export default Groups
