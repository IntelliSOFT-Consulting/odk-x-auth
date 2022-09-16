import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  DataTable,
} from "carbon-components-react";
const DataGrid = ({ headers, rows, title }) => {
  return (
    <div class="cds--grid">
      <div class="cds--row">
        <div class="cds--col-lg-16">
          <DataTable rows={rows} headers={headers} title={title || ""}>
            {({
              rows,
              headers,
              getTableProps,
              getHeaderProps,
              getRowProps,
            }) => (
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow style={{ backgroundColor: "red" }}>
                    {headers.map((header) => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DataTable>
        </div>
      </div>
    </div>
  );
};
const routeMappings = {
  groups: "/new-group",
  users: "/new-user",
};
export default DataGrid;
