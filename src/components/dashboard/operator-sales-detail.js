import { useState, useEffect } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import {
  Card,
  CardHeader,
  CircularProgress,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  CardActions,
  Button,
  SvgIcon,
  Divider,
  TableContainer,
  Paper,
  tableCellClasses,
  TextField,
  MenuItem,
} from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

// context and modules
import { fetchOperatorSalesDetail } from '../../_apiAxios/dashboard-summary';

// components
import Scrollbar from '../auxilary/Scrollbar';

// custom styles

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
    padding: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.oddRow,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// ---------------------------------------------------------------------------------------------------

export const OperatorSalesDetail = () => {
  const [range, setRange] = useState(7);
  const [loading, setLoading] = useState(true);
  const [operatorSalesData, setOperatorSalesData] = useState([]);

  useEffect(
    () => {
      const today = new Date();
      const backDate = new Date(today.setDate(today.getDate() - range));

      const currentDate = new Date().toJSON().slice(0, 10);
      const initialDate = backDate.toJSON().slice(0, 10);

      const topOperatorsAPI = `operator/performing-operators?date_from=${initialDate}&date_to=${currentDate}`;

      fetchOperatorSalesDetail(topOperatorsAPI, setLoading, setOperatorSalesData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [range]
  );

  return (
    <Card sx={{ p: 1 }}>
      <CardHeader title="Top Performing Operators" sx={{ py: 2, pl: 1 }} />
      <Scrollbar>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ height: 385}}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Operator Name</StyledTableCell>
                  <StyledTableCell>Total Sales</StyledTableCell>
                  <StyledTableCell>Total Tax</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {operatorSalesData.map((operatorSale) => (
                  <StyledTableRow hover key={operatorSale.id}>
                    <TableCell>{operatorSale.operatorName}</TableCell>
                    <TableCell align="right">{operatorSale.sales}</TableCell>
                    <TableCell align="right">{operatorSale.tax}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              {operatorSalesData.length === 0 && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={3} sx={{ py: 6 }}>
                      <Box>
                        <Typography gutterBottom align="center" variant="subtitle1" color="warning.main">
                          No data fetched!
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        )}
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <TextField
          select
          fullWidth
          name="range"
          type="text"
          color="info"
          size="small"
          sx={{ width: '35%' }}
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <MenuItem value={7}>Last 7 Days</MenuItem>
          <MenuItem value={30}>Last 30 Days</MenuItem>
          <MenuItem value={365}>a Year</MenuItem>
        </TextField>
        <RouterLink to="report/revenue">
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
