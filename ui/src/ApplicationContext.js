import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { LDAPApi } from "./api/auth";
const ApplicationContext = createContext();
export function ApplicationProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  const fetchUsers = async () => {
    const url = "/api/users";
    const method = "GET";
    const params = { method, url };

    let res = await LDAPApi(params);

    if (res.status === "error" || res.data.error || res.data.data === []) {
      setGroups([]);
      return;
    }

    let p = res.data.data.map((row) => {
      //first_name, last_name, email, gidNumber
      return {
        uid: row["uid"] || "-",
        user_name: row["user_name"] || "-",
        email: row["email"] || "-",
        group_name: row["group_name"] || row["gidNumber"] || "-",
        first_name: row["first_name"] || "-",
        last_name: row["last_name"] || "-",
        created_time: row["created_time"] || "-",
        created_by: row["created_by"] || "-",
      };
    });
    setUsers(p);
    return;
  };

  const fetchGroups = async () => {
    const url = "/api/groups";
    const method = "GET";
    const params = { method, url };

    let res = await LDAPApi(params);

    let p = res.data.data.map((row) => {
      return {
        Users: "",
        group_name: row["name"] ? row["name"].toUpperCase() : "-",
        uid: row["gidNumber"], //GID
        users: row["users"] || 0,
        created_time: row["created_time"] || "-",
        created_by: row["created_by"] || "-",
      };
    });
    setGroups(p);
    return;
  };

  const onUserDelete =({id})=>{
    setUsers(users.filter(row=>row.uid !== id))
  }
  const onGroupDelete =({id})=>{
    setGroups(groups.filter(row=>row.uid !== id))
  }
  useEffect(() => {
    fetchUsers();
    //groups

    fetchGroups();
  }, []);

  
  const updateGrid = ({ rowData, payload, pageTitle, actualID }) => {
    let newArray = rowData.map((element) =>
      element.id === actualID ? { ...element, ...payload } : element
    );
    pageTitle === "Users"
      ? setUsers([...users, ...newArray])
      : setGroups([...groups, ...newArray]);
  };
  return (
    <ApplicationContext.Provider value={{ users, groups, updateGrid,onUserDelete,onGroupDelete }}>
      {children}
    </ApplicationContext.Provider>
  );
}
export default ApplicationContext;
