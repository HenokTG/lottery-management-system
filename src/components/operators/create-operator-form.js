import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// context and modules
import { axiosInstance } from '../../utils/axios';
import { fetchGameIDs, fetchCountryIDs, fetchStateIDs } from '../../_apiAxios/mainCreateFetches';
import { operatorUpdateFetch } from '../../_apiAxios/mainFetches';

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

// -----------------------------------------------------------------------------------------------------------------------

const CreateOperator = ({ setModalKey }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [gameIDs, setGameIDs] = useState([{ id: -1, name: 'No game to assign' }]);
  const [countryIDs, setCountryIDs] = useState([{ id: -1, name: 'No counrty to assign' }]);
  const [stateIDs, setStateIDs] = useState([{ id: -1, name: 'No region to assign' }]);

  const [assignedGameList, setAssignedGameList] = useState([]);

  const [intialOperatorData, setIntialOperatorData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    operatorName: '',
    companyName: '',
    website: '',
    about: '',
    address: '',
    country: '',
    region: '',
  });

  useEffect(
    () => {
      const gameFetchAPI = `game?page=${1}&per_page=${25}`;
      const countryFetchAPI = `country?page=${1}&per_page=${25}`;
      const stateAPI = `state?page=${1}&per_page=${25}`;

      fetchGameIDs(gameFetchAPI, setGameIDs);
      fetchCountryIDs(countryFetchAPI, setCountryIDs);
      fetchStateIDs(stateAPI, setStateIDs);

      if (id !== undefined) {
        const updateOperatorAPI = `operator/${id}`;
        operatorUpdateFetch(updateOperatorAPI, setIntialOperatorData, setLoading);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );

  const handleMultiSelect = (event) => {
    const {
      target: { value },
    } = event;

    console.log('Game_list', value);
    setAssignedGameList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleFormCancel = () => {
    if (id === undefined) {
      setModalKey(false);
    } else {
      navigate('/operators', { replace: true });
    }
  };

  const formik = useFormik({
    initialValues: intialOperatorData,
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      firstName: Yup.string().max(255).required('First name is required'),
      lastName: Yup.string().max(255).required('Last name is required'),
      phoneNumber: Yup.number().required('Phone number is required'),
      operatorName: Yup.string().max(255).required('Operator name is required'),
      companyName: Yup.string().max(255).required('Company name is required'),
      website: Yup.string().max(255).required('Website is required'),
      about: Yup.string(),
      address: Yup.string().max(255).required('Address is required'),
      country: Yup.string().max(255).required('Select country'),
      region: Yup.string().max(255).required('Select region'),
    }),
    onSubmit: (values, helpers) => {
      const postData = {
        operator_games: assignedGameList.map((game) => game.id),
        name: values.operatorName,
        company_name: values.companyName,
        website: values.website,
        description: values.about,
        address: values.address,
        logo: 'https://cdn-icons-png.flaticon.com/512/3143/3143160.png',
        country: values.country,
        state: values.region,
        contact_person: {
          email: values.email,
          first_name: values.firstName,
          last_name: values.lastName,
          phone: values.phoneNumber,
        },
      };

      console.log(postData.assigned_games);

      if (id === undefined) {
        postData.is_active = true;

        axiosInstance
          .post('operator', postData)
          .then(() => {
            setModalKey(false);
          })
          .catch((error) => {
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: error.message });
            helpers.setSubmitting(false);
            console.log(error);
          });
      } else {
        axiosInstance
          .patch(`operator/${id}`, postData)
          .then(() => {
            navigate('/operators', { replace: true });
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
        {id === undefined ? 'Create' : 'Update'} Operator
      </Typography>
      <Container maxWidth="lg" sx={{ m: 0 }}>
        {loading && id !== undefined ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
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
                    {id === undefined ? 'Enter' : 'Edit'} Operator Details
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
                    <Grid item md={6}>
                      <TextField
                        error={Boolean(formik.touched.website && formik.errors.website)}
                        fullWidth
                        helperText={formik.touched.website && formik.errors.website}
                        label="Website"
                        name="website"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        color="success"
                        value={formik.values.website}
                        size="small"
                      />
                    </Grid>
                    <Grid item md={6}>
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
                          <MenuItem key={`${countryId.id}-${countryId.name}`} value={countryId.id}>
                            {countryId.name}
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
                          <MenuItem key={`${stateId.id}-${stateId.name}`} value={stateId.id}>
                            {stateId.name}
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
                        onBlur={formik.handleBlur}
                        type="text"
                        color="success"
                        size="small"
                        select
                        SelectProps={{
                          multiple: true,
                          value: assignedGameList,
                          onChange: handleMultiSelect,
                          renderValue: (selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Chip key={value.id} label={value.name} />
                              ))}
                            </Box>
                          ),
                          menuprops: { MenuProps },
                        }}
                      >
                        {gameIDs.map((game) => (
                          <MenuItem key={`${game.id}-${game.name}`} value={game}>
                            {game.name}
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
                onClick={handleFormCancel}
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
                color={id === undefined ? 'secondary' : 'warning'}
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ width: '45%' }}
              >
                {id === undefined ? 'Create' : 'Update'} Operator
              </Button>
            </Card>
          </form>
        )}
      </Container>
    </Box>
  );
};

CreateOperator.propTypes = {
  setModalKey: PropTypes.func,
};

export default CreateOperator;
