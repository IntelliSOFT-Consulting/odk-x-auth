import React from 'react'
import AppHeader from '../components/AppHeader'
import AssignUserToGroupForm from '../components/AssignUserToGroupForm'

const AssignUserToGroup = () => {
  return (
    <AppHeader children ={<AssignUserToGroupForm/>} pageHeading="Assign User to Group" breadCrumbPath="Groups / Assign User to Group"/>
  )
}

export default AssignUserToGroup
