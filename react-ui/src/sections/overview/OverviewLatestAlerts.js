// src/sections/overview/OverviewLatestAlerts.js
import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
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

const statusMap = {
  open: 'error',
  inProgress: 'warning',
  closed: 'success'
};

const OverviewLatestAlerts = (props) => {
  const { alerts = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Alerts" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Alert
                </TableCell>
                <TableCell>
                  Source
                </TableCell>
                <TableCell sortDirection="desc">
                  Date
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alerts.map((alert) => {
                const createdAt = format(alert.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={alert.id}
                  >
                    <TableCell>
                      {alert.name}
                    </TableCell>
                    <TableCell>
                      {alert.source}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[alert.status]}>
                        {alert.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
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
