import React from 'react'
import AppHeader from '../components/AppHeader'
import ConfirmPasswordForm from '../components/ConfirmPasswordForm'
import SelfService from '../components/SelfService'

const ConfirmPassword = () => {
  return (
    <SelfService children={<ConfirmPasswordForm/>} pageHeading="Confirm Password" />
  )
}

export default ConfirmPassword
