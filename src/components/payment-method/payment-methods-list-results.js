import { format } from 'date-fns';
import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PerfectScrollbar from 'react-perfect-scrollbar';

// @mui
import {
  Box,
  Button,
  Container,
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
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

// components
import { AntSwitch } from '../auxilary/ant-switch';

// modules
import { axiosInstance } from '../../utils/axios';
import { fetchPaymentMethods } from '../../_apiAxios/payment-report';

// icons
import { Search as SearchIcon } from '../../icons/search';
import { Download as DownloadIcon } from '../../icons/download';
import { Edit } from '../../icons/edit';
import { Delete } from '../../icons/delete';

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

// --------------------------------------------------------------------------------------------------------------------

export const PaymentMethodList = ({ setModalKey }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(0);
  const [paymentMethodList, setPaymentMethodList] = useState([]);
  const [paginationProps, setPaginationProps] = useState(null);

  const countAll = paginationProps !== null ? paginationProps.per_page * paginationProps.total_pages : -1;

  const [searchQuery, setSearchQuery] = useState('');

  const [checkedId, setCheckedId] = useState('');
  const [deletedID, setDeletedID] = useState('');

  useEffect(
    () => {
      setLoading(true);

      const fetchAPI = `payment-method?page=${page + 1}&per_page=${limit}`;

      fetchPaymentMethods(fetchAPI, setLoading, setPaymentMethodList, setPaginationProps);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [limit, page, deletedID, checkedId]
  );

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const searchAction = (e) => {
    setSearchQuery(e.target.value);
    const searchKey = 'name';
    const searchValue = e.target.value;
    const fetchAPI = `payment-method?page=${
      page + 1
    }&per_page=${limit}&search_by=${searchKey}&search_term=${searchValue}`;

    fetchPaymentMethods(fetchAPI, setLoading, setPaymentMethodList, setPaginationProps);
  };

  const exportAction = () => {
    setDownloading(true);

    axiosInstance
      .get(`payment-method/export`)
      .then(() => {
        setDownloading(false);
        navigate('/app/downloads');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeActivation = (id, boolVal) => {
    const statusChangeAPI = boolVal ? `payment-method/${id}/disable` : `payment-method/${id}/enable`;
    axiosInstance
      .get(statusChangeAPI)
      .then(setCheckedId(`${id}-${boolVal}`))
      .catch((error) => {
        console.log(error);
      });
  };

  const handelDeletePaymentMethod = (id) => {
    axiosInstance
      .delete(`payment-method/${id}`)
      .then(setDeletedID(id))
      .catch((error) => {
        console.log(error);
      });
  };

  const isDataNotFound = paymentMethodList.length === 0;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Typography sx={{ ml: 4, mt: 1, mb: 3 }} variant="h4">
        Manage Payment Method
      </Typography>
      <Container maxWidth={false}>
        <Card>
          <PerfectScrollbar>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 5 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box>
                <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: 2 }}>
                  <Grid item md={downloading ? 8 : 8.5}>
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
                        placeholder="Search payment method"
                        variant="outlined"
                        color="success"
                        onChange={searchAction}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={downloading ? 4 : 3.5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
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

                    <Button color="info" variant="contained" onClick={() => setModalKey(true)} startIcon={<AddIcon />}>
                      Add Payment Method
                    </Button>
                  </Grid>
                </Grid>
                <Card sx={{ mx: 2, overflowX: 'auto' }}>
                  <Table size="small">
                    <TableHead sx={{ py: 2 }}>
                      <TableRow>
                        <StyledTableCell>Payment Method</StyledTableCell>
                        <StyledTableCell>Description</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell>Created By</StyledTableCell>
                        <StyledTableCell>Created On</StyledTableCell>
                        <StyledTableCell align="center">Actions</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paymentMethodList.map((paymentMethods) => (
                        <StyledTableRow hover key={paymentMethods.id}>
                          <TableCell>{paymentMethods.method}</TableCell>
                          <TableCell>{paymentMethods.description}</TableCell>
                          <TableCell align="center">
                            <Typography
                              variant="caption"
                              sx={{
                                p: 1,
                                pt: 0.75,
                                borderRadius: 1,
                                color: 'white',
                                bgcolor: paymentMethods.statusBool ? 'success.main' : 'error.main',
                              }}
                            >
                              {paymentMethods.status}
                            </Typography>
                          </TableCell>
                          <TableCell>{paymentMethods.createdBy}</TableCell>
                          <TableCell>{format(paymentMethods.createdAt, 'MMM dd, yyyy')}</TableCell>
                          <TableCell align="left" sx={{ p: 0 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                              <AntSwitch
                                checked={paymentMethods.statusBool}
                                onChange={() => changeActivation(paymentMethods.id, paymentMethods.statusBool)}
                                inputProps={{ 'aria-label': 'check status' }}
                                sx={{ mx: 1 }}
                              />
                              <Edit
                                onClick={() =>
                                  navigate(`/app/app-settings/payment-method/update/${paymentMethods.id}`, {
                                    replace: true,
                                  })
                                }
                                sx={{
                                  p: 0,
                                  m: 1,
                                  color: 'action',
                                  '&:hover': {
                                    color: 'success.light',
                                  },
                                }}
                              />

                              <Delete
                                onClick={() => handelDeletePaymentMethod(paymentMethods.id)}
                                sx={{
                                  p: 0,
                                  m: 1,
                                  ml: 2,
                                  color: 'action',
                                  '&:hover': {
                                    color: 'error.light',
                                  },
                                }}
                              />
                            </Box>
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
                                <strong style={{ color: 'success.light' }}>&quot;{searchQuery}&quot;</strong>. Try
                                checking for typos or internet connection.
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
      </Container>
    </Box>
  );
};

PaymentMethodList.propTypes = {
  setModalKey: PropTypes.func,
};
