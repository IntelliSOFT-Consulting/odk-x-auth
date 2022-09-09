import React from 'react'
import DataGrid from "../components/DataGrid"
import AppHeader from "../components/AppHeader"

const headers = [
    {
      key: 'user_name',
      header: 'User Name',
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
      id: '9593593',
      user_name: 'pgreg',
      role:"Admin",
      created_by: 'Admin 1',
      date_created: '2017-01-01',
      number_of_groups: 3,
      header: 'Content'
    },

  ];
  const users =<DataGrid headers={headers} rows={rows} title="Users"/> 
const Users = () => {
return (
    
    <AppHeader children={users} pageHeading="Users"/>
    
  )
}

export default Users