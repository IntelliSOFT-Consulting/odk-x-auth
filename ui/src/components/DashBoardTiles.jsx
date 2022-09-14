import React from "react";
import { ClickableTile, FlexGrid, Row, Column } from "@carbon/react";
import { Card } from "@carbon/ibmdotcom-react";

const DashBoardTiles = () => {
  const tileOptions = [
    {
      tileName: "Users",
      count: 5,
      path: "/users",
    },
    {
      tileName: "Groups",
      count: 3,
      path: "/groups",
    },
  ];
  return (
    <>
      <div style={{ "margin-top": "30px" }}>
        <FlexGrid>
          <Row>
            {tileOptions.map((option) => (
              <Column className="cds--col-lg-4">
                <ClickableTile href={option.path} className="clickable-tile">
                  <h1 style={{ "font-weight": "bold" }}>{option.tileName}</h1>
                  <br /><br />
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
