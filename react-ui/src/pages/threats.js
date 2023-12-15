import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ThreatsTable } from 'src/sections/threats/ThreatsTable';
import { ThreatsSearch } from 'src/sections/threats/ThreatsSearch';
import AddThreat from 'src/sections/threats/AddThreat'
import axios from 'axios';
import { API_SERVER } from 'src/config/constant';
const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [threats, setthreats] = useState([]);
  const threatsIds = useMemo(() => threats.map((threat) => threat.id), [threats]);
  const threatsSelection = useSelection(threatsIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const response = await axios.get(API_SERVER+'view_all_threats');
        setthreats(response.data);
      } catch (error) {
        console.error('Error fetching threats:', error);
      }
    };

    fetchThreats();
  }, []);

  return (
    <>
      <Head>
        <title>Threats | Logalyzer</title>
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
                <Typography variant="h4">Threats</Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <AddThreat/>
              </div>
            </Stack>
            <ThreatsSearch />
            <ThreatsTable
              count={threats.length}
              items={threats}
              onDeselectAll={threatsSelection.handleDeselectAll}
              onDeselectOne={threatsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={threatsSelection.handleSelectAll}
              onSelectOne={threatsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={threatsSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;