import React from 'react'
import AccountInformationForm from '../components/AccountInformationForm'
import AppHeader from '../components/AppHeader'

const AccountInformation = () => {
  return (
    <AppHeader children={<AccountInformationForm/>} pageHeading="Account Information" breadCrumbPath="Account Information / My Account"/>
  )
}

export default AccountInformation
