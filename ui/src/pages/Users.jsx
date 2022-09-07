import React from 'react'
import DataGrid from "../components/DataGrid"
import AppHeader from "../components/AppHeader"

const headers = [
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'status',
      header: 'Status',
    },
  ];
  const rows = [
    {
      id: 'a',
      name: 'Load balancer 1',
      status: 'Disabled',
    },
    {
      id: 'b',
      name: 'Load balancer 2',
      status: 'Starting',
    },
    {
      id: 'c',
      name: 'Load balancer 3',
      status: 'Active',
    },
  ];
  const users =<DataGrid headers={headers} rows={rows}/> 
const Users = () => {
return (
    
    <AppHeader children={users}/>
    
  )
}

export default Users