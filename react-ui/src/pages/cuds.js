import { useEffect, useState } from 'react';
import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CRPFUnitCard } from 'src/sections/crpf/CRPFUnitCard';
import { CRPFUnitsSearch } from 'src/sections/crpf/CRPFUnitsSearch';
import axios from 'axios';
import { API_SERVER } from 'src/config/constant';

const Page = () => {
  const [crpfUnits, setCRPFUnits] = useState([]);

  useEffect(() => {
    const fetchCRPFUnits = async () => {
      try {
        const response = await axios.get(API_SERVER+'view_all_units');
        setCRPFUnits(response.data);
      } catch (error) {
        console.error('Error fetching CRPF units:', error);
      }
    };

    fetchCRPFUnits();
  }, []);

  return (
    <>
      <Head>
        <title>CRPF Units | Logalyzer</title>
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
                <Typography variant="h4">CRPF Units</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <CRPFUnitsSearch />
            <Grid container spacing={3}>
              {crpfUnits.map((unit) => (
                <Grid xs={12} md={6} lg={4} key={unit.id}>
                    <CRPFUnitCard unit={unit}/>
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Pagination count={3} size="small" />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
