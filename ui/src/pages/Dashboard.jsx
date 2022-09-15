import React, { useEffect, useState } from "react";
import DashBoardTiles from "../components/DashBoardTiles";
import AppHeader from "../components/AppHeader";
import base from "../api/airtable";
import { setCookie } from "../api/cookie";
const Dashboard = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  useEffect(() => {
    //Users
    base("Users")
      .select({
        view: "Grid view",
      })
      .eachPage((records, fetchNextPage) => {
        console.log(`${records.length} Users`);
        let users = records.map((row) => row._rawJson.fields);
        setAllUsers(users);
      });
      //Roles 
      base("Roles")
      .select({
        view: "Grid view",
      })
      .eachPage((records, fetchNextPage) => {
        console.log(`${records.length} Users`);
        let roles = records.map((row) => row._rawJson.fields);
        setAllRoles(roles);
      });
      //Get Groups as well
    base("Groups")
      .select({
        view: "Grid view",
      })
      .eachPage((records, fetchNextPage) => {
        console.log(`${records.length} Groups`);
        setAllGroups(records.map((row) => row._rawJson.fields));
        
      });
  }, []);
  
  return (
    <>
      <AppHeader
        children={<DashBoardTiles users={allUsers} groups={allGroups} roles={allRoles} />}
        pageHeading="Dashboard"
      />
    </>
  );
};

export default Dashboard;
