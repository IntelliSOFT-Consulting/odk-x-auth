import { Download, Edit, Save, TrashCan } from "@carbon/icons-react";
import {
  Button,
  DataTable,
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
} from "@carbon/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DynamicDataGrid = ({ headers, rows, title, description }) => {
  const navigate = useNavigate();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);

  return (
    <>
      <p>
        Splice: {start} to {end}
      </p>
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
    </>
  );
};

const batchActionClick = (title, action, selectedRows) => {
  console.log(`${action} ${title} ${selectedRows}`);
};
const routeMappings = {
  groups: "/new-group",
  users: "/new-user",
};
export default DynamicDataGrid;
