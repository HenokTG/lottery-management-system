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
  Pagination,
  Avatar,
  Divider,
  Stack,
  CardContent,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// modules
import { fetchGames } from '../../_apiAxios/mainFetches';
// icons
import { Search as SearchIcon } from '../../icons/search';
import { Download as DownloadIcon } from '../../icons/download';
import { Edit } from '../../icons/edit';

export const GameListResults = ({ setModalKey }) => {
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [gamesList, setGamesList] = useState([]);
  const [paginationProps, setPaginationProps] = useState(null);

  const countAll = paginationProps !== null ? paginationProps.total_pages : -1;

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(
    () => {
      const fetchAPI = `game?page=${page}&per_page=${9}`;

      fetchGames(fetchAPI, setLoading, setGamesList, setPaginationProps);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const searchAction = (e) => {
    setSearchQuery(e.target.value);
    const searchKey = 'name';
    const searchValue = e.target.value;
    const fetchAPI = `game?page=${page}&per_page=${9}&search_by=${searchKey}&search_term=${searchValue}`;

    fetchGames(fetchAPI, setLoading, setGamesList, setPaginationProps);
  };

  const isDataNotFound = gamesList.length === 0;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Typography sx={{ ml: 4, mt: 1, mb: 3 }} variant="h4">
        Manage Games
      </Typography>
      <Container maxWidth={false}>
        <PerfectScrollbar sx={{ minWidth: 1050 }}>
          <Card>
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
                    placeholder="Search game"
                    variant="outlined"
                    color="success"
                    onChange={searchAction}
                  />
                </Box>
              </Grid>
              <Grid item md={2.75} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button color="info" variant="outlined" startIcon={<DownloadIcon fontSize="small" />}>
                  Export
                </Button>

                <Button color="info" variant="contained" onClick={() => setModalKey(true)} startIcon={<AddIcon />}>
                  Add Game
                </Button>
              </Grid>
            </Grid>
          </Card>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 10 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                {gamesList.map((game) => (
                  <Grid item xs={12} md={6} lg={4} key={game.id}>
                    <Card>
                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            pb: 3,
                          }}
                        >
                          <Avatar
                            src={game.logo}
                            variant="square"
                            sx={{
                              height: 60,
                              width: 60,
                            }}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography
                            align="center"
                            gutterBottom
                            variant="h5"
                            color={game.status === 'Active' ? 'success.main' : 'error.main'}
                          >
                            {game.gameName}
                          </Typography>
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
                        </Box>
                        <Typography align="center" variant="subtitle2">
                          {game.licenceCatagory}
                        </Typography>
                        <Typography align="center" variant="body2" sx={{ mt: 2, height: '3rem' }}>
                          {game.description}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 2,
                          }}
                        >
                          <Typography>Sales Total</Typography>
                          <Typography gutterBottom variant="h6" color="success.dark">
                            {game.totalSales}
                          </Typography>
                        </Box>
                      </CardContent>
                      <Box sx={{ flexGrow: 1 }} />
                      <Divider />
                      <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                        spacing={2}
                        sx={{ p: 2 }}
                      >
                        <Stack alignItems="center" direction="row" spacing={1}>
                          <Typography color="text.secondary" display="inline" variant="body2">
                            Created at {format(game.createdAt, 'MMM dd, yyyy')}
                          </Typography>
                        </Stack>
                        <Stack alignItems="center" direction="row" spacing={1}>
                          <Typography
                            display="inline"
                            variant="body2"
                            color={game.status === 'Active' ? 'info.main' : 'warning.main'}
                          >
                            {game.noOperators} Operators
                          </Typography>
                        </Stack>
                      </Stack>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              {isDataNotFound && (
                <Box sx={{ pt: 6 }}>
                  <Typography gutterBottom align="center" variant="subtitle1" color="error.main">
                    No data fetched!
                  </Typography>
                  <Typography variant="body2" align="center" color="warning.main">
                    No results found for &nbsp;
                    <strong style={{ color: 'success.light' }}>&quot;{searchQuery}&quot;</strong>. Try checking for
                    typos or internet connection.
                  </Typography>
                </Box>
              )}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 5,
                }}
              >
                <Pagination
                  count={countAll}
                  boundaryCount={2}
                  size="large"
                  variant="outlined"
                  color="secondary"
                  showFirstButton
                  showLastButton
                  page={page}
                  onChange={handlePageChange}
                />
              </Box>
            </>
          )}
        </PerfectScrollbar>
      </Container>
    </Box>
  );
};

GameListResults.propTypes = {
  setModalKey: PropTypes.func,
};
