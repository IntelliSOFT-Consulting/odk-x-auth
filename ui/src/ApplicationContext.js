import React, { createContext, useState } from "react";
import { useEffect } from "react";
import base from "./api/airtable";
import { LDAPApi } from "./api/auth";
import Swal from "sweetalert2";
const ApplicationContext = createContext();
export function ApplicationProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

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

  const fetchGroups = async () => {
    const url = "/api/groups";
    const method = "GET";
    const params = { method, url };

    let res = await LDAPApi(params);

    let p = res.data.data.map((row) => {
      return {
        Users: "",
        group_name: row["name"] ? row["name"].split(" ")[1].toUpperCase() : "-",
        uid: row["gidNumber"], //GID
        created_time: row["created_time"] || "-",
        created_by: row["created_by"] || "-",
      };
    });
    setGroups(p);
    return;
  };

  useEffect(() => {
    fetchUsers();
    //groups

    fetchGroups();
  }, []);

  const changePassword = ({ uid, newpassword }) => {};
  const updateGrid = ({ rowData, payload, pageTitle, actualID }) => {
    let newArray = rowData.map((element) =>
      element.id === actualID ? { ...element, ...payload } : element
    );
    pageTitle === "Users"
      ? setUsers([...users, ...newArray])
      : setGroups([...groups, ...newArray]);
  };
  return (
    <ApplicationContext.Provider value={{ users, groups, updateGrid }}>
      {children}
    </ApplicationContext.Provider>
  );
}
export default ApplicationContext;
