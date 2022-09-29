import React, { useEffect, useState, createContext } from "react";
import DashBoardTiles from "../components/DashBoardTiles";
import AppHeader from "../components/AppHeader";
import { useContext } from "react";
import ApplicationContext from "../ApplicationContext";

const Dashboard = () => {
  const { users, groups } = useContext(ApplicationContext);
 
  return (
    <>
      <AppHeader
        children={<DashBoardTiles users={users} groups={groups}  />}
        pageHeading="Dashboard"
      />
    </>
  );
};

export default Dashboard;
