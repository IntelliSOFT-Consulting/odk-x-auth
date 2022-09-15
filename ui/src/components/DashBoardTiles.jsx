import React, { useEffect } from "react";
import { ClickableTile, FlexGrid, Row, Column } from "@carbon/react";
import { Card } from "@carbon/ibmdotcom-react";
import { setCookie } from "../api/cookie";

const DashBoardTiles = ({ users, groups, roles }) => {
  const tileOptions = [
    {
      tileName: "Users",
      count: users.length,
      path: "/users",
      data_props: users,
    },
    {
      tileName: "Groups",
      count: groups.length,
      path: "/groups",
      data_props: groups,
    },
  ];
  useEffect(() => {
    console.log("To store in cookies",JSON.stringify(groups))
    setCookie("odk-users", JSON.stringify(users), 1);
    setCookie("odk-groups", JSON.stringify(groups), 1);
    setCookie("odk-roles", JSON.stringify(roles), 1);
  }, [users, groups, roles]);
  return (
    <>
      <div style={{ "margin-top": "30px" }}>
        <FlexGrid>
          <Row>
            {tileOptions.map((option) => (
              <Column className="cds--col-lg-4">
                <ClickableTile
                  href={option.path}
                  className="clickable-tile"
                  dataProps={option.data_props}
                >
                  <h1 style={{ "font-weight": "bold" }}>{option.tileName}</h1>
                  <br />
                  <br />
                  <h4 style={{ "font-weight": "bold" }}>{option.count}</h4>
                </ClickableTile>
              </Column>
            ))}
          </Row>
        </FlexGrid>
      </div>
    </>
  );
};

export default DashBoardTiles;
