import { Download, Edit, Save, TrashCan } from "@carbon/icons-react";
import {
  Button,
  DataTable,
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
} from "@carbon/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const DynamicDataGrid = ({ headers, rows, title, description }) => {
  const navigate = useNavigate();
  return (
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
                    batchActionClick(title, "Edit", selectedRows);
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
                {rows.map((row, i) => (
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
  );
};

const batchActionClick = (title, action, selectedRows) => {
  console.log(`${action} ${title} ${selectedRows}`);
};
const routeMappings = {
    "groups": "/new-group",
    "users": "/new-user",
  };
export default DynamicDataGrid;
