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
      setSelected([...new Set(selected), value]);
    }
  };

  const users =[]
  cookieUsers.forEach(user=>{
    users.push(user.id || user.user_name)
  })
  
  const groupSelectComponents = cookieRoles.map((row, idx) => (
    <Checkbox
      labelText={row.group_name}
      id={row.group_name}
      onChange={(e) => {
        updateSelected(e.target.id, e.target.checked);
      }}
    />
  ));
  const adduserToGroup =()=>{
    if (!userInfo.user_name){
      return
    }
    if(selected.length < 0){

    }
  }
  return (
    <div>
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-16">
            <Form>
              <p>User ID</p>
              <ComboBox
                ariaLabel="ComboBox"
                id="user_id"
                items={users}
                label="Combo box menu options"
                titleText="Select A user"
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    user_name: e.target.value,
                  });
                }}
              />

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

              <br />
              <div className="LoginButtons">
                <Button kind="secondary" style={{ width: "100%" }}>
                  Cancel
                </Button>
                <Button
                  style={{ width: "100%" }}
                  onClick={() => {
                    window.location.href = "#";
                  }}
                >
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignUserToGroupForm;
