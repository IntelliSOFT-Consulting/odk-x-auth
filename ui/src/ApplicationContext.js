import React, { createContext, useState } from "react";
import { useEffect } from "react";
import base from "./api/airtable";
import {LDAPApi} from "./api/auth"
const ApplicationContext = createContext();
export function ApplicationProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [usersLDAP,setUsersLDAP] = useState([]);
  const fetchUsers = () => {
    base("Users")
      .select({
        view: "Grid view",
      })
      .eachPage((records, fetchNextPage) => {
        let globalUsers = [];
        records.forEach((row) => {
          let uid = row.getId();
          let fields = row._rawJson.fields;
          let obj = { ...fields, uid };

          globalUsers.push(obj);
        });
        setUsers(globalUsers);
      });
  };

  const fetchGroups =()=>{
    base("Groups")
      .select({
        view: "Grid view",
      })
      .eachPage((records, fetchNextPage) => {
        let globalGroups = [];
        records.forEach((row) => {
          let uid = row.getId();
          let fields = row._rawJson.fields;
          let obj = { ...fields, uid };

          globalGroups.push(obj);
        });
        setGroups(globalGroups);
      });
  }

  const fetchLDAPUSers =()=>{

    const params ={
      "method":"/users"
    }
    LDAPApi(params).then(r=>setUsersLDAP(r))

  }
  useEffect(() => {
    fetchUsers();
    fetchGroups()
  }, []);

  const changePassword=({uid, newpassword})=>{

  }
  const updateGrid=({rowData, payload, pageTitle,actualID})=>{
    let newArray = rowData.map(element => element.id === actualID ? {...element, ...payload} : element);
    pageTitle === "Users"? setUsers([...users,...newArray]): setGroups([...groups,...newArray]) 
  }
  return (
    <ApplicationContext.Provider value={{ users, groups, updateGrid, usersLDAP }}>
      {children}
    </ApplicationContext.Provider>
  );
}
export default ApplicationContext;
