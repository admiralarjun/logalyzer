import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewThreats } from 'src/sections/overview/OverviewThreats';
import { OverviewLatestAlerts } from 'src/sections/overview/OverviewLatestAlerts';
import { OverviewLatestThreats } from 'src/sections/overview/OverviewLatestThreats';
import { OverviewAnnualThreats } from 'src/sections/overview/OverviewAnnualThreats';
import { OverviewRemediationInProcess } from 'src/sections/overview/OverviewRemediationInProcess';
import { OverviewRemediatedThreats } from 'src/sections/overview/OverviewRemediatedThreats';
import { OverviewThreatsIgnored } from 'src/sections/overview/OverviewThreatsIgnored';
import { OverviewThreatTrafficSource } from 'src/sections/overview/OverviewThreatTrafficSource';

const now = new Date();

const Page = () => (
  
  <>
    <Head>
      <title>
        Overview | Logalyzer
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
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewThreats
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="25"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewRemediatedThreats
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="1.6k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewRemediationInProcess
              sx={{ height: '100%' }}
              value={75.5}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewThreatsIgnored
              sx={{ height: '100%' }}
              value="96"
            />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <OverviewAnnualThreats
              chartSeries={[
                {
                  name: 'This year',
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
                },
                {
                  name: 'Last year',
                  data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewThreatTrafficSource
              chartSeries={[63, 15, 22]}
              labels={['Desktop', 'Server', 'Phone']}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewLatestThreats/>
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={8}
          >
            <OverviewLatestAlerts/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
