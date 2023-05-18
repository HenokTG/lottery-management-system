import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PerfectScrollbar from 'react-perfect-scrollbar';

// @mui
import {
  Avatar,
  Box,
  Container,
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
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

// modules
import { axiosInstance } from '../../utils/axios';
import { getInitials } from '../../utils/get-initials';
import { operatorsFetch } from '../../_apiAxios/mainFetches';

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

export const OperatorListResults = ({ setModalKey }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(0);
  const [operatorsList, setOperatorsList] = useState([]);
  const [paginationProps, setPaginationProps] = useState(null);

  const countAll = paginationProps !== null ? paginationProps.per_page * paginationProps.total_pages : -1;

  const [searchQuery, setSearchQuery] = useState('');

  const [deletedID, setDeletedID] = useState('');

  useEffect(
    () => {
      const fetchAPI = `operator?page=${page + 1}&per_page=${limit}`;

      operatorsFetch(fetchAPI, setLoading, setOperatorsList, setPaginationProps);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [limit, page, deletedID]
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
    const fetchAPI = `operator?page=${page + 1}&per_page=${limit}&search_by=${searchKey}&search_term=${searchValue}`;

    operatorsFetch(fetchAPI, setLoading, setOperatorsList, setPaginationProps);
  };

  const handelDeleteOperator = (id) => {
    axiosInstance
      .delete(`operator/${id}`)
      .then(setDeletedID(id))
      .catch((error) => {
        console.log(error);
      });
  };

  const isDataNotFound = operatorsList.length === 0;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Typography sx={{ ml: 4, mt: 1, mb: 3 }} variant="h4">
        Manage Operators
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
                  <Grid item md={9}>
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
                        placeholder="Search operator"
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
                      Add Operator
                    </Button>
                  </Grid>
                </Grid>
                <Card sx={{ mx: 2 }}>
                  <Table size="small">
                    <TableHead sx={{ py: 2 }}>
                      <TableRow>
                        <StyledTableCell>Operator Name</StyledTableCell>
                        <StyledTableCell>Company Name</StyledTableCell>
                        <StyledTableCell>Contact Person</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Phone Number</StyledTableCell>
                        <StyledTableCell>Location</StyledTableCell>
                        <StyledTableCell>No. of Game Catagories</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell>Created By</StyledTableCell>
                        <StyledTableCell>Created ON</StyledTableCell>
                        <StyledTableCell align="center">Actions</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {operatorsList.map((operator) => (
                        <StyledTableRow hover key={operator.id}>
                          <TableCell>
                            <Box
                              sx={{
                                alignItems: 'center',
                                display: 'flex',
                              }}
                            >
                              <Avatar src={operator.avatarUrl} sx={{ mr: 2 }}>
                                {getInitials(operator.name)}
                              </Avatar>
                              <Typography color="textPrimary" variant="body1">
                                {operator.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{operator.comName}</TableCell>
                          <TableCell sx={{ fontSize: 12 }}>{operator.contactName}</TableCell>
                          <TableCell sx={{ fontSize: 12 }}>{operator.email}</TableCell>
                          <TableCell sx={{ fontSize: 12 }}>{operator.phone}</TableCell>
                          <TableCell sx={{ fontSize: 12 }}>{operator.address}</TableCell>
                          <TableCell sx={{ fontSize: 12 }} align="center">
                            {operator.noGameCatagory}
                          </TableCell>
                          <TableCell sx={{ fontSize: 12 }}>{operator.status}</TableCell>
                          <TableCell sx={{ fontSize: 12 }}>{operator.createdBy}</TableCell>
                          <TableCell sx={{ fontSize: 12 }}>{format(operator.createdAt, 'MMM dd, yyyy')}</TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Edit
                                onClick={() => navigate(`/app/operators/update/${operator.id}`, { replace: true })}
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
                                onClick={() => handelDeleteOperator(operator.id)}
                                sx={{
                                  p: 0,
                                  m: 1,
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
                          <TableCell align="center" colSpan={10} sx={{ py: 3 }}>
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

OperatorListResults.propTypes = {
  setModalKey: PropTypes.func,
};
