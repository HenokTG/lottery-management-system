import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// forms validate
import { useFormik } from 'formik';
import * as Yup from 'yup';
// @mui
import {
  Card,
  CardContent,
  Avatar,
  CardActions,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  MenuItem,
  OutlinedInput,
  Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
// context and modules
import { axiosInstance } from '../../utils/axios';
import { fetchGameIDs, fetchCountryIDs, fetchStateIDs } from '../../_apiAxios/mainCreateFetches';

// multi select styles
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const CreateOperator = ({ setModalKey }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [gameIDs, setGameIDs] = useState([{ id: -1, gameName: 'No game to assign' }]);
  const [countryIDs, setCountryIDs] = useState([{ id: -1, countryName: 'No counrty to assign' }]);
  const [stateIDs, setStateIDs] = useState([{ id: -1, stateName: 'No state to assign' }]);

  useEffect(
    () => {
      const gameFetchAPI = `game?page=${1}&per_page=${25}`;
      const countryFetchAPI = `country?page=${1}&per_page=${25}`;
      const stateAPI = `state?page=${1}&per_page=${25}`;

      fetchGameIDs(gameFetchAPI, setGameIDs);
      fetchCountryIDs(countryFetchAPI, setCountryIDs);
      fetchStateIDs(stateAPI, setStateIDs);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [assignedGameList, setAssignedGameList] = useState([]);

  const handleMultiSelect = (event) => {
    const {
      target: { value },
    } = event;
    setAssignedGameList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      operatorName: '',
      companyName: '',
      about: '',
      address: '',
      country: '',
      region: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      firstName: Yup.string(),
      lastName: Yup.string(),
      phoneNumber: Yup.number(),
      operatorName: Yup.string(),
      companyName: Yup.string(),
      about: Yup.string(),
      address: Yup.string(),
      country: Yup.string(),
      region: Yup.string(),
    }),
    onSubmit: (values, helpers) => {
      const postData = {
        // email: values.email,
        // first_name: values.firstName,
        // last_name: values.lastName,
        // phone: values.phoneNumber,
        // assigned_game: assignedGameList,
        name: values.operatorName,
        company_name: values.companyName,
        description: values.about,
        address: values.address,
        country: values.country,
        state: values.region,
        is_active: true,
      };

      axiosInstance
        .post(`operator`, postData)
        .then((res) => {
          setModalKey(false);
          // navigate('/app/operators', { replace: true });
        })
        .catch((error) => {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: error.message });
          helpers.setSubmitting(false);
          console.log(error);
        });
    },
  });

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Typography sx={{ ml: 4, mt: 1, mb: 3 }} variant="h4">
        Create Operator
      </Typography>
      <Container maxWidth="lg" sx={{ m: 0 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item lg={12} md={6} xs={12}>
              <Card sx={{ py: 3, px: 16 }}>
                <Typography
                  align="center"
                  variant="body1"
                  color={theme.palette.info.main}
                  sx={{
                    pb: 3,
                  }}
                >
                  Enter Operator Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item md={6}>
                    <TextField
                      error={Boolean(formik.touched.companyName && formik.errors.companyName)}
                      fullWidth
                      helperText={formik.touched.companyName && formik.errors.companyName}
                      label="Company Name"
                      name="companyName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      color="success"
                      value={formik.values.companyName}
                      size="small"
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      error={Boolean(formik.touched.operatorName && formik.errors.operatorName)}
                      fullWidth
                      helperText={formik.touched.operatorName && formik.errors.operatorName}
                      label="Operator Name"
                      name="operatorName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      color="success"
                      value={formik.values.operatorName}
                      size="small"
                    />
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      error={Boolean(formik.touched.address && formik.errors.address)}
                      fullWidth
                      helperText={formik.touched.address && formik.errors.address}
                      label="Address"
                      name="address"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      color="success"
                      value={formik.values.address}
                      size="small"
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      error={Boolean(formik.touched.country && formik.errors.country)}
                      fullWidth
                      helperText={formik.touched.country && formik.errors.country}
                      label="Country"
                      name="country"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      color="success"
                      value={formik.values.country}
                      size="small"
                      select
                    >
                      {countryIDs.map((countryId) => (
                        <MenuItem key={`${countryId.id}-${countryId.countryName}`} value={countryId.id}>
                          {countryId.countryName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      error={Boolean(formik.touched.region && formik.errors.region)}
                      fullWidth
                      helperText={formik.touched.region && formik.errors.region}
                      label="Region"
                      name="region"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      color="success"
                      value={formik.values.region}
                      size="small"
                      select
                    >
                      {stateIDs.map((stateId) => (
                        <MenuItem key={`${stateId.id}-${stateId.stateName}`} value={stateId.id}>
                          {stateId.stateName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      error={Boolean(formik.touched.assignedGame && formik.errors.assignedGame)}
                      fullWidth
                      helperText={formik.touched.assignedGame && formik.errors.assignedGame}
                      label="Assign Game"
                      name="assignedGame"
                      value={assignedGameList}
                      onBlur={formik.handleBlur}
                      type="text"
                      color="success"
                      size="small"
                      select
                      SelectProps={{
                        multiple: true,
                        value: assignedGameList,
                        onChange: handleMultiSelect,
                        input: <OutlinedInput id="select-multiple-chip" label="Chip" />,
                        renderValue: (selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        ),
                        menuprops: { MenuProps },
                      }}
                    >
                      {gameIDs.map((game) => (
                        <MenuItem key={`${game.id}-${game.gameName}`} value={game.id}>
                          {game.gameName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      error={Boolean(formik.touched.about && formik.errors.about)}
                      fullWidth
                      helperText={formik.touched.about && formik.errors.about}
                      label="About Operator"
                      name="about"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      color="success"
                      value={formik.values.about}
                      multiline
                      rows={3}
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <Card>
                <CardContent sx={{ p: 1.75 }}>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Avatar
                      src="/static/images/avatars/avatar_1.png"
                      sx={{
                        height: 64,
                        mb: 1,
                        width: 64,
                      }}
                    />
                    <Typography color="textPrimary" gutterBottom variant="h5">
                      John Doe
                    </Typography>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button color="primary" fullWidth variant="text">
                    Upload Picture
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item lg={9} md={6} xs={12}>
              <Card sx={{ p: 3 }}>
                <Typography
                  align="center"
                  variant="body1"
                  color={theme.palette.info.main}
                  sx={{
                    pb: 3,
                  }}
                >
                  Contact Person Detail
                </Typography>
                <Grid container spacing={3}>
                  <Grid item md={6}>
                    <TextField
                      error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                      fullWidth
                      helperText={formik.touched.firstName && formik.errors.firstName}
                      label="First Name"
                      name="firstName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      color="success"
                      size="small"
                      value={formik.values.firstName}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                      fullWidth
                      helperText={formik.touched.lastName && formik.errors.lastName}
                      label="Last Name"
                      name="lastName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      color="success"
                      size="small"
                      value={formik.values.lastName}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      error={Boolean(formik.touched.email && formik.errors.email)}
                      fullWidth
                      helperText={formik.touched.email && formik.errors.email}
                      label="Email Address"
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="email"
                      color="success"
                      size="small"
                      value={formik.values.email}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                      fullWidth
                      helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                      label="Phone Number"
                      name="phoneNumber"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="number"
                      color="success"
                      size="small"
                      value={formik.values.phoneNumber}
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
          <Card sx={{ py: 2, px: 10, mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={() => window.location.reload()}
              color="error"
              disabled={formik.isSubmitting}
              fullWidth
              size="large"
              variant="contained"
              sx={{ width: '45%' }}
            >
              Cancel
            </Button>
            <Button
              color="secondary"
              disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ width: '45%' }}
            >
              Create Operator
            </Button>
          </Card>
        </form>
      </Container>
    </Box>
  );
};

CreateOperator.propTypes = {
  setModalKey: PropTypes.func,
};
