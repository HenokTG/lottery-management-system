import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// forms validate
import { useFormik } from 'formik';
import * as Yup from 'yup';
// @mui
import { Box, Button, Card, Divider, Grid, TextField, Typography, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// context and modules
import { axiosInstance } from '../../utils/axios';
import { fetchRoleIDs } from '../../_apiAxios/modelCreateFetches';

export const CreateUser = ({ setModalKey }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [roleIDs, setRoleIDs] = useState([{ id: -1, roleName: 'No role to assign' }]);

  useEffect(
    () => {
      const roleFetchAPI = `role?page=${1}&per_page=${25}`;

      fetchRoleIDs(roleFetchAPI, setRoleIDs);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      userRole: '',
      operator: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(255).required('First name is required'),
      lastName: Yup.string().max(255).required('Last name is required'),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      phoneNumber: Yup.string().max(255).required('Phone number is required'),
      userRole: Yup.string().max(255).required('Please select user role'),
      operator: Yup.string().max(255).required('Please assign operator for the user'),
    }),
    onSubmit: (values, helpers) => {
      const postData = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        phone: values.phoneNumber,
        role: values.userRole,
        // operator: values.operator,
        password: '12345678',
        is_active: true,
      };

      axiosInstance
        .post(`user`, postData)
        .then((res) => {
          setModalKey(false);
          // navigate('/app/games', { replace: true });
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
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Typography sx={{ ml: 4, mt: 1, mb: 3 }} variant="h4">
          Create User
        </Typography>
        <Card sx={{ display: 'flex', justifyContent: 'center', mx: 3, p: 3 }}>
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
                Basic Detail About the User
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
                Select the User Role
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
                    <MenuItem key={`${roleId.id}-${roleId.roleName}`} value={roleId.id}>
                      {roleId.roleName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Box sx={{ py: 2, px: 15, mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                onClick={() => window.location.reload()}
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
                color="secondary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ width: '48%' }}
              >
                Create User
              </Button>
            </Box>
          </form>
        </Card>
      </Box>
    </>
  );
};

CreateUser.propTypes = {
  setModalKey: PropTypes.func,
};
