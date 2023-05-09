import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// forms validate
import { useFormik } from 'formik';
import * as Yup from 'yup';
// @mui
import { Box, Button, Card, Grid, TextField, Typography, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// context and modules
import { axiosInstance } from '../../utils/axios';
import { fetchCountryIDs } from '../../_apiAxios/modelCreateFetches';

export const CreateRegion = ({ setModalKey }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [countryIDs, setCountryIDs] = useState([{ id: -1, operatorName: 'No role to assign' }]);

  useEffect(
    () => {
      const countryFetchAPI = `country?page=${1}&per_page=${25}`;

      fetchCountryIDs(countryFetchAPI, setCountryIDs);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const formik = useFormik({
    initialValues: {
      regionName: '',
      regionCode: '',
      countryName: '',
    },
    validationSchema: Yup.object({
      regionName: Yup.string().max(255).required('Region name is required'),
      regionCode: Yup.string().max(255).required('Region code is required'),
      countryName: Yup.string().max(255).required('Country Name is required'),
    }),
    onSubmit: (values, helpers) => {
      const postData = {
        name: values.regionName,
        code: values.regionCode,
        country: values.countryName,
        is_active: true,
      };

      axiosInstance
        .post(`state`, postData)
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
          Add Region
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
                Enter Region Details
              </Typography>
            </Box>
            <Grid container spacing={2} minWidth="600px">
              <Grid item md={8}>
                <TextField
                  error={Boolean(formik.touched.regionName && formik.errors.regionName)}
                  fullWidth
                  helperText={formik.touched.regionName && formik.errors.regionName}
                  label="Region Name"
                  name="regionName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  color="success"
                  value={formik.values.regionName}
                  size="medium"
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  error={Boolean(formik.touched.regionCode && formik.errors.regionCode)}
                  fullWidth
                  helperText={formik.touched.regionCode && formik.errors.regionCode}
                  label="Region Code"
                  name="regionCode"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  color="success"
                  value={formik.values.regionCode}
                  size="medium"
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  error={Boolean(formik.touched.countryName && formik.errors.countryName)}
                  fullWidth
                  helperText={formik.touched.countryName && formik.errors.countryName}
                  label="Select Country"
                  name="countryName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  color="success"
                  value={formik.values.countryName}
                  select
                >
                  {countryIDs.map((counrty) => (
                    <MenuItem key={`${counrty.id}-${counrty.countryName}`} value={counrty.id}>
                      {counrty.countryName}
                    </MenuItem>
                  ))}
                </TextField>
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

CreateRegion.propTypes = {
  setModalKey: PropTypes.func,
};
