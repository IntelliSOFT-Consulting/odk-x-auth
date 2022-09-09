import React from 'react'
import AppHeader from '../components/AppHeader'
import NewGroupForm from '../components/NewGroupForm'

const NewGroup = () => {
  return (
    <AppHeader children={<NewGroupForm/>} pageHeading="Add a new group" customClassName ="LoginFormComponent"/>
  )
}

export default NewGroup