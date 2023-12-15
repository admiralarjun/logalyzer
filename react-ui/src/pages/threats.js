import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import axios from 'axios';  // Import axios
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ThreatsTable } from 'src/sections/threats/ThreatsTable';
import { ThreatsSearch } from 'src/sections/threats/ThreatsSearch';
import { applyPagination } from 'src/utils/apply-pagination';

const ThreatsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [threatsData, setThreatsData] = useState([]);  // State to store threats data
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

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const response = await axios.get(API_SERVER + 'viewallthreats');
        setThreatsData(response.data);
      } catch (error) {
        console.error('Error fetching threats:', error);
      }
    };

    fetchThreats();
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
