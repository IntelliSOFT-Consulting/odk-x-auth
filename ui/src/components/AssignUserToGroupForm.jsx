import {
  Checkbox,
  ComboBox,
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from "@carbon/react";
import TextInput from "@carbon/react/lib/components/TextInput";
import { Button, Form, Select, SelectItem } from "carbon-components-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../api/cookie";

const AssignUserToGroupForm = () => {
  const cookieRoles = JSON.parse(getCookie("odk-groups"));
  const cookieUsers = JSON.parse(getCookie("odk-users"));
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const updateSelected = (value, action) => {
    setSelected(selected.filter((item) => item !== value));
    if (action === true) {
      setSelected([...selected, value]);
    }
  };

  const users = [];
  cookieUsers.forEach((user) => {
    users.push(user.id || user.user_name);
  });

  const groupSelectComponents = cookieRoles.map((row, idx) => (
    <Checkbox
      labelText={row.group_name}
      id={row.group_name}
      onChange={(e) => {
        updateSelected(e.target.id, e.target.checked);
      }}
    />
  ));
  const adduserToGroup = () => {
    if (!userInfo.user_name) {
      return;
    }
    if (selected.length < 0) {
    }
  };
  return (
    <>
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-lg-2 cds--col-md-2"></div>
          <div className="cds--col">
            <div className="cds--row">
              <div className="cds--col">
                <ComboBox
                  ariaLabel="ComboBox"
                  id="user_id"
                  items={users}
                  label="Combo box menu options"
                  className="input-block"
                  titleText="Select A user"
                  onChange={(e) => {
                    setUserInfo({
                      ...userInfo,
                      user_name: e.selectedItem,
                    });
                  }}
                />
              </div>
            </div>
            <div className="cds--row">
              <div className="cds--col">
                <p>Groups</p>
                <em style={{ color: "green" }}>
                  Groups Selected: [{selected.join(",")}]
                </em>
                <ExpandableTile
                  tabIndex={0}
                  tileCollapsedIconText="Interact to Expand tile"
                  tileExpandedIconText="Interact to Collapse tile"
                  tileMaxHeight={0}
                  tilePadding={0}
                >
                  <TileAboveTheFoldContent>
                    <div style={{ height: "32px" }}>Select Group</div>
                  </TileAboveTheFoldContent>
                  <TileBelowTheFoldContent>
                    {groupSelectComponents}
                  </TileBelowTheFoldContent>
                </ExpandableTile>
              </div>
            </div>
            <br />
            <div className="cds--row">
              <div className="cds--col">
                <Button kind="secondary" className="block">
                  Cancel
                </Button>
                <Button className="block" onClick={() => {}}>
                  Save
                </Button>
              </div>
            </div>
          </div>
          <div className="cds--col-lg-2 cds--col-md-2"></div>
        </div>
      </div>
    </>
  );
};

const TestForm = () => {};

export default AssignUserToGroupForm;
