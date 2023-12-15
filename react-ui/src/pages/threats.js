// threats.js
import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ThreatsTable } from 'src/sections/threats/threatsTable';
import { ThreatsSearch } from 'src/sections/threats/threatsSearch';
import axios from 'axios';
import { API_SERVER } from 'src/config/constant';
import AddThreat from 'src/sections/threats/AddThreat'
import { applyPagination } from 'src/utils/apply-pagination';
const Page = () => {


const threatsData = [
  {
    id: '1',
    pattern: 'SQL Injection',
    name: 'SQLi',
    description: 'SQL Injection Attack Detected'
  },
  {
    id: '2',
    pattern: 'XSS',
    name: 'Cross-Site Scripting',
    description: 'XSS Attack Detected'
  },
  // Add more threat data as needed
];

const useThreats = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(threatsData, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useThreatIds = (threats) => {
  return useMemo(
    () => {
      return threats.map((threat) => threat.id);
    },
    [threats]
  );
};

const ThreatsPage = () => {
>>>>>>> 6aff6a028cbcad61c83c5f4198a4c9b56a8dae85
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const threats = useThreats(page, rowsPerPage);
  const threatIds = useThreatIds(threats);
  const threatSelection = useSelection(threatIds);

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
          Threats | Logalyzer
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
                  Threats
                </Typography>
              </Stack>
              <div>
                <AddThreat/>
              </div>
            </Stack>
            <ThreatsSearch onSearch={handleSearch} />
            <ThreatsTable
              count={threatsData.length}
              items={threats}
              onDeselectAll={threatSelection.handleDeselectAll}
              onDeselectOne={threatSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={threatSelection.handleSelectAll}
              onSelectOne={threatSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={threatSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

ThreatsPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ThreatsPage;
