import React from 'react'
import DashBoardTiles from "../components/DashBoardTiles"
import AppHeader from "../components/AppHeader"
const Dashboard = () => {
  return (
    <>
      <AppHeader children={<DashBoardTiles/>} pageHeading="Dashboard"/>
    </>
  )
}

export default Dashboard
