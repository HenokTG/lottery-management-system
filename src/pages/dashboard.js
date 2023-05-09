import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// @mui
import { Typography, Box, Container, Grid, Card, CardContent, TextField, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
import { axiosInstance } from '../utils/axios';
import { fetchOperatorIDs } from '../_apiAxios/modelCreateFetches';

const DashboardApp = () => {
  const theme = useTheme();

  const { loggedIn, profilePk } = useGlobalContext();

  const navigate = useNavigate();
  const prevLocation = useLocation();

  const [operatorIDs, setOperatorIDs] = useState([{ id: -1, operatorName: 'No role to assign' }]);
  const [operator, setOperator] = useState('');
  const [range, setRange] = useState(7);

  useEffect(
    () => {
      if (loggedIn === false) {
        navigate(`/login?redirectTo=${prevLocation.pathname}`);
      }

      const operatorFetchAPI = `operator?page=${1}&per_page=${25}`;

      fetchOperatorIDs(operatorFetchAPI, setOperatorIDs);

      // const summaryAPI = `transactions/summary?operator=${operatorId}&date_from=${initial_date}&date_to=${today}`;

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
          <Card sx={{ p: 1, backgroundColor: theme.palette.neutral[200] }}>
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
              <Grid item lg={7} />
              <Grid item lg={5}>
                <Card sx={{ mt: 2, mb: 1, px: 2, py: 1.5 }}>
                  <Grid container columnSpacing={2}>
                    <Grid item lg={8}>
                      <TextField
                        select
                        fullWidth
                        name="operatorName"
                        label="Select operator"
                        type="text"
                        color="success"
                        size="small"
                        value={operator}
                        onChange={(e) => setOperator(e.target.value)}
                      >
                        {operatorIDs.map((operator) => (
                          <MenuItem key={`${operator.id}-${operator.operatorName}`} value={operator.id}>
                            {operator.operatorName}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item lg={4}>
                      <TextField
                        select
                        fullWidth
                        name="range"
                        type="text"
                        color="success"
                        size="small"
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                      >
                        <MenuItem value={7}>7 Days</MenuItem>
                        <MenuItem value={30}>30 Days</MenuItem>
                        <MenuItem value={365}>a Year</MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Card>
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
