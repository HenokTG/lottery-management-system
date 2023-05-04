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

export const CreateLicenceCatagory = ({ setModalKey }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      licenceCatagory: '',
      description: '',
    },
    validationSchema: Yup.object({
      licenceCatagory: Yup.string().max(255).required('Licence name is required'),
      description: Yup.string(),
    }),
    onSubmit: (values, helpers) => {
      const postData = {
        name: values.licenceCatagory,
        description: values.description,
        is_active: true,
      };

      axiosInstance
        .post(`license`, postData)
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
          Create Licence Catagory
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
                Enter Licence Catagory Details
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
                Create Licence Catagory
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
