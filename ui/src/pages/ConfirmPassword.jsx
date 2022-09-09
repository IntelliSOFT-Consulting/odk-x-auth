import React from 'react'
import AppHeader from '../components/AppHeader'
import ConfirmPasswordForm from '../components/ConfirmPasswordForm'

const ConfirmPassword = () => {
  return (
    <AppHeader children={<ConfirmPasswordForm/>} pageHeading="Confirm Password" />
  )
}

export default ConfirmPassword
