// src/sections/alerts/IncidentsTable.js
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
import { Chip } from '@mui/material';
import { Avatar } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import SettingsApplicationsSharpIcon from '@mui/icons-material/SettingsApplicationsSharp';
import ViewandEditAlert from './ViewandEditAlert'
import { getInitials } from 'src/utils/get-initials';
const IncidentsTable = (props) => {

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                   Id
                </TableCell>
                <TableCell>
                  Alert Id
                </TableCell>
                <TableCell>
                  Thre
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
                <TableCell>
                  Manage
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
                        {alert.threat_signature_name}
                      </Typography>
                      <Typography variant="body2">
                        {alert.description}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {alert.crpf_unit_name}
                  </TableCell>
                  <TableCell>
                    {alert.crpf_device_name}
                  </TableCell>
                  <TableCell>
                      {alert.user_profile_pic !== null ? (
                        <Chip
                          avatar={<Avatar alt={""} src={`http://localhost:8000/media/${alert.user_profile_pic}`} >{getInitials(`${alert.assignee__first_name} ${alert.assignee__last_name}`)}</Avatar>}
                          label={alert.assignee__first_name+" "+alert.assignee__last_name}
                          variant="outlined"
                        />
                      ) : (<Chip
                        avatar={<Avatar>{getInitials(`${alert.assignee__first_name} ${alert.assignee__last_name}`)}</Avatar>}
                        label={alert.assignee__first_name+" "+alert.assignee__last_name}
                        variant="outlined"
                      />)}
                    </TableCell>
                    <TableCell>
                    {alert.status === 'Resolved' ? (
                      <Chip
                        icon={<CheckCircleOutlineIcon />}
                        label={alert.status}
                        color="success"
                        // variant="outlined"
                      />
                    ) : alert.status === 'Unresolved' ? (
                      <Chip
                        icon={<CancelOutlinedIcon />}
                        label={alert.status}
                        color="error"
                        // variant="outlined"
                      />
                    ) : (
                      <Chip
                        icon={<IndeterminateCheckBoxOutlinedIcon />}
                        label={alert.status}
                        color="warning"
                        // variant="outlined"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                  {new Date(alert.creation_time).toLocaleString()}
                </TableCell>
                <TableCell>
                  <ViewandEditAlert alert_id={alert.id} crpf_unit_id={alert.crpf_unit_id} crpf_device_id={alert.crpf_device_id} threat_signature_id={alert.threat_signature_id} log_line={alert.log_line} assignid={alert.assignee__id} alert_status={alert.status}/>
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      {/* <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Card>
  );
};



export { IncidentsTable };
