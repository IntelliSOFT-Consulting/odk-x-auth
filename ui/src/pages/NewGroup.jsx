import React from 'react'
import AppHeader from '../components/AppHeader'
import NewGroupForm from '../components/NewGroupForm'

const NewGroup = () => {
  return (
    <AppHeader children={<NewGroupForm className="narrowForm"/>} pageHeading="Add a new group" breadCrumbPath="Groups / Create New Group" />
  )
}

export default NewGroup