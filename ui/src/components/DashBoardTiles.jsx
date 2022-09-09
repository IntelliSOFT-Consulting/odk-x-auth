import React from "react";
import { ClickableTile,FlexGrid, Row, Column } from "@carbon/react";
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
    <FlexGrid>
      <Row>
        {tileOptions.map((option) => (
          <Column>
            <ClickableTile href={option.path} >
              <h2>{option.tileName}</h2>
              <h4>{option.count}</h4>
            </ClickableTile>
          </Column>
        ))}
      </Row>
    </FlexGrid>
    </>
  );
};

export default DashBoardTiles;
