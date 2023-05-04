import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { format } from 'date-fns';

import PerfectScrollbar from 'react-perfect-scrollbar';
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
// context and modules
import { useGlobalContext } from '../../context';
import { paymentTransactionsFetch } from '../../_apiAxios/payment-report';
// icons
import { Search as SearchIcon } from '../../icons/search';
import { Download as DownloadIcon } from '../../icons/download';
import { Filter } from '../../icons/filter';
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

const StyledTableRow = styled(TableRow)(({ theme, payType }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
// ----------------------------------------------------------------------------------
export const PaymentTransactionsResults = () => {
  const { loggedIn } = useGlobalContext();

  const prevLocation = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(0);
  const [paymentTransactionsList, setPaymentTransactionsList] = useState([]);
  const [paginationProps, setPaginationProps] = useState(null);

  const countAll = paginationProps !== null ? paginationProps.per_page * paginationProps.total_pages : -1;

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(
    () => {
      if (loggedIn === false) {
        navigate(`/login?redirectTo=${prevLocation.pathname}`);
      }

      const fetchAPI = `transaction/payment?page=${page + 1}&per_page=${limit}`;

      paymentTransactionsFetch(fetchAPI, setLoading, setPaymentTransactionsList, setPaginationProps);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [limit, page]
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
    const fetchAPI = `transaction/payment?page=${
      page + 1
    }&per_page=${limit}&search_by=${searchKey}&search_term=${searchValue}`;

    paymentTransactionsFetch(fetchAPI, setLoading, setPaymentTransactionsList, setPaginationProps);
  };

  const isDataNotFound = paymentTransactionsList.length === 0;

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
                    placeholder="Search payment transaction"
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
                <Button color="info" variant="contained" startIcon={<Filter fontSize="small" />}>
                  Filter
                </Button>
              </Grid>
            </Grid>

            <Card sx={{ mx: 2 }}>
              <Table size="small">
                <TableHead sx={{ py: 2 }}>
                  <TableRow>
                    <StyledTableCell align="center">Transaction ID</StyledTableCell>
                    <StyledTableCell align="center">Operator Name</StyledTableCell>
                    <StyledTableCell align="center">Payment Method</StyledTableCell>
                    <StyledTableCell align="center">Transaction Type</StyledTableCell>
                    <StyledTableCell align="center">Transaction Amount</StyledTableCell>
                    <StyledTableCell align="center">Transaction Fee</StyledTableCell>
                    <StyledTableCell align="center">Date & Time</StyledTableCell>
                    <StyledTableCell align="center">Transaction Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paymentTransactionsList.map((paymentTransaction) => (
                    <StyledTableRow
                      hover
                      key={paymentTransaction.id}
                      sx={{
                        backgroundColor: paymentTransaction.paymentType === 'Deposit' ? '#64B6F748' : '#FFBF4C48',
                      }}
                      // payType={paymentTransaction.paymentType}
                    >
                      <TableCell>{paymentTransaction.transactionID}</TableCell>
                      <TableCell>{paymentTransaction.operatorName}</TableCell>
                      <TableCell>{paymentTransaction.PaymentMethod}</TableCell>
                      <TableCell>{paymentTransaction.paymentType}</TableCell>
                      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                        {paymentTransaction.amount}
                      </TableCell>
                      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                        {paymentTransaction.tnxFee}
                      </TableCell>
                      <TableCell align="right">
                        {format(paymentTransaction.createdAt, 'yyyy-MM-dd HH:MM:SS z')}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color:
                            paymentTransaction.paymentStatus === 'Success'
                              ? '#43C6B7'
                              : // : paymentTransaction.paymentStatus === "Failed"
                                // ? "#D14343"
                                '#00F',
                        }}
                      >
                        {paymentTransaction.paymentStatus}
                      </TableCell>
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
