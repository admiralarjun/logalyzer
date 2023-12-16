// alerts.js
import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AlertsTable } from 'src/sections/alerts/AlertsTable';
import { AlertsSearch } from 'src/sections/alerts/AlertsSearch';
import { applyPagination } from 'src/utils/apply-pagination';
import { OverviewLatestAlerts } from 'src/sections/overview/OverviewLatestAlerts';

const now = new Date();

const alertsData = [
  {
    id: '1',
    title: 'Unauthorized Access Detected',
    description: 'An unauthorized user attempted to access the system.',
    assignedTo: 'John Doe',
    createdAt: now.getTime(),
    status: 'Open'
  },
  {
    id: '2',
    title: 'Malware Detected',
    description: 'Malicious software detected on the server.',
    assignedTo: 'Jane Smith',
    createdAt: now.getTime(),
    status: 'In Progress'
  },
  // Add more alert data as needed
];

const useAlerts = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(alertsData, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useAlertIds = (alerts) => {
  return useMemo(
    () => {
      return alerts.map((alert) => alert.id);
    },
    [alerts]
  );
};

const AlertsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const alerts = useAlerts(page, rowsPerPage);
  const alertIds = useAlertIds(alerts);
  const alertSelection = useSelection(alertIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const handleSearch = useCallback((searchTerm) => {
    // You can implement search functionality here
    console.log(`Searching for: ${searchTerm}`);
  }, []);

  return (
    <>
      <Head>
        <title>
          Alerts | Logalyzer
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Alerts
                </Typography>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <AlertsSearch onSearch={handleSearch} />
            <AlertsTable
              count={alertsData.length}
              items={alerts}
              onDeselectAll={alertSelection.handleDeselectAll}
              onDeselectOne={alertSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={alertSelection.handleSelectAll}
              onSelectOne={alertSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={alertSelection.selected}
            />
            <OverviewLatestAlerts
              orders={[
                {
                  id: 'f69f88012978187a6c12897f',
                  ref: 'DEV1049',
                  amount: 30.5,
                  customer: {
                    name: 'Ekaterina Tankova'
                  },
                  createdAt: 1555016400000,
                  status: 'pending'
                },
                {
                  id: '9eaa1c7dd4433f413c308ce2',
                  ref: 'DEV1048',
                  amount: 25.1,
                  customer: {
                    name: 'Cao Yu'
                  },
                  createdAt: 1555016400000,
                  status: 'delivered'
                },
                // Add more order data as needed
              ]}
              sx={{ height: '100%' }}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

AlertsPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default AlertsPage;
