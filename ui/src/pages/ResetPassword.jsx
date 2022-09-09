import React from 'react'
import AppHeader from '../components/AppHeader'
import ResetPasswordForm from '../components/ResetPasswordForm'

const ResetPassword = () => {
  return (
    <AppHeader children={<ResetPasswordForm/>} pageHeading="Reset Password"/>
  )
}

export default ResetPassword
