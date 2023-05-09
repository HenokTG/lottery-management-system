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

export const CreateCurrency = ({ setModalKey }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      currencyName: '',
      currencyCode: '',
    },
    validationSchema: Yup.object({
      currencyName: Yup.string().max(255).required('Currency name is required'),
      currencyCode: Yup.string().max(255).required('Currency code is required'),
    }),
    onSubmit: (values, helpers) => {
      const postData = {
        name: values.currencyName,
        code: values.currencyCode,
        is_active: true,
      };

      axiosInstance
        .post(`currency`, postData)
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
          Add Currency
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
                Enter Currency Details
              </Typography>
            </Box>
            <Grid container spacing={2} minWidth="600px">
              <Grid item md={8}>
                <TextField
                  error={Boolean(formik.touched.currencyName && formik.errors.currencyName)}
                  fullWidth
                  helperText={formik.touched.currencyName && formik.errors.currencyName}
                  label="Currency Name"
                  name="currencyName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  color="success"
                  value={formik.values.currencyName}
                  size="medium"
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  error={Boolean(formik.touched.currencyCode && formik.errors.currencyCode)}
                  fullWidth
                  helperText={formik.touched.currencyCode && formik.errors.currencyCode}
                  label="Currency Code"
                  name="currencyCode"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  color="success"
                  value={formik.values.currencyCode}
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
                Add Currency
              </Button>
            </Box>
          </form>
        </Card>
      </Box>
    </>
  );
};

CreateCurrency.propTypes = {
  setModalKey: PropTypes.func,
};
