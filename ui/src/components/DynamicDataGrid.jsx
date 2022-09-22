import { Download, Edit, Save, TrashCan } from "@carbon/icons-react";
import {
  Button,
  ComboBox,
  DataTable,
  Form,
  Pagination,
  Table,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarMenu,
  TableToolbarSearch,
  TextInput,
} from "@carbon/react";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import base from "../api/airtable";
import { getCookie } from "../api/cookie";
import ApplicationContext from "../ApplicationContext";
import TransactionalModal from "./TransactionalModal";

const DynamicDataGrid = ({ headers, rows, title, description }) => {
  const [rowData, setRowData] = useState(rows);
  const navigate = useNavigate();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);

  const [contextData, setContextData] = useState([]);
  const [pageTitle, setPageTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [groupEditInfo, setGroupEditInfo] = useState({});
  const [userEditInfo, setUserEditInfo] = useState({});
  const dynamicForm =
    pageTitle === "Users" ? (
      <EditUserComponent
        title={pageTitle}
        data={contextData}
        setUserEditInfo={setUserEditInfo}
      />
    ) : (
      <EditGroupComponent
        title={pageTitle}
        data={contextData}
        setGroupEditInfo={setGroupEditInfo}
      />
    );
  const { updateGrid } = useContext(ApplicationContext);
  const defaultModaloptions = () => {
    const danger = false;
    const modalHeading = "Edit " + pageTitle;
    const modalLabel = "";
    const primaryButtonText = "Save";
    const secondaryButtonText = "Cancel";
    let content = dynamicForm;
    const someFun = () => {
      alert("I am pied piper...");
    };
    return {
      danger,
      modalHeading,
      modalLabel,
      secondaryButtonText,
      primaryButtonText,
      content,
      someFun,
    };
  };
  let onRequestClose = () => {
    setIsOpen(false);
  };
  let onRequestSubmit = () => {
    setIsOpen(false);
    const payload =
      pageTitle === "Users" ? { ...userEditInfo } : { ...groupEditInfo };

    const actualID = payload.id;
    delete payload["id"];
    console.log("id:" + actualID + ", fields: " + JSON.stringify(payload));

    if (actualID === undefined || payload === {}) {
      Swal.fire({
        title: "No data to change",
        icon: "info",
        text: "Nothing to change",
      });

      return;
    }
    base(pageTitle).update(
      [
        {
          id: actualID,
          fields: payload,
        },
      ],
      function (err, records) {
        if (err) {
          Swal.fire({
            title: `Error!:${err.error}`,
            icon: "error",
            html: `${err.message}`,
            confirmButtonText: "Okay",
          });
          return;
        }
        // records.forEach(function (record) {
        Swal.fire({
          title: "Records Updated",
          icon: "success",
          html: `Updated record for ${actualID}`,
          confirmButtonText: "Okay",
        });
        // });
        // let newArray = rowData.map((element) =>
        //   element.id === actualID ? { ...element, ...payload } : element
        // );
        // // setRowData([...rowData, ...newArray])
        window.location.reload(false);

      }
    );
  };

  return (
    <>

      <DataTable rows={rows} headers={headers}>
        {({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getSelectionProps,
          getToolbarProps,
          getBatchActionProps,
          onInputChange,
          selectedRows,
          getTableProps,
          getTableContainerProps,
        }) => {
          const batchActionProps = getBatchActionProps();
          return (
            <TableContainer
              title={title}
              description={description || `A list of ${title}`}
              {...getTableContainerProps()}
            >
              <TableToolbar {...getToolbarProps()}>
                <TableBatchActions {...batchActionProps}>
                  <TableBatchAction
                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                    renderIcon={TrashCan}
                    onClick={() => {
                      batchActionClick(title, "Delete", selectedRows);
                    }}
                  >
                    Delete
                  </TableBatchAction>
                  <TableBatchAction
                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                    renderIcon={Edit}
                    onClick={() => {
                      setContextData(selectedRows);
                      setPageTitle(title);
                      batchActionClick(title, "Edit", selectedRows) &&
                        setIsOpen(true);
                    }}
                  >
                    Edit
                  </TableBatchAction>
                </TableBatchActions>
                <TableToolbarContent
                  aria-hidden={batchActionProps.shouldShowBatchActions}
                >
                  <TableToolbarSearch
                    tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                    onChange={onInputChange}
                  />

                  <Button
                    tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                    onClick={() => {
                      console.log(`Adding a record to ${title.toLowerCase()}`);
                      navigate(`${routeMappings[title.toLowerCase()]}`);
                    }}
                    size="small"
                    kind="primary"
                  >
                    {`Add new ${title}`}
                  </Button>
                </TableToolbarContent>
              </TableToolbar>
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    <TableSelectAll {...getSelectionProps()} />
                    {headers.map((header, i) => (
                      <TableHeader key={i} {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(start, end).map((row, i) => (
                    <TableRow key={i} {...getRowProps({ row })}>
                      <TableSelectRow {...getSelectionProps({ row })} />
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          );
        }}
      </DataTable>
      <Pagination
        backwardText="Previous page"
        forwardText="Next page"
        itemsPerPageText="Items per page:"
        page={1}
        onChange={function noRefCheck(e) {
          let startOfPage = 0;
          let endOfPage = 0;
          if (e.page <= 1) {
            startOfPage = 0;
          } else {
            startOfPage = (e.page - 1) * e.pageSize;
          }
          endOfPage = startOfPage + e.pageSize;
          setStart(startOfPage);
          setEnd(endOfPage);
        }}
        pageSize={10}
        pageSizes={[10, 20, 30, 40, 50]}
        size="md"
        totalItems={rows.length}
      />
      {isOpen === true && (
        <TransactionalModal
          options={{
            ...defaultModaloptions(),
            onRequestClose,
            onRequestSubmit,
          }}
        />
      )}
    </>
  );
};

const batchActionClick = (title, action, selectedRows) => {
  const formattedObj = JSON.stringify(selectedRows);
  
  if (action === "Edit" && JSON.parse(formattedObj)[1]) {
    Swal.fire({
      title: "Error",
      icon: "error",
      text: `Sorry, you cannot select more than 1 records for Edit functionality`,
    });
    return false;
  }
  if (action === "Delete") {
    deleteRows(title, selectedRows);
    return;
  }

  return true;
};
const routeMappings = {
  groups: "/new-group",
  users: "/new-user",
};
const deleteRows = (title, rows) => {};
export default DynamicDataGrid;

const EditUserComponent = ({ title, data, setUserEditInfo }) => {
  const { users } = useContext(ApplicationContext);
  const cooKieUsers = JSON.stringify(users);
  const cooKieGroups = getCookie("odk-groups");

  const context = data[0].cells.filter(
    (row) => row.info.header === "user_name"
  );
  const ultimateData = JSON.parse(cooKieUsers).filter(
    (row) => row.user_name === context[0].value
  );
  const groups = JSON.parse(cooKieGroups).map((row) => row.group_name);

  const [userPayload, setUserPayload] = useState({
    id: ultimateData[0].uid,
    first_name: ultimateData[0].first_name,
    last_name: ultimateData[0].last_name,
    email: ultimateData[0].email,
    group_name: ultimateData[0].group_name || "",
  });

  return (
    <>
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-lg-16">
            <Form>
              <div className="cds--row">
                <div className="cds--col-lg-16">
                  <TextInput
                    id="user_id"
                    placeholder="User ID"
                    defaultValue={ultimateData[0].uid}
                    disabled
                    labelText="User ID"
                  />
                  <TextInput
                    id="first_name"
                    placeholder="User First Name"
                    defaultValue={ultimateData[0].first_name}
                    labelText="First Name"
                    onChange={(e) => {
                      setUserPayload({
                        ...userPayload,
                        first_name: e.target.value,
                      });
                      setUserEditInfo({
                        ...userPayload,
                        first_name: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="cds--row">
                <div className="cds--col-lg-16">
                  <TextInput
                    id="last_name"
                    placeholder="Input Last Name"
                    labelText="User Last Name"
                    defaultValue={ultimateData[0].last_name}
                    onChange={(e) => {
                      setUserPayload({
                        ...userPayload,
                        last_name: e.target.value,
                      });
                      setUserEditInfo({
                        ...userPayload,
                        last_name: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="cds--row">
                <div className="cds--col-lg-16">
                  <TextInput
                    id="email"
                    placeholder="Input email"
                    defaultValue={ultimateData[0].email}
                    labelText="Email Address"
                    onChange={(e) => {
                      setUserPayload({
                        ...userPayload,
                        email: e.target.value,
                      });
                      setUserEditInfo({
                        ...userPayload,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="cds--row">
                <div className="cds--col-lg-16">
                  <ComboBox
                    ariaLabel="ComboBox"
                    id="group_name"
                    items={groups}
                    label="Groups"
                    labelText="User Group"
                    className="input-block"
                    selectedItem={
                      !ultimateData[0].group_name
                        ? ""
                        : ultimateData[0].group_name
                    }
                    onChange={(e) => {
                      setUserPayload({
                        ...userPayload,
                        group_name: e.selectedItem,
                      });
                      setUserEditInfo({
                        ...userPayload,
                        group_name: e.selectedItem,
                      });
                    }}
                  />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
const EditGroupComponent = ({ title, data, setGroupEditInfo }) => {
  const groupEditInfo = {};
  const {groups} = useContext(ApplicationContext);
  const cooKieGroups = JSON.stringify(groups) //getCookie("odk-groups");

  const context = data[0].cells.filter(
    (row) => row.info.header === "group_name"
  );
  const ultimateData = JSON.parse(cooKieGroups).filter(
    (row) => row.group_name === context[0].value
  );

  useEffect(() => {
    setGroupEditInfo({
      ...groupEditInfo,
      id: ultimateData[0].uid,
      group_name: ultimateData[0].group_name,
    });
  }, []);

  return (
    <>
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-lg-16">
            {/* {JSON.stringify(ultimateData[0])} */}
            <Form>
              <div className="cds--row">
                <div className="cds--col-lg-16">
                  <TextInput
                    id="group_name"
                    placeholder="Group Name"
                    labelText="Group Name"
                    defaultValue={ultimateData[0].group_name}
                    onChange={(e) => {
                      setGroupEditInfo({
                        ...groupEditInfo,
                        group_name: e.target.value,
                        id: ultimateData[0].uid,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="cds--row">
                <div className="cds--col-lg-16">
                  <TextInput
                    id="group_id"
                    placeholder="Group ID"
                    defaultValue={ultimateData[0].uid}
                    labelText="GID"
                    disabled
                  />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
