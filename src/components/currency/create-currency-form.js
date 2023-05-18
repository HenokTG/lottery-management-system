import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

// forms validate
import { useFormik } from 'formik';
import * as Yup from 'yup';

// @mui
import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// context and modules
import { axiosInstance } from '../../utils/axios';
import { useGlobalContext } from '../../context';
import { currencyUpdateFetch } from '../../_apiAxios/app-config';

// -----------------------------------------------------------------------------------------------------------------------

const CreateCurrency = ({ setModalKey }) => {
  const theme = useTheme();

  const navigate = useNavigate();
  const prevLocation = useLocation();

  const { id } = useParams();

  const { loggedIn } = useGlobalContext();

  const [intialCurrencyData, setIntialCurrencyData] = useState({
    currencyName: '',
    currencyCode: '',
  });

  useEffect(
    () => {
      if (id !== undefined) {
        if (loggedIn === false) {
          navigate(`/login?redirectTo=${prevLocation.pathname}`);
        }

        const updateCurrencyAPI = `currency/${id}`;
        currencyUpdateFetch(updateCurrencyAPI, setIntialCurrencyData);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleFormCancel = () => {
    if (id === undefined) {
      setModalKey(false);
    } else {
      navigate('/app/app-settings/currency', { replace: true });
    }
  };

  const formik = useFormik({
    initialValues: intialCurrencyData,
    enableReinitialize: true,
    validationSchema: Yup.object({
      currencyName: Yup.string().max(255).required('Currency name is required'),
      currencyCode: Yup.string().max(255).required('Currency code is required'),
    }),
    onSubmit: (values, helpers) => {
      const postData = {
        name: values.currencyName,
        code: values.currencyCode,
      };

      if (id === undefined) {
        postData.is_active = true;

        axiosInstance
          .post('currency', postData)
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
          .patch(`currency/${id}`, postData)
          .then(() => {
            navigate('/app/app-settings/currency', { replace: true });
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
          {id === undefined ? 'Add' : 'Update'} Currency
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
                {id === undefined ? 'Enter' : 'Edit'} Currency Details
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
                {id === undefined ? 'Add' : 'Update'} Currency
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

export default CreateCurrency;
