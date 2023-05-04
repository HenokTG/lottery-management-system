import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// @mui
import { Typography, Box, Container, Grid } from '@mui/material';

// components
import Page from '../components/Page';
import { OverviewTotals } from '../components/dashboard/overview-totals';
import { SalesByGames } from '../components/dashboard/game-sales';
import { OverviewPaymentDistributions } from '../components/dashboard/payment-distributions';
import { OperatorSalesDetail } from '../components/dashboard/operator-sales-detail';
import { HighestWinningTicketes } from '../components/dashboard/highest-winning-ticketes';
// icons
import { Sales } from '../icons/sales';
import { Tax } from '../icons/tax';
import { WonAmounts } from '../icons/won-amount';
import { Deposit } from '../icons/deposit';
import { Withdrawals } from '../icons/withdrawal';

// context and modules
import { useGlobalContext } from '../context';

const DashboardApp = () => {
  const { loggedIn, profilePk } = useGlobalContext();

  const navigate = useNavigate();
  const prevLocation = useLocation();

  useEffect(
    () => {
      if (loggedIn === false) {
        navigate(`/login?redirectTo=${prevLocation.pathname}`);
      }

      // const summaryAPI = `/ecl-analysis/api/dashboard-summary/${bankName}/${profilePk}/${summaryMonth}`;

      // fetchDashboardSummary(profilePk, summaryAPI, setSummaryList);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <Page title="Overview">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Typography sx={{ ml: 4, mt: 1, mb: 3 }} variant="h4">
          Overview
        </Typography>
        <Container maxWidth={false}>
          <Grid container columnSpacing={1}>
            <Grid item lg={2.4} sm={6} xs={12}>
              <OverviewTotals value={'$ 643k'} title="Total Sales" icon={<Sales />} iconBg="primary" />
            </Grid>
            <Grid item lg={2.4} sm={6} xs={12}>
              <OverviewTotals value={'$ 64k'} title="Won Amount" icon={<WonAmounts />} iconBg="secondary" />
            </Grid>
            <Grid item lg={2.4} sm={6} xs={12}>
              <OverviewTotals value={'$ 180k'} title="Total Tax" icon={<Tax />} iconBg="warning" />
            </Grid>
            <Grid item lg={2.4} sm={6} xs={12}>
              <OverviewTotals value={'$ 400k'} title="Total Deposit" icon={<Deposit />} iconBg="info" />
            </Grid>
            <Grid item lg={2.4} sm={6} xs={12}>
              <OverviewTotals value={'$ 110k'} title="Total Withdraw" icon={<Withdrawals />} iconBg="error" />
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 0, mb: 3 }}>
            <Grid item lg={7} md={12} xs={12}>
              <SalesByGames />
            </Grid>
            <Grid item lg={5} md={12} xs={12}>
              <OverviewPaymentDistributions />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item lg={5} md={12} xs={12}>
              <OperatorSalesDetail />
            </Grid>
            <Grid item lg={7} md={12} xs={12}>
              <HighestWinningTicketes />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
};

export default DashboardApp;
