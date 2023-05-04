import { Link as RouterLink } from 'react-router-dom';

import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';

import { useState } from 'react';

import { styled } from '@mui/material/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  useTheme,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const operatorName = () => {
  const fakeName = faker.company.catchPhraseNoun();
  const capName = fakeName.charAt(0).toUpperCase() + fakeName.slice(1);
  return faker.helpers.arrayElement([`${capName} Gaming`, `${capName} Bet`, `${capName} Lottery`]);
};

const topWinningTickets = [...Array(10).keys()].map((elem, idx) => {
  return {
    id: uuid(),
    operatorName: operatorName(),
    gameName: faker.helpers.arrayElement([
      'Scratch',
      'G1X',
      'G2X',
      'Eksa 900',
      'Eksa 3000',
      'AMD RX 6900',
      'Lotto Mini1',
      'Doubles',
      'Sport Saga',
    ]),
    ticketRef: faker.random.alpha({ count: 15, casing: 'upper' }),
    winAmount: faker.finance.amount(18000, 130000, 2, '$ ', true),
  };
});

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
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const HighestWinningTicketes = (props) => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card sx={{ height: '100%', p: 1 }} {...props}>
      <CardHeader title="Highest Winning Ticketes" sx={{ py: 2, pl: 1 }} />
      <PerfectScrollbar>
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
              {topWinningTickets.map((topWinningTicket) => (
                <StyledTableRow hover key={topWinningTicket.id}>
                  <TableCell>{topWinningTicket.gameName}</TableCell>
                  <TableCell>{topWinningTicket.operatorName}</TableCell>
                  <TableCell>{topWinningTicket.ticketRef}</TableCell>
                  <TableCell align="right">{topWinningTicket.winAmount}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PerfectScrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <TextField
          fullWidth
          name="range"
          type="text"
          color="info"
          sx={{ width: '25%' }}
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
        <RouterLink to="report/winning-ticket" >
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
