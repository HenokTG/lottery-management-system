import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { format } from 'date-fns';

// @mui
import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  tableCellClasses,
  TableRow,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// components
import AnnualReportFilter from '../auxilary/AnnualReportFilter';

// context and modules
import { useGlobalContext } from '../../context';
import { winningTicketsFetch } from '../../_apiAxios/report';
import { fetchOperatorIDs } from '../../_apiAxios/modelCreateFetches';
import { bettingTypeIDs, fetchCurrencyIDs, fetchPaymentMethodIDs } from '../../_apiAxios/fetchFilterIDs';

// icons
import { Search as SearchIcon } from '../../icons/search';
import { Download as DownloadIcon } from '../../icons/download';

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

// ---------------------------------------------------------------------

export const WinTicketResults = () => {
  const { loggedIn } = useGlobalContext();

  const prevLocation = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(0);
  const [winningTicketsList, setWinningTicketsList] = useState([]);
  const [paginationProps, setPaginationProps] = useState(null);

  const countAll = paginationProps !== null ? paginationProps.per_page * paginationProps.total_pages : -1;

  const [searchQuery, setSearchQuery] = useState('');

  const fetchRootAPI = `transaction/ticket?transaction_type=payout&page=${page + 1}&per_page=${limit}`;

  const [fetchAPI, setFetchAPI] = useState(fetchRootAPI);

  const [operatorIDs, setOperatorIDs] = useState([{ id: -1, operatorName: 'No role to assign' }]);
  const [currencyIDs, setCurrencyIDs] = useState([{ id: -1, operatorName: 'No currency to assign' }]);
  const [paymentMethodIDs, setPaymentMethodIDs] = useState([{ id: -1, operatorName: 'No payment method to assign' }]);

  useEffect(
    () => {
      if (loggedIn === false) {
        navigate(`/login?redirectTo=${prevLocation.pathname}`);
      }

      winningTicketsFetch(fetchAPI, setLoading, setWinningTicketsList, setPaginationProps);

      const operatorFetchAPI = `operator?page=${1}&per_page=${50}`;
      const currencyIDsFetchAPI = `currency?page=${1}&per_page=${50}`;
      const paymentMethodIDsFetchAPI = `payment-method?page=${1}&per_page=${50}`;

      fetchOperatorIDs(operatorFetchAPI, setOperatorIDs);
      fetchCurrencyIDs(currencyIDsFetchAPI, setCurrencyIDs);
      fetchPaymentMethodIDs(paymentMethodIDsFetchAPI, setPaymentMethodIDs);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [limit, page, fetchAPI]
  );

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const searchAction = (e) => {
    setSearchQuery(e.target.value);
    const searchKey = 'operator';
    const searchValue = e.target.value;
    const fetchAPI = `transaction/ticket?transaction_type=payout&page=${
      page + 1
    }&per_page=${limit}&search_by=${searchKey}&search_term=${searchValue}`;

    winningTicketsFetch(fetchAPI, setLoading, setWinningTicketsList, setPaginationProps);
  };

  const isDataNotFound = winningTicketsList.length === 0;

  // For Filter component

  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [betType, setBetType] = useState('');
  const [operatorID, setOperatorID] = useState('');
  const [currencyID, setCurrencyID] = useState('');
  const [paymentMethodID, setPaymentMethodID] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  const filterQueryAPI = `date_from=${dateFrom ? dateFrom.toISOString().split('T')[0] : ''}&date_to=${
    dateTo ? dateTo.toISOString().split('T')[0] : ''
  }&ticket_type=${betType}&operator=${operatorID}&currency=${currencyID}&payment_method=${paymentMethodID}&minimum_amount=${minAmount}&maximum_amount=${maxAmount}`;

  const filterProps = [
    {
      fieldName: 'dateFrom',
      title: 'Date From',
      child: null,
      valueSet: dateFrom,
      callChangeFunc: setDateFrom,
      fieldType: 'date',
    },
    {
      fieldName: 'dateTO',
      title: 'Date To',
      child: null,
      valueSet: dateTo,
      callChangeFunc: setDateTo,
      fieldType: 'date',
    },
    {
      fieldName: 'betType',
      title: 'Select Bet Type',
      child: bettingTypeIDs(),
      valueSet: betType,
      callChangeFunc: setBetType,
    },
    {
      fieldName: 'operatorID',
      title: 'Select Operator',
      child: operatorIDs,
      valueSet: operatorID,
      callChangeFunc: setOperatorID,
    },
    {
      fieldName: 'currencyID',
      title: 'Select Currency',
      child: currencyIDs,
      valueSet: currencyID,
      callChangeFunc: setCurrencyID,
    },
    {
      fieldName: 'paymentMethodID',
      title: 'Select Payment Method',
      child: paymentMethodIDs,
      valueSet: paymentMethodID,
      callChangeFunc: setPaymentMethodID,
    },
    {
      fieldName: 'minAmount',
      title: 'Enter Min Winning Amount',
      child: 'text-input',
      valueSet: minAmount,
      callChangeFunc: setMinAmount,
    },
    {
      fieldName: 'maxAmount',
      title: 'Enter Max Winning Amount',
      child: 'text-input',
      valueSet: maxAmount,
      callChangeFunc: setMaxAmount,
    },
  ];

  return (
    <Card>
      <PerfectScrollbar>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ minWidth: 1050 }}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: 2 }}>
              <Grid item md={8}>
                <Box sx={{ maxWidth: 400 }}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon color="action" fontSize="small">
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Search winning ticket"
                    variant="outlined"
                    color="success"
                    onChange={searchAction}
                  />
                </Box>
              </Grid>
              <Grid item md={2.4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button color="info" variant="outlined" startIcon={<DownloadIcon fontSize="small" />}>
                  Export
                </Button>
                <AnnualReportFilter
                  filterProps={filterProps}
                  fetchRootAPI={fetchRootAPI}
                  filterQueryAPI={filterQueryAPI}
                  setFetchAPI={setFetchAPI}
                />
              </Grid>
            </Grid>

            <Card sx={{ mx: 2 }}>
              <Table size="small">
                <TableHead sx={{ py: 2 }}>
                  <TableRow>
                    <StyledTableCell align="center">Player / Branch ID</StyledTableCell>
                    <StyledTableCell align="center">Ticket Reference</StyledTableCell>
                    <StyledTableCell align="center">Game Name</StyledTableCell>
                    <StyledTableCell align="center">Operator Name</StyledTableCell>
                    <StyledTableCell align="center">Bet Type</StyledTableCell>
                    <StyledTableCell align="center">Bet Amount</StyledTableCell>
                    <StyledTableCell align="center">Payment Method</StyledTableCell>
                    <StyledTableCell align="center">Currency Code</StyledTableCell>
                    <StyledTableCell align="center">Winning Amount</StyledTableCell>
                    <StyledTableCell align="center">Date & Time</StyledTableCell>
                    <StyledTableCell align="center">Payment Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {winningTicketsList.map((winTicket) => (
                    <StyledTableRow hover key={winTicket.id}>
                      <TableCell>{winTicket.playerId}</TableCell>
                      <TableCell>{winTicket.ticketRef}</TableCell>
                      <TableCell>{winTicket.gameName}</TableCell>
                      <TableCell>{winTicket.operatorName}</TableCell>
                      <TableCell>{winTicket.ticketType}</TableCell>
                      <TableCell>{winTicket.betAmount}</TableCell>
                      <TableCell>{winTicket.paymentMethod}</TableCell>
                      <TableCell>{winTicket.currency}</TableCell>
                      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                        {winTicket.winAmount}
                      </TableCell>
                      <TableCell align="right">{format(winTicket.createdAt, 'yyyy-MM-dd HH:MM:SS z')}</TableCell>
                      <TableCell>{winTicket.tnxStatus}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
                {isDataNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                        <Box>
                          <Typography gutterBottom align="center" variant="subtitle1" color="error.main">
                            No data fetched!
                          </Typography>
                          <Typography variant="body2" align="center" color="warning.main">
                            No results found for &nbsp;
                            <strong style={{ color: 'success.light' }}>&quot;{searchQuery}&quot;</strong>. Try checking
                            for typos or internet connection.
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </Card>
          </Box>
        )}
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={countAll}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[10, 15, 25]}
        showFirstButton
        showLastButton
      />
    </Card>
  );
};
