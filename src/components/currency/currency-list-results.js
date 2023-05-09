import { format } from 'date-fns';
import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
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
// modules
import { currencyFetch } from '../../_apiAxios/app-config';
// icons
import { Search as SearchIcon } from '../../icons/search';
import { Download as DownloadIcon } from '../../icons/download';
import { Edit } from '../../icons/edit';
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
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const CurrencyList = ({ setModalKey }) => {
  const [loading, setLoading] = useState(true);

  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(0);
  const [currencyList, setCurrencyList] = useState([]);
  const [paginationProps, setPaginationProps] = useState(null);

  const countAll = paginationProps !== null ? paginationProps.per_page * paginationProps.total_pages : -1;

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(
    () => {
      const fetchAPI = `currency?page=${page + 1}&per_page=${limit}`;

      currencyFetch(fetchAPI, setLoading, setCurrencyList, setPaginationProps);
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
    const searchKey = 'name';
    const searchValue = e.target.value;
    const fetchAPI = `currency?page=${page + 1}&per_page=${limit}&search_by=${searchKey}&search_term=${searchValue}`;

    currencyFetch(fetchAPI, setLoading, setCurrencyList, setPaginationProps);
  };

  const isDataNotFound = currencyList.length === 0;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Typography sx={{ ml: 4, mt: 1, mb: 3 }} variant="h4">
        Manage Currency
      </Typography>
      <Container maxWidth={false}>
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
                        placeholder="Search currency"
                        variant="outlined"
                        color="success"
                        onChange={searchAction}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button color="info" variant="outlined" startIcon={<DownloadIcon fontSize="small" />}>
                      Export
                    </Button>

                    <Button color="info" variant="contained" onClick={() => setModalKey(true)} startIcon={<AddIcon />}>
                      Add Currency
                    </Button>
                  </Grid>
                </Grid>
                <Card sx={{ mx: 2 }}>
                  <Table size="small">
                    <TableHead sx={{ py: 2 }}>
                      <TableRow>
                        <StyledTableCell>Currency Name</StyledTableCell>
                        <StyledTableCell>Currency Code</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell>Created By</StyledTableCell>
                        <StyledTableCell>Created On</StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currencyList.map((currency) => (
                        <StyledTableRow
                          hover
                          key={currency.id}
                          sx={{
                            backgroundColor: currency.status === 'Active' ? '#43C6B748' : '#DA686848',
                          }}
                        >
                          <TableCell>{currency.name}</TableCell>
                          <TableCell>{currency.code}</TableCell>

                          <TableCell>{currency.status}</TableCell>
                          <TableCell>{currency.createdBy}</TableCell>
                          <TableCell>{format(currency.createdAt, 'MMM dd, yyyy')}</TableCell>
                          <TableCell align="center">
                            <Button onClick={() => setModalKey(true)}>
                              <Edit
                                fontSize="small"
                                sx={{
                                  p: 0,
                                  color: 'black',
                                  '&:hover': {
                                    color: 'lightseagreen',
                                  },
                                }}
                              />
                            </Button>
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

CurrencyList.propTypes = {
  setModalKey: PropTypes.func,
};