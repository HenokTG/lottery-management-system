import { useState, useEffect } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

// react chartJS
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Chart } from 'react-chartjs-2';

// @mui
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  CardHeader,
  Typography,
  CardActions,
  TextField,
  MenuItem,
  Divider,
  SvgIcon,
  useTheme,
} from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

// context and modules
import { fetchSalesByGamesCatagory } from '../../_apiAxios/dashboard-summary';

// ---------------------------------------------------------------------------------------------------

export const SalesByGames = () => {
  const theme = useTheme();

  const [range, setRange] = useState(30);
  const [loading, setLoading] = useState(true);
  const [gameSalesData, setGameSalesData] = useState({ title: [], value: [] });

  useEffect(
    () => {
      setLoading(true);
      const today = new Date();
      const backDate = new Date(today.setDate(today.getDate() - range));

      const currentDate = new Date().toJSON().slice(0, 10);
      const initialDate = backDate.toJSON().slice(0, 10);

      const gameCataAPI = `game/sales?date_from=${initialDate}&date_to=${currentDate}`;

      fetchSalesByGamesCatagory(gameCataAPI, setLoading, setGameSalesData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [range]
  );

  const data = {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 30,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: gameSalesData.value,
        label: 'Sales Total by Game Category',
        maxBarThickness: 50,
      },
    ],
    labels: gameSalesData.title,
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider,
        },
      },
    ],
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
        title="Top Sales Total by Game Category"
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
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              position: 'relative',
            }}
          >
            {data.labels.length === 0 ? (
              <Typography color="warning.main" variant="subtitle1" align="center" sx={{ my: 6 }}>
                No data fetched!
              </Typography>
            ) : (
              <Box
                sx={{
                  height: 400,
                }}
              >
                <Bar data={data} options={options} />
              </Box>
            )}
          </Box>
        )}
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <TextField
          select
          fullWidth
          name="range"
          type="text"
          color="info"
          size="small"
          sx={{ width: '25%' }}
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <MenuItem value={7}>Last 7 Days</MenuItem>
          <MenuItem value={30}>Last 30 Days</MenuItem>
          <MenuItem value={365}>a Year</MenuItem>
        </TextField>
        <RouterLink to="app/games">
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
