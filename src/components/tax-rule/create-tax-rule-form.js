import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// forms validate
import { useFormik } from 'formik';
import * as Yup from 'yup';

// @mui
import { Box, Button, Card, Grid, TextField, Typography, MenuItem, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// context and modules
import { axiosInstance } from '../../utils/axios';
import { fetchCountryIDs } from '../../_apiAxios/modelCreateFetches';
import { taxRuleUpdateFetch } from '../../_apiAxios/app-config';

// -----------------------------------------------------------------------------------------------------------------------

const CreateTaxRule = ({ setModalKey }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [countryIDs, setCountryIDs] = useState([{ id: -1, name: 'No country to assign' }]);

  const [intialTaxRuleData, setIntialTaxRuleData] = useState({
    taxName: '',
    taxType: '',
    taxValue: '',
    countryName: '',
  });

  useEffect(
    () => {
      const countryFetchAPI = `country?page=${1}&per_page=${25}`;

      fetchCountryIDs(countryFetchAPI, setCountryIDs);

      if (id !== undefined) {
        const updateTaxRuleAPI = `tax-rule/${id}`;
        taxRuleUpdateFetch(updateTaxRuleAPI, setIntialTaxRuleData, setLoading);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleFormCancel = () => {
    if (id === undefined) {
      setModalKey(false);
    } else {
      navigate('/app-settings/tax-rules', { replace: true });
    }
  };

  const formik = useFormik({
    initialValues: intialTaxRuleData,
    enableReinitialize: true,
    validationSchema: Yup.object({
      taxName: Yup.string().max(255).required('Tax name is required'),
      taxType: Yup.string().max(255).required('Tax type is required'),
      taxValue: Yup.string().max(255).required('Tax amount is required'),
      countryName: Yup.string().max(255).required('Country Name is required'),
    }),
    onSubmit: (values, helpers) => {
      const postData = {
        name: values.taxName,
        country: values.countryName,
        tax_type: values.taxType,
        tax_value: values.taxValue,
      };

      if (id === undefined) {
        postData.is_active = true;

        axiosInstance
          .post('tax-rule', postData)
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
          .patch(`tax-rule/${id}`, postData)
          .then(() => {
            navigate('/app-settings/tax-rules', { replace: true });
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
          {id === undefined ? 'Add' : 'Update'} Tax Rule
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
                  {id === undefined ? 'Enter' : 'Edit'} Tax Rule Details
                </Typography>
              </Box>
              <Grid container spacing={2} minWidth="600px">
                <Grid item md={6}>
                  <TextField
                    error={Boolean(formik.touched.taxName && formik.errors.taxName)}
                    fullWidth
                    helperText={formik.touched.taxName && formik.errors.taxName}
                    label="Tax Name"
                    name="taxName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    color="success"
                    value={formik.values.taxName}
                    size="medium"
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    error={Boolean(formik.touched.taxType && formik.errors.taxType)}
                    fullWidth
                    helperText={formik.touched.taxType && formik.errors.taxType}
                    label="Tax Type"
                    name="taxType"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    color="success"
                    value={formik.values.taxType}
                    size="medium"
                    select
                  >
                    <MenuItem key="percentage" value="percentage">
                      Percentage
                    </MenuItem>
                    <MenuItem key="decimal" value="decimal">
                      Decimal
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item md={6}>
                  <TextField
                    error={Boolean(formik.touched.taxValue && formik.errors.taxValue)}
                    fullWidth
                    helperText={formik.touched.taxValue && formik.errors.taxValue}
                    label="Tax Amount"
                    name="taxValue"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    color="success"
                    value={formik.values.taxValue}
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
                        {counrty.name}
                      </MenuItem>
                    ))}
                  </TextField>
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
                  {id === undefined ? 'Add' : 'Update'} Tax Rule
                </Button>
              </Box>
            </form>
          )}
        </Card>
      </Box>
    </>
  );
};

CreateTaxRule.propTypes = {
  setModalKey: PropTypes.func,
};

export default CreateTaxRule;
