import React, { useEffect } from "react";
import { ClickableTile, FlexGrid, Row, Column } from "@carbon/react";
import { Card } from "@carbon/ibmdotcom-react";
import { setCookie } from "../api/cookie";
import {User, Group } from "@carbon/icons-react";

const DashBoardTiles = ({ users, groups, roles }) => {
  const tileOptions = [
    {
      tileName: "Users",
      count: users.length,
      path: "/users",
      data_props: users,
      icon: <User size={40}/>
    },
    {
      tileName: "Groups",
      count: groups.length,
      path: "/groups",
      data_props: groups,
      icon: <Group size={40}/>
    },
  ];
  useEffect(() => {
    console.log("To store in cookies", JSON.stringify(groups));
    setCookie("odk-users", JSON.stringify(users), 1);
    setCookie("odk-groups", JSON.stringify(groups), 1);
    setCookie("odk-roles", JSON.stringify(roles), 1);
  }, [users, groups, roles]);
  return (
    <>
      <div class="cds--grid">
        <div class="cds--row"> 
          {tileOptions.map((option) => (
            <div class="cds--col-lg-4 cds--col-md-8 cds--col-sm-4" style={{"padding-bottom":"1em"}}>
              <ClickableTile
                style={{"padding":"5px"}}
                href={option.path}
                dataProps={option.data_props}
              >
                {option.icon}
                <h1 style={{ "font-weight": "bold" }}>{option.tileName}</h1>
                <br />
                <br />
                <h4 style={{ "font-weight": "bold" }}>{option.count}</h4>
              </ClickableTile>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashBoardTiles;
