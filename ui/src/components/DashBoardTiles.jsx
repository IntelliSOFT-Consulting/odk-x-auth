import React, { useEffect,useContext  } from "react";
import { ClickableTile} from "@carbon/react";
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
