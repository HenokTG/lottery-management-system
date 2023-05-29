import { format } from 'date-fns';

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import PerfectScrollbar from 'react-perfect-scrollbar';

// @mui
import {
  Box,
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
import { useGlobalContext } from '../context';
import { activityLogFetch } from '../_apiAxios/activity-log';

// icons
import { Search as SearchIcon } from '../icons/search';

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

export const ActivityLogResults = () => {
  const { loggedIn } = useGlobalContext();

  const prevLocation = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(0);
  const [activityList, setActivityList] = useState([]);
  const [paginationProps, setPaginationProps] = useState(null);

  const countAll = paginationProps !== null ? paginationProps.per_page * paginationProps.total_pages : -1;

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(
    () => {
      if (loggedIn === false) {
        navigate(`/login?redirectTo=${prevLocation.pathname}`);
      }

      const fetchAPI = `activity-log?page=${page + 1}&per_page=${limit}`;

      activityLogFetch(fetchAPI, setLoading, setActivityList, setPaginationProps);
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

    const searchKey = 'description';
    const searchValue = e.target.value;
    const fetchAPI = `activity-log?page=${
      page + 1
    }&per_page=${limit}&search_by=${searchKey}&search_term=${searchValue}`;

    activityLogFetch(fetchAPI, setLoading, setActivityList, setPaginationProps);
  };

  const isDataNotFound = activityList.length === 0;

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
              <Grid item md={10}>
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
                    placeholder="Search app setting"
                    variant="outlined"
                    color="success"
                    onChange={searchAction}
                  />
                </Box>
              </Grid>
            </Grid>
            <Card sx={{ mx: 2, overflowX: 'auto' }}>
              <Table size="small">
                <TableHead sx={{ py: 2 }}>
                  <TableRow>
                    <StyledTableCell>Module</StyledTableCell>
                    <StyledTableCell>Activity Type</StyledTableCell>
                    <StyledTableCell>Description</StyledTableCell>
                    <StyledTableCell> User Name</StyledTableCell>
                    <StyledTableCell>User Role</StyledTableCell>
                    <StyledTableCell>Created On</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activityList.map((activity) => (
                    <StyledTableRow hover key={activity.id}>
                      <TableCell>{activity.module}</TableCell>
                      <TableCell>{activity.type}</TableCell>
                      <TableCell>{activity.description}</TableCell>
                      <TableCell>{activity.createdBy}</TableCell>
                      <TableCell>{activity.role}</TableCell>
                      <TableCell>{format(activity.createdAt, 'MMM dd, yyyy')}</TableCell>
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
