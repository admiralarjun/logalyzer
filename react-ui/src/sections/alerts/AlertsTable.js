// src/sections/alerts/AlertsTable.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';

const AlertsTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Alert Details
                </TableCell>
                <TableCell>
                  Assigned To
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Created At
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((alert) => (
                <TableRow
                  hover
                  key={alert.id}
                  selected={selected.includes(alert.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.includes(alert.id)}
                      onChange={(event) => {
                        if (event.target.checked) {
                          onSelectOne?.(alert.id);
                        } else {
                          onDeselectOne?.(alert.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack
                      alignItems="flex-start"
                      direction="column"
                      spacing={1}
                    >
                      <Typography variant="subtitle2">
                        {alert.details}
                      </Typography>
                      <Typography variant="body2">
                        {alert.description}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {alert.assignedTo}
                  </TableCell>
                  <TableCell>
                    {alert.status}
                  </TableCell>
                  <TableCell>
                    {alert.createdAt}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

AlertsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};

export { AlertsTable };
