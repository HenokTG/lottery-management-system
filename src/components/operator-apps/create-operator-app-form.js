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
import { fetchOperatorIDs } from '../../_apiAxios/modelCreateFetches';
import { operatorAppUpdateFetch } from '../../_apiAxios/app-config';

// -----------------------------------------------------------------------------------------------------------------------

const CreateOperatorApp = ({ setModalKey }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [operatorIDs, setOperatorIDs] = useState([{ id: -1, name: 'No operator to assign' }]);

  const [intialOperatorAppData, setIntialOperatorAppData] = useState({
    appName: '',
    operatorName: '',
  });

  useEffect(
    () => {
      const operatorFetchAPI = `operator?page=${1}&per_page=${25}`;

      fetchOperatorIDs(operatorFetchAPI, setOperatorIDs);

      if (id !== undefined) {
        const updateOperatorAppAPI = `app/${id}`;
        operatorAppUpdateFetch(updateOperatorAppAPI, setIntialOperatorAppData, setLoading);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleFormCancel = () => {
    if (id === undefined) {
      setModalKey(false);
    } else {
      navigate('/app-settings/operator-apps', { replace: true });
    }
  };

  const formik = useFormik({
    initialValues: intialOperatorAppData,
    enableReinitialize: true,
    validationSchema: Yup.object({
      appName: Yup.string().max(255).required('App name is required'),
      operatorName: Yup.string().max(255).required('Operator Name is required'),
    }),
    onSubmit: (values, helpers) => {
      const postData = {
        name: values.appName,
        operator: values.operatorName,
      };

      if (id === undefined) {
        postData.is_active = true;

        axiosInstance
          .post('app', postData)
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
          .patch(`app/${id}`, postData)
          .then(() => {
            navigate('/app-settings/operator-apps', { replace: true });
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
          {id === undefined ? 'Add' : 'Update'} Operator App
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
                  {id === undefined ? 'Enter' : 'Edit'} App Details
                </Typography>
              </Box>
              <Grid container spacing={2} minWidth="600px">
                <Grid item md={6}>
                  <TextField
                    error={Boolean(formik.touched.appName && formik.errors.appName)}
                    fullWidth
                    helperText={formik.touched.appName && formik.errors.appName}
                    label="App Name"
                    name="appName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    color="success"
                    value={formik.values.appName}
                    size="medium"
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    error={Boolean(formik.touched.operatorName && formik.errors.operatorName)}
                    fullWidth
                    helperText={formik.touched.operatorName && formik.errors.operatorName}
                    label="Select Operator"
                    name="operatorName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    color="success"
                    value={formik.values.operatorName}
                    select
                  >
                    {operatorIDs.map((operator) => (
                      <MenuItem key={`${operator.id}-${operator.name}`} value={operator.id}>
                        {operator.name}
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
                  {id === undefined ? 'Add' : 'Update'} App
                </Button>
              </Box>
            </form>
          )}
        </Card>
      </Box>
    </>
  );
};

CreateOperatorApp.propTypes = {
  setModalKey: PropTypes.func,
};

export default CreateOperatorApp;
