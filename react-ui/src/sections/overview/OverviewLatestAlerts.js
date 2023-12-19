// src/sections/overview/OverviewLatestAlerts.js
import { React , useEffect , useState } from 'react';
import { format } from 'date-fns';
import { Chip ,Stack , Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import { getInitials } from 'src/utils/get-initials';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import axios from 'axios';
import { API_SERVER } from 'src/config/constant';
const statusMap = {
  open: 'error',
  inProgress: 'warning',
  closed: 'success'
};

const OverviewLatestAlerts = () => {
  const [alerts, setalerts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        console.log("triggered")  
        const response = await axios.get(`${API_SERVER}get_alert_all_details/`);
        // Sort the alerts based on creation_time in descending order
        const sortedAlerts = response.data.sort((a, b) => new Date(b.creation_time) - new Date(a.creation_time));
        // Get only the first 6 items
        const limitedAlerts = sortedAlerts.slice(0, 6);
        setalerts(limitedAlerts);
        console.log(limitedAlerts);
      } catch (error) {
        console.error('Error fetching threats:', error);
      }
    })();
  }, []);

  return (
    <Card>
      <CardHeader title="Latest Alerts" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
        <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Alert Details
                </TableCell>
                <TableCell>
                  CRPF Device
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
              {alerts.map((alert) => (
                <TableRow
                  hover
                  key={alert.id}
                >
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
                    {alert.crpf_device_name}
                  </TableCell>
                  <TableCell>
                      {alert.assignee__first_name !== null ? (
                        <Chip
                          avatar={<Avatar alt={""} src={`http://localhost:8000/media/${alert.user_profile_pic}`} >{getInitials(`${alert.assignee__first_name} ${alert.assignee__last_name}`)}</Avatar>}
                          label={alert.assignee__first_name+" "+alert.assignee__last_name}
                          variant="outlined"
                        />
                      ) : null}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
          onClick={() => window.location.href=`/alerts`}
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestAlerts.propTypes = {
  alerts: PropTypes.array,
  sx: PropTypes.object
};

export { OverviewLatestAlerts };
