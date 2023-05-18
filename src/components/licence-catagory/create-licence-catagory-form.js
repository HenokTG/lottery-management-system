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
import { licenceCatagoryUpdateFetch } from '../../_apiAxios/mainFetches';

// -----------------------------------------------------------------------------------------------------------------------

const CreateLicenceCatagory = ({ setModalKey }) => {
  const theme = useTheme();

  const navigate = useNavigate();
  const prevLocation = useLocation();

  const { id } = useParams();

  const { loggedIn } = useGlobalContext();

  const [intialLicenceData, setIntialLicenceData] = useState({
    licenceCatagory: '',
    description: '',
  });

  useEffect(
    () => {
      if (id !== undefined) {
        if (loggedIn === false) {
          navigate(`/login?redirectTo=${prevLocation.pathname}`);
        }

        const updateLicenceAPI = `license/${id}`;
        licenceCatagoryUpdateFetch(updateLicenceAPI, setIntialLicenceData);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );

  const handleFormCancel = () => {
    if (id === undefined) {
      setModalKey(false);
    } else {
      navigate('/app/licence-catagories', { replace: true });
    }
  };

  const formik = useFormik({
    initialValues: intialLicenceData,
    enableReinitialize: true,
    validationSchema: Yup.object({
      licenceCatagory: Yup.string().max(255).required('Licence name is required'),
      description: Yup.string(),
    }),
    onSubmit: (values, helpers) => {
      const postData = {
        name: values.licenceCatagory,
        description: values.description,
      };

      if (id === undefined) {

        postData.is_active = true;

        axiosInstance
          .post('license', postData)
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
          .patch(`license/${id}`, postData)
          .then(() => {
            navigate('/app/licence-catagories', { replace: true });
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
          {id === undefined ? 'Create' : 'Update'} Licence Catagory
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
                {id === undefined ? 'Enter' : 'Edit'} Licence Catagory Details
              </Typography>
            </Box>
            <Grid container spacing={2} minWidth="600px">
              <Grid item md={12}>
                <TextField
                  error={Boolean(formik.touched.licenceCatagory && formik.errors.licenceCatagory)}
                  fullWidth
                  helperText={formik.touched.licenceCatagory && formik.errors.licenceCatagory}
                  label="Licence Catagory"
                  name="licenceCatagory"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  color="success"
                  value={formik.values.licenceCatagory}
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
                {id === undefined ? 'Create' : 'Update'} Licence Catagory
              </Button>
            </Box>
          </form>
        </Card>
      </Box>
    </>
  );
};

CreateLicenceCatagory.propTypes = {
  setModalKey: PropTypes.func,
};

export default CreateLicenceCatagory;
