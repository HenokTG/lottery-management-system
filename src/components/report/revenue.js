import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
import { theme } from '../../theme';
// componets
import RevenueSummary from './revenue-summary';
// icons
import { Search as SearchIcon } from '../../icons/search';
import { Download as DownloadIcon } from '../../icons/download';
import { Filter } from '../../icons/filter';
// context and modules
import { useGlobalContext } from '../../context';
import { revenuesFetch } from '../../_apiAxios/report';
// custom style
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
// ------------------------------------------------------------------------------------------

export const RevenueReportResults = () => {
  const { loggedIn } = useGlobalContext();

  const prevLocation = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(0);
  const [revenuesList, setRevenuesList] = useState([]);
  const [paginationProps, setPaginationProps] = useState(null);

  const countAll = paginationProps !== null ? paginationProps.per_page * paginationProps.total_pages : -1;

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(
    () => {
      if (loggedIn === false) {
        navigate(`/login?redirectTo=${prevLocation.pathname}`);
      }

      const fetchAPI = `transaction/bonus?page=${page + 1}&per_page=${limit}`;

      revenuesFetch(fetchAPI, setLoading, setRevenuesList, setPaginationProps);
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
    const fetchAPI = `transaction/bonus?page=${
      page + 1
    }&per_page=${limit}&search_by=${searchKey}&search_term=${searchValue}`;

    revenuesFetch(fetchAPI, setLoading, setRevenuesList, setPaginationProps);
  };

  const isDataNotFound = revenuesList.length === 0;

  return (
    <>
      <Card sx={{ mb: 3, pt: 3, pb: 1, px: 5, backgroundColor: theme.palette.neutral[100] }}>
        <Grid container columnSpacing={10} rowSpacing={1} sx={{ mb: 2 }}>
          <Grid item xl={3} lg={6} sm={6} xs={12}>
            <RevenueSummary badge="Sales" title="Total Sales" amount="$ 9,423,424,476.25" />
          </Grid>
          <Grid item xl={3} lg={6} sm={6} xs={12}>
            <RevenueSummary badge="tax" title="Total Tax" amount="$ 535,353,645.89" />
          </Grid>
        </Grid>
      </Card>
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
                      placeholder="Search revenue"
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
                      <StyledTableCell align="center">Operator Name</StyledTableCell>
                      <StyledTableCell align="center">Company Name</StyledTableCell>
                      <StyledTableCell align="center">Game Name</StyledTableCell>
                      <StyledTableCell align="center">Licence Catagory</StyledTableCell>
                      <StyledTableCell align="center">Total Sales</StyledTableCell>
                      <StyledTableCell align="center">Total Tax</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {revenuesList.map((revenue) => (
                      <StyledTableRow hover key={revenue.id}>
                        <TableCell>{revenue.operatorName}</TableCell>
                        <TableCell>{revenue.comName}</TableCell>

                        <TableCell>{revenue.gameName}</TableCell>
                        <TableCell>{revenue.licenceCatagory}</TableCell>
                        <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                          {revenue.sells}
                        </TableCell>
                        <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                          {revenue.tax}
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
    </>
  );
};
