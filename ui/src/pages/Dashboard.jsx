import React from 'react'
import DashBoardTiles from "../components/DashBoardTiles"
import AppHeader from "../components/AppHeader"
const Dashboard = () => {
  return (
    <>
      <AppHeader children={<DashBoardTiles/>}/>
    </>
  )
}

export default Dashboard
