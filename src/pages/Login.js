import axios from 'axios';

import { useNavigate, useLocation } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
// @mui
import { Box, Button, Container, TextField, Typography } from '@mui/material';
// components
import Page from '../components/layout/Page';
// context and modules
import { axiosInstance } from '../utils/axios';
import useAuth from '../hooks/useAuth';

// -----------------------------------------------------------------------------------------------

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.redirectTo?.pathname || '/dashboard';

  const { setAuth } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),

    onSubmit: (values, helpers) => {
      const postData = {
        email: values.email,
        password: values.password,
      };

      const baseURL = 'https://hslms-dev-api-dot-duruj-351315.uc.r.appspot.com/api/v1/';

      axios
        .post(`${baseURL}auth/login`, postData)
        .then((res) => {
          localStorage.setItem('access_token', res.data.access_token);
          localStorage.setItem('refresh_token', res.data.refresh_token);
          axiosInstance.defaults.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;

          const role = [res?.data?.role];

          setAuth({ userEmail: postData.email, role });

          navigate(redirectTo, { replace: true });
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
    <Page title="Login">
      <Box
        component="main"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
          minHeight: '80vh',
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
            </Box>

            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                login with email address
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="info"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </Page>
  );
};

export default Login;
