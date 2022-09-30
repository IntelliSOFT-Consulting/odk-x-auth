import React from 'react'
import SelfService from '../components/SelfService'
import ResetPasswordForm from '../components/ResetPasswordForm'
import ResetPasswordEmailTemplate from '../components/ResetPasswordEmailTemplate'

const ResetPassword = () => {
  
  return (
    <SelfService children={<ResetPasswordForm />} pageTitle="Reset Password"/>
  )
  //   <SelfService children={<ResetPasswordEmailTemplate
  //     userName=""
  //     fullName=""
  //     subject="Password Reset"
  //     confirmationUrl="https://odkxauth.intellisoftkenya.com/"
  //   />} pageHeading="Reset Password"/>
  // )
}

export default ResetPassword;
