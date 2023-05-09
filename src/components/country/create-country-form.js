import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';

// forms validate
import { useFormik } from 'formik';
import * as Yup from 'yup';
// @mui
import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// context and modules
import { axiosInstance } from '../../utils/axios';

export const CreateCountry = ({ setModalKey }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      countryName: '',
      countryCode: '',
    },
    validationSchema: Yup.object({
      countryName: Yup.string().max(255).required('Country name is required'),
      countryCode: Yup.string().max(255).required('Country code is required'),
    }),
    onSubmit: (values, helpers) => {
      const postData = {
        name: values.countryName,
        code: values.countryCode,
        is_active: true,
      };

      axiosInstance
        .post(`country`, postData)
        .then((res) => {
          setModalKey(false);
          // navigate('/app/licence-catagories', { replace: true });
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
          Add Country
        </Typography>
        <Card sx={{ display: 'flex', justifyContent: 'center', mx: 3, p: 3 }}>
          <form onSubmit={formik.handleSubmit}>
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
                Enter Country Details
              </Typography>
            </Box>
            <Grid container spacing={2} minWidth="600px">
              <Grid item md={8}>
                <TextField
                  error={Boolean(formik.touched.countryName && formik.errors.countryName)}
                  fullWidth
                  helperText={formik.touched.countryName && formik.errors.countryName}
                  label="Country Name"
                  name="countryName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  color="success"
                  value={formik.values.countryName}
                  size="medium"
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  error={Boolean(formik.touched.countryCode && formik.errors.countryCode)}
                  fullWidth
                  helperText={formik.touched.countryCode && formik.errors.countryCode}
                  label="Country Code"
                  name="countryCode"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  color="success"
                  value={formik.values.countryCode}
                  size="medium"
                />
              </Grid>
            </Grid>

            <Box sx={{ py: 2, mt: 2, display: 'flex', justifyContent: 'space-between' }}>
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
                Add Country
              </Button>
            </Box>
          </form>
        </Card>
      </Box>
    </>
  );
};

CreateCountry.propTypes = {
  setModalKey: PropTypes.func,
};
