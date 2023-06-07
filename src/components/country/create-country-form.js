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
import { countryUpdateFetch } from '../../_apiAxios/app-config';

// -----------------------------------------------------------------------------------------------------------------------

const CreateCountry = ({ setModalKey }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [intialCountryData, setIntialCountryData] = useState({
    countryName: '',
    countryCode: '',
  });

  useEffect(
    () => {
      if (id !== undefined) {
        const updateCountryAPI = `country/${id}`;
        countryUpdateFetch(updateCountryAPI, setIntialCountryData, setLoading);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleFormCancel = () => {
    if (id === undefined) {
      setModalKey(false);
    } else {
      navigate('/app/app-settings/country-locations', { replace: true });
    }
  };

  const formik = useFormik({
    initialValues: intialCountryData,
    enableReinitialize: true,
    validationSchema: Yup.object({
      countryName: Yup.string().max(255).required('Country name is required'),
      countryCode: Yup.string().max(255).required('Country code is required'),
    }),
    onSubmit: (values, helpers) => {
      const postData = {
        name: values.countryName,
        code: values.countryCode,
      };

      if (id === undefined) {
        postData.is_active = true;

        axiosInstance
          .post('country', postData)
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
          .patch(`country/${id}`, postData)
          .then(() => {
            navigate('/app/app-settings/country-locations', { replace: true });
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
          {id === undefined ? 'Add' : 'Update'} Country
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
                  {id === undefined ? 'Enter' : 'Edit'} Country Details
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
                  {id === undefined ? 'Add' : 'Update'} Country
                </Button>
              </Box>
            </form>
          )}
        </Card>
      </Box>
    </>
  );
};

CreateCountry.propTypes = {
  setModalKey: PropTypes.func,
};

export default CreateCountry;
