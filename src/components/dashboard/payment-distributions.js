import { useState, useEffect } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

// react chartJS
import { Doughnut } from 'react-chartjs-2';

// @mui
import {
  useTheme,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  CardHeader,
  CardActions,
  SvgIcon,
  Divider,
  Typography,
  TextField,
  MenuItem,
} from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

// context and modules
import { fetchOverviewPaymentDistributions } from '../../_apiAxios/dashboard-summary';

// ---------------------------------------------------------------------------------------------------

export const OverviewPaymentDistributions = () => {
  const theme = useTheme();

  const [range, setRange] = useState(7);
  const [loading, setLoading] = useState(true);
  const [payDistribData, setPayDistribData] = useState({ title: [], value: [], bgColorCode: [] });

  useEffect(
    () => {
      const today = new Date();
      const backDate = new Date(today.setDate(today.getDate() - range));

      const currentDate = today.toJSON().slice(0, 10);
      const initialDate = backDate.toJSON().slice(0, 10);

      const payDistribAPI = `payment-method/distribution?date_from=${initialDate}&date_to=${currentDate}`;

      fetchOverviewPaymentDistributions(payDistribAPI, setLoading, setPayDistribData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [range]
  );

  const data = {
    datasets: [
      {
        data: payDistribData.value,
        backgroundColor: payDistribData.bgColorCode,
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF',
      },
    ],
    labels: payDistribData.title,
  };

  const payments = payDistribData.title.map((title, idx) => {
    const payment = { title, value: payDistribData.value[idx], color: payDistribData.bgColorCode[idx] };
    return payment;
  });

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Card>
      <CardHeader
        title="Payment Distributions"
        titleTypographyProps={{
          color: 'textPrimary',
          variant: 'h6',
          sx: {
            display: 'inline-block',
            py: 1,
            px: 2,
            fontWeight: 'bold',
          },
        }}
        sx={{ p: 2 }}
      />
      <Divider />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <CardContent>
          {payments.length === 0 ? (
            <Typography color="warning.main" variant="subtitle1" align="center" sx={{ my: 6 }}>
              No data fetched!
            </Typography>
          ) : (
            <Box>
              <Box
                sx={{
                  height: 322,
                }}
              >
                <Doughnut data={data} options={options} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  pt: 2,
                }}
              >
                {payments.map(({ color, title, value }) => (
                  <Box
                    key={title}
                    sx={{
                      p: 1,
                      textAlign: 'center',
                    }}
                  >
                    <Typography color="textPrimary" variant="caption">
                      {title}
                    </Typography>
                    <Typography style={{ color }} variant="subtitle2">
                      {value}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </CardContent>
      )}
      <Divider />
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <TextField
          fullWidth
          name="range"
          type="text"
          color="info"
          size="small"
          select
          sx={{ width: '35%' }}
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <MenuItem value={7}>Last 7 Days</MenuItem>
          <MenuItem value={30}>Last 30 Days</MenuItem>
          <MenuItem value={365}>a Year</MenuItem>
        </TextField>
        <RouterLink to="payment-report/payment-distribution">
          <Button
            color="success"
            endIcon={
              <SvgIcon fontSize="small">
                <ArrowRightAltIcon />
              </SvgIcon>
            }
            size="small"
          >
            View All
          </Button>
        </RouterLink>
      </CardActions>
    </Card>
  );
};
