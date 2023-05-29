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
import { fetchHighestWinningTicketes } from '../../_apiAxios/dashboard-summary';

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

export const HighestWinningTicketes = () => {
  const [range, setRange] = useState(30);
  const [loading, setLoading] = useState(true);
  const [topWinsData, setTopWinsData] = useState([]);

  useEffect(
    () => {
      setLoading(true);

      const today = new Date();
      const backDate = new Date(today.setDate(today.getDate() - range));

      const currentDate = new Date().toJSON().slice(0, 10);
      const initialDate = backDate.toJSON().slice(0, 10);

      const highestWinningsAPI = `transaction/highest-winning-tickets?date_from=${initialDate}&date_to=${currentDate}`;

      fetchHighestWinningTicketes(highestWinningsAPI, setLoading, setTopWinsData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [range]
  );

  return (
    <Card sx={{ p: 1 }}>
      <CardHeader title="Highest Winning Tickets" sx={{ py: 2, pl: 1 }} />
      <Scrollbar>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Game Name</StyledTableCell>
                  <StyledTableCell>Operator Name</StyledTableCell>
                  <StyledTableCell>Ticket Reference</StyledTableCell>
                  <StyledTableCell>Paid Amount</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topWinsData.map((topWinningTicket) => (
                  <StyledTableRow hover key={topWinningTicket.id}>
                    <TableCell>{topWinningTicket.gameName}</TableCell>
                    <TableCell>{topWinningTicket.operatorName}</TableCell>
                    <TableCell>{topWinningTicket.ticketRef}</TableCell>
                    <TableCell align="right">{topWinningTicket.winAmount}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              {topWinsData.length === 0 && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={4} sx={{ py: 6 }}>
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
          sx={{ width: '25%' }}
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <MenuItem value={7}>Last 7 Days</MenuItem>
          <MenuItem value={30}>Last 30 Days</MenuItem>
          <MenuItem value={365}>a Year</MenuItem>
        </TextField>
        <RouterLink to="report/winning-ticket">
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
