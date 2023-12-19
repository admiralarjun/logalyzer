import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AlertsTable } from 'src/sections/alerts/AlertsTable';
import { AlertsSearch } from 'src/sections/alerts/AlertsSearch';
import { OverviewLatestAlerts } from 'src/sections/overview/OverviewLatestAlerts';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';


import axios from 'axios';
import { API_SERVER } from 'src/config/constant';
const AlertsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [alerts, setalerts] = useState([]);
  const alertsIds = useMemo(() => alerts.map((alert) => alert.id), [alerts]);
  const alertsSelection = useSelection(alertsIds);
  const [filter, setFilter] = useState('all');

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  useEffect(() => {
    const fetchalerts = async () => {
      try {
        const response = await axios.get(API_SERVER+'get_alert_all_details');
        const fetchedAlerts = response.data;

      // Filtering logic
      const filteredAlerts = fetchedAlerts.filter((alert) => {
        switch (filter) {
          case 'resolved':
            return alert.status === 'Resolved';
          case 'unresolved':
            return alert.status === 'Unresolved';
          case 'ignored':
            return alert.status === 'Ignored';
          default:
            // For 'all' or any other unknown filter, include all alerts
            return true;
        }
      });

      setalerts(filteredAlerts);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchalerts();
  }, [filter]);

  const handleSearch = useCallback((searchTerm) => {
    // You can implement search functionality here
    console.log(`Searching for: ${searchTerm}`);
  }, []);

  const handleFilterChange = useCallback((event) => {
    setFilter(event.target.value);
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
          <Stack direction={"row"}>
          <AlertsSearch onSearch={handleSearch} />
          <FormControl sx={{padding:"1rem"}}>
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select
            labelId="filter-label"
            id="filter"
            value={filter}
            onChange={handleFilterChange}
          >
            <MenuItem value="all">Show All</MenuItem>
            <MenuItem value="resolved">Resolved Alerts</MenuItem>
            <MenuItem value="unresolved">Unresolved Alerts</MenuItem>
            <MenuItem value="ignored">Ignored Alerts</MenuItem>
          </Select>
        </FormControl>
        </Stack>
          <AlertsTable
            count={alerts.length}
            items={alerts}
            onDeselectAll={alertsSelection.handleDeselectAll}
            onDeselectOne={alertsSelection.handleDeselectOne}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            onSelectAll={alertsSelection.handleSelectAll}
            onSelectOne={alertsSelection.handleSelectOne}
            page={page}
            rowsPerPage={rowsPerPage}
            selected={alertsSelection.selected}
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