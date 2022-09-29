import React, { useEffect, useState, createContext } from "react";
import DashBoardTiles from "../components/DashBoardTiles";
import AppHeader from "../components/AppHeader";
import base from "../api/airtable";
import Swal from "sweetalert2";
import { useContext } from "react";
import ApplicationContext from "../ApplicationContext";
import { LDAPApi } from "../api/auth";

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
