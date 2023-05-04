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
  CardHeader,
  CardActions,
  SvgIcon,
  Divider,
  Typography,
  TextField,
  MenuItem,
} from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const OverviewPaymentDistributions = (props) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [23, 15, 5, 12, 5, 16, 24],
        backgroundColor: ['#3F51B5', '#c094d6', '#6ac460', '#e53935', '#a6cade', '#c2eb91', '#FB8C00'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF',
      },
    ],
    labels: ['Cash', 'M-pesa', 'MTN', 'Telebirr', 'Standard Bank', 'Eco Bank', 'Commercial Bank Of Ethiopia (CBE)'],
  };

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

  const devices = [
    {
      title: 'Cash',
      value: 23,
      color: '#3F51B5',
    },
    {
      title: 'M-pesa',
      value: 15,
      color: '#c094d6',
    },
    {
      title: 'MTN',
      value: 5,
      color: '#6ac460',
    },
    {
      title: 'Telebirr',
      value: 12,
      color: '#e53935',
    },
    {
      title: 'Standard Bank',
      value: 5,
      color: '#a6cade',
    },
    {
      title: 'Eco Bank',
      value: 16,
      color: '#c2eb91',
    },
    {
      title: 'CBE',
      value: 24,
      color: '#FB8C00',
    },
  ];

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
      <CardContent>
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
          {devices.map(({ color, icon: Icon, title, value }) => (
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
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <TextField
          fullWidth
          name="range"
          type="text"
          color="info"
          sx={{ width: '35%' }}
          InputProps={{
            style: {
              border: `1px solid ${theme.palette.info.main}`,
              color: theme.palette.info.main,
            },
          }}
          defaultValue={7}
          size="small"
          select
        >
          <MenuItem value={7}>Last 7 Days</MenuItem>
          <MenuItem value={30}>Last 30 Days</MenuItem>
          <MenuItem value={1}>Last 365 Days</MenuItem>
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
