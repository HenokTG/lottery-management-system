import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

// components
import AnnualReportFilter from '../auxilary/AnnualReportFilter';

// context and modules
import { paymentDistributionsFetch } from '../../_apiAxios/payment-report';
import { fetchOperatorIDs } from '../../_apiAxios/modelCreateFetches';
import { fetchPaymentMethodIDs } from '../../_apiAxios/fetchFilterIDs';
import { axiosInstance } from '../../utils/axios';
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

// ---------------------------------------------------------------------------------

export const PaymentDistributionResults = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(0);
  const [paymentDistributionsList, setPaymentDistributionsList] = useState([]);
  const [paginationProps, setPaginationProps] = useState(null);

  const countAll = paginationProps !== null ? paginationProps.per_page * paginationProps.total_pages : -1;

  const [searchQuery, setSearchQuery] = useState('');

  const fetchRootAPI = `transaction/operator-payment-methods?page=${page + 1}&per_page=${limit}`;

  const [fetchAPI, setFetchAPI] = useState(fetchRootAPI);

  const [operatorIDs, setOperatorIDs] = useState([{ id: -1, operatorName: 'No role to assign' }]);
  const [paymentMethodIDs, setPaymentMethodIDs] = useState([{ id: -1, operatorName: 'No payment method to assign' }]);

  useEffect(
    () => {
      setLoading(true);

      paymentDistributionsFetch(fetchAPI, setLoading, setPaymentDistributionsList, setPaginationProps);

      const operatorIDsFetchAPI = `operator?page=${1}&per_page=${50}`;
      const paymentMethodIDsFetchAPI = `payment-method?page=${1}&per_page=${50}`;

      fetchOperatorIDs(operatorIDsFetchAPI, setOperatorIDs);
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
    const searchKey = 'description';
    const searchValue = e.target.value;
    const fetchAPI = `transaction/operator-payment-methods?page=${
      page + 1
    }&per_page=${limit}&search_by=${searchKey}&search_term=${searchValue}`;

    paymentDistributionsFetch(fetchAPI, setLoading, setPaymentDistributionsList, setPaginationProps);
  };
  const exportAction = () => {
    setDownloading(true);

    axiosInstance
      .get(`transaction/operator-payment-methods/export`)
      .then(() => {
        setDownloading(false);
        navigate('/downloads');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const isDataNotFound = paymentDistributionsList.length === 0;

  // For Filter component

  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [operatorID, setOperatorID] = useState('');
  const [paymentMethodID, setPaymentMethodID] = useState('');

  const filterQueryAPI = `date_from=${dateFrom ? dateFrom.toISOString().split('T')[0] : ''}&date_to=${
    dateTo ? dateTo.toISOString().split('T')[0] : ''
  }&operator=${operatorID}&payment_method=${paymentMethodID}`;

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
      fieldName: 'operatorID',
      title: 'Select Operator',
      child: operatorIDs,
      valueSet: operatorID,
      callChangeFunc: setOperatorID,
    },
    {
      fieldName: 'paymentMethodID',
      title: 'Select Payment Method',
      child: paymentMethodIDs,
      valueSet: paymentMethodID,
      callChangeFunc: setPaymentMethodID,
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
          <Box>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: 2 }}>
              <Grid item md={downloading ? 9 : 9.5}>
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
                    placeholder="Search payment distribution"
                    variant="outlined"
                    color="success"
                    onChange={searchAction}
                  />
                </Box>
              </Grid>
              <Grid item md={downloading ? 3 : 2.5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  color="info"
                  variant="outlined"
                  startIcon={
                    downloading ? (
                      <CircularProgress color="info" size="1rem" sx={{ p: 0, m: 0, mr: 1 }} />
                    ) : (
                      <DownloadIcon fontSize="small" />
                    )
                  }
                  onClick={exportAction}
                >
                  {downloading ? 'Downloading' : 'Export'}
                </Button>
                <AnnualReportFilter
                  filterProps={filterProps}
                  fetchRootAPI={fetchRootAPI}
                  filterQueryAPI={filterQueryAPI}
                  setFetchAPI={setFetchAPI}
                />
              </Grid>
            </Grid>

            <Card sx={{ mx: 2, overflowX: 'auto' }}>
              <Table size="small">
                <TableHead sx={{ py: 2 }}>
                  <TableRow>
                    <StyledTableCell align="center">Operator Name</StyledTableCell>
                    <StyledTableCell align="center">Company Name</StyledTableCell>
                    <StyledTableCell align="center">Payment Method</StyledTableCell>
                    <StyledTableCell align="center">Total Amount</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paymentDistributionsList.map((paymentDistribution) => (
                    <StyledTableRow hover key={paymentDistribution.id}>
                      <TableCell>{paymentDistribution.operatorName}</TableCell>
                      <TableCell>{paymentDistribution.comName}</TableCell>
                      <TableCell>{paymentDistribution.payMethod}</TableCell>
                      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                        {paymentDistribution.totalAmount}
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
                {isDataNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
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
