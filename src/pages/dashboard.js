import { useState, useEffect } from 'react';
 
// @mui
import { Typography, Box, Container, Grid, Card, TextField, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// components
import Page from '../components/layout/Page';
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
import { fetchOperatorIDs } from '../_apiAxios/modelCreateFetches';
import { fetchDashboardOverview } from '../_apiAxios/dashboard-summary';

// --------------------------------------------------------------------------------------------------------------------

const DashboardApp = () => {
  const theme = useTheme();

  const [operatorIDs, setOperatorIDs] = useState([{ id: -1, operatorName: 'No operator to assign' }]);
  const [operatorId, setOperatorId] = useState('');

  const [range, setRange] = useState(30);
  const [loading, setLoading] = useState(true);

  const [summaryData, setSummaryData] = useState({
    totalRevenue: '-',
    totalPayout: '-',
    totalTax: '-',
    totalDeposit: '-',
    totalWithdrawal: '-',
  });

  useEffect(
    () => {
      setLoading(true);

      const operatorFetchAPI = `operator?page=${1}&per_page=${25}`;

      fetchOperatorIDs(operatorFetchAPI, setOperatorIDs);

      const today = new Date();
      const backDate = new Date(today.setDate(today.getDate() - range));

      const currentDate = new Date().toJSON().slice(0, 10);
      const initialDate = backDate.toJSON().slice(0, 10);

      const summaryAPI = `transaction/statistics?date_from=${initialDate}&date_to=${currentDate}&operator=${operatorId}`;

      fetchDashboardOverview(summaryAPI, setLoading, setSummaryData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [range, operatorId]
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
          <Card sx={{ px: 1, py: 2, backgroundColor: theme.palette.neutral[200] }}>
            <Grid container columnSpacing={1}>
              <Grid item lg={5}>
                <Card sx={{ mb: 2, px: 2, py: 1.5 }}>
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
                        value={operatorId}
                        onChange={(e) => setOperatorId(e.target.value)}
                      >
                        {/* <MenuItem key="all" value="all">
                          All Operators
                        </MenuItem> */}
                        {operatorIDs.map((operator) => (
                          <MenuItem key={`${operator.id}-${operator.name}`} value={operator.id}>
                            {operator.name}
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
              <Grid item lg={7} />

              <Grid item lg={2.4} sm={6} xs={12}>
                <OverviewTotals
                  value={summaryData.totalRevenue.toString()}
                  title="Total Sales"
                  icon={<Sales />}
                  iconBg="primary"
                  loading={loading}
                />
              </Grid>
              <Grid item lg={2.4} sm={6} xs={12}>
                <OverviewTotals
                  value={summaryData.totalPayout.toString()}
                  title="Won Amount"
                  icon={<WonAmounts />}
                  iconBg="secondary"
                  loading={loading}
                />
              </Grid>
              <Grid item lg={2.4} sm={6} xs={12}>
                <OverviewTotals
                  value={summaryData.totalTax.toString()}
                  title="Total Tax"
                  icon={<Tax />}
                  iconBg="warning"
                  loading={loading}
                />
              </Grid>
              <Grid item lg={2.4} sm={6} xs={12}>
                <OverviewTotals
                  value={summaryData.totalDeposit.toString()}
                  title="Total Deposit"
                  icon={<Deposit />}
                  iconBg="info"
                  loading={loading}
                />
              </Grid>
              <Grid item lg={2.4} sm={6} xs={12}>
                <OverviewTotals
                  value={summaryData.totalWithdrawal.toString()}
                  title="Total Withdraw"
                  icon={<Withdrawals />}
                  iconBg="error"
                  loading={loading}
                />
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
