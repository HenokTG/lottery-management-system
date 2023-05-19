import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

// forms validate
import { useFormik } from 'formik';
import * as Yup from 'yup';

// @mui
import { Box, Button, Card, Divider, Grid, TextField, Typography, MenuItem, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// context and modules
import { useGlobalContext } from '../../context';
import { axiosInstance } from '../../utils/axios';
import { fetchRoleIDs } from '../../_apiAxios/modelCreateFetches';
import { userUpdateFetch } from '../../_apiAxios/management';

// -----------------------------------------------------------------------------------------------------------------------

const CreateUser = ({ setModalKey }) => {
  const theme = useTheme();

  const navigate = useNavigate();
  const prevLocation = useLocation();

  const { id } = useParams();

  const { loggedIn } = useGlobalContext();

  const [loading, setLoading] = useState(true);

  const [roleIDs, setRoleIDs] = useState([{ id: -1, name: 'No role to assign' }]);

  const [intialUserData, setIntialUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    userRole: '',
    // operator: '',
  });

  useEffect(
    () => {
      const roleFetchAPI = `role?page=${1}&per_page=${25}`;

      fetchRoleIDs(roleFetchAPI, setRoleIDs);

      if (id !== undefined) {
        if (loggedIn === false) {
          navigate(`/login?redirectTo=${prevLocation.pathname}`);
        }

        const updateOperatorAPI = `user/${id}`;
        userUpdateFetch(updateOperatorAPI, setIntialUserData, setLoading);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleFormCancel = () => {
    if (id === undefined) {
      setModalKey(false);
    } else {
      navigate('/app/management/user-management', { replace: true });
    }
  };

  const formik = useFormik({
    initialValues: intialUserData,
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string().max(255).required('First name is required'),
      lastName: Yup.string().max(255).required('Last name is required'),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      phoneNumber: Yup.string().max(255).required('Phone number is required'),
      userRole: Yup.string().max(255).required('Please select user role'),
      // operator: Yup.string().max(255).required('Please assign operator for the user'),
    }),
    onSubmit: (values, helpers) => {
      const postData = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        phone: values.phoneNumber,
        role: values.userRole,
        // operator: values.operator,
      };

      if (id === undefined) {
        postData.is_active = true;
        postData.password = '12345678';

        axiosInstance
          .post('user', postData)
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
          .patch(`user/${id}`, postData)
          .then(() => {
            navigate('/app/management/user-management', { replace: true });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Typography sx={{ ml: 4, mt: 1, mb: 3 }} variant="h4">
          {id === undefined ? 'Create' : 'Update'} User
        </Typography>
        <Card sx={{ display: 'flex', justifyContent: 'center', mx: 3, p: 3 }}>
          {loading && id !== undefined ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 10 }}>
              <CircularProgress />
            </Box>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  py: 1,
                }}
              >
                <Typography
                  align="center"
                  color={theme.palette.info.main}
                  variant="body1"
                  sx={{
                    pb: 2,
                  }}
                >
                  {id === undefined ? 'Enter' : 'Edit'} Basic Detail About the User
                </Typography>
              </Box>
              <Grid container spacing={3} sx={{ px: 15 }}>
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
                    value={formik.values.phoneNumber}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ backgroundColor: 'black', my: 3 }} />
              <Box
                sx={{
                  pb: 1,
                }}
              >
                <Typography
                  align="center"
                  color={theme.palette.info.main}
                  variant="body1"
                  sx={{
                    pb: 2,
                  }}
                >
                  {id === undefined ? 'Select' : 'Change'} the User Role
                </Typography>
                {/* and Assigned Operator  */}
              </Box>
              <Grid container spacing={2} sx={{ px: 15 }}>
                <Grid item md={6}>
                  <TextField
                    error={Boolean(formik.touched.userRole && formik.errors.userRole)}
                    fullWidth
                    helperText={formik.touched.userRole && formik.errors.userRole}
                    label="Role"
                    name="userRole"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    color="success"
                    value={formik.values.userRole}
                    select
                  >
                    {roleIDs.map((roleId) => (
                      <MenuItem key={`${roleId.id}-${roleId.name}`} value={roleId.id}>
                        {roleId.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <Box sx={{ py: 2, px: 15, mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  onClick={handleFormCancel}
                  color="error"
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  variant="contained"
                  sx={{ width: '48%' }}
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
                  sx={{ width: '48%' }}
                >
                  {id === undefined ? 'Create' : 'Update'} User
                </Button>
              </Box>
            </form>
          )}
        </Card>
      </Box>
    </>
  );
};

CreateUser.propTypes = {
  setModalKey: PropTypes.func,
};

export default CreateUser;
