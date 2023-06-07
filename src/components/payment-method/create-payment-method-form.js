import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// forms validate
import { useFormik } from 'formik';
import * as Yup from 'yup';

// @mui
import { Box, Button, Card, Grid, TextField, Typography, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// context and modules
import { axiosInstance } from '../../utils/axios';
import { paymentMethodUpdateFetch } from '../../_apiAxios/payment-report';

// -----------------------------------------------------------------------------------------------------------------------

const CreatePaymentMethod = ({ setModalKey }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [intialPaymentMethodData, setIntialPaymentMethodData] = useState({
    paymentMethod: '',
    paymentCode: '',
    description: '',
  });

  useEffect(
    () => {
      if (id !== undefined) {
        const updatePaymentMethodAPI = `payment-method/${id}`;
        paymentMethodUpdateFetch(updatePaymentMethodAPI, setIntialPaymentMethodData, setLoading);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleFormCancel = () => {
    if (id === undefined) {
      setModalKey(false);
    } else {
      navigate('/app-settings/payment-method', { replace: true });
    }
  };

  const formik = useFormik({
    initialValues: intialPaymentMethodData,
    enableReinitialize: true,
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

      if (id === undefined) {
        postData.is_active = true;

        axiosInstance
          .post('payment-method', postData)
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
          .patch(`payment-method/${id}`, postData)
          .then(() => {
            navigate('/app-settings/payment-method', { replace: true });
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
          {id === undefined ? 'Add' : 'Update'} Payment Method
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
                  {id === undefined ? 'Enter' : 'Edit'} Payment Method Details
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
                  {id === undefined ? 'Add' : 'Update'} Payment Method
                </Button>
              </Box>
            </form>
          )}
        </Card>
      </Box>
    </>
  );
};

CreatePaymentMethod.propTypes = {
  setModalKey: PropTypes.func,
};

export default CreatePaymentMethod;
