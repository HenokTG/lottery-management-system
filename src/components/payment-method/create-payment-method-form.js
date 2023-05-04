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

export const CreatePaymentMethod = ({ setModalKey }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      paymentMethod: '',
      paymentCode: '',
      description: '',
    },
    validationSchema: Yup.object({
      paymentMethod: Yup.string().max(255).required('Payment method name is required'),
      paymentCode: Yup.string().max(255).required('Payment method code is required'),
      description: Yup.string(),
    }),
    onSubmit: (values, helpers) => {
      const postData = {
        name: values.paymentMethod,
        code: values.paymentCode,
        description: values.description,
        is_active: true,
      };

      axiosInstance
        .post(`payment-method`, postData)
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
          Create Payment Method
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
                Enter Payment Method Details
              </Typography>
            </Box>
            <Grid container spacing={2} minWidth="600px">
              <Grid item md={8}>
                <TextField
                  error={Boolean(formik.touched.paymentMethod && formik.errors.paymentMethod)}
                  fullWidth
                  helperText={formik.touched.paymentMethod && formik.errors.paymentMethod}
                  label="Payment method"
                  name="paymentMethod"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  color="success"
                  value={formik.values.paymentMethod}
                  size="medium"
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  error={Boolean(formik.touched.paymentCode && formik.errors.paymentCode)}
                  fullWidth
                  helperText={formik.touched.paymentCode && formik.errors.paymentCode}
                  label="Payment method code"
                  name="paymentCode"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  color="success"
                  value={formik.values.paymentCode}
                  size="medium"
                />
              </Grid>

              <Grid item md={12}>
                <TextField
                  error={Boolean(formik.touched.description && formik.errors.description)}
                  fullWidth
                  helperText={formik.touched.description && formik.errors.description}
                  label="Description"
                  name="description"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  color="success"
                  value={formik.values.description}
                  multiline
                  rows={4}
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
                Create Payment Method
              </Button>
            </Box>
          </form>
        </Card>
      </Box>
    </>
  );
};

CreatePaymentMethod.propTypes = {
  setModalKey: PropTypes.func,
};
