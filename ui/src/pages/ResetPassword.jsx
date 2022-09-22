import React from 'react'
import SelfService from '../components/SelfService'
import ResetPasswordForm from '../components/ResetPasswordForm'

const ResetPassword = () => {
  return (
    <SelfService children={<ResetPasswordForm/>} pageHeading="Reset Password"/>
  )
}

export default ResetPassword
