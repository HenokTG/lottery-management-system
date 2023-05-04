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
import { fetchLicenceCatIDs } from '../../_apiAxios/mainCreateFetches';

export const CreateGame = ({ setModalKey }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [licenseCatIDs, setlicenseCatIDs] = useState([{ id: -1, liceCatName: 'No license category to assign' }]);
  useEffect(
    () => {
      const licenseCatFetchAPI = `license?page=${1}&per_page=${25}`;

      fetchLicenceCatIDs(licenseCatFetchAPI, setlicenseCatIDs);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const formik = useFormik({
    initialValues: {
      gameName: '',
      gameCode: '',
      gameIconURL: '',
      licenceCatagory: '',
      description: '',
    },
    validationSchema: Yup.object({
      gameName: Yup.string().max(255).required('Game name is required'),
      gameCode: Yup.string().max(255).required('Game code is required'),
      gameIconURL: Yup.string().max(255).required('Provive game icon url is required'),
      licenceCatagory: Yup.string().max(255).required('Choose license category'),
      description: Yup.string(),
    }),
    onSubmit: (values, helpers) => {
      const postData = {
        name: values.gameName,
        code: values.gameCode,
        photo_url: values.gameIconURL,
        license: values.licenceCatagory,
        description: values.description,
        is_active: true,
      };

      axiosInstance
        .post(`game`, postData)
        .then((res) => {
          setModalKey(false);
          // navigate('/app/games', { replace: true });
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
          Create Game
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
                Enter Game Details
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <TextField
                  error={Boolean(formik.touched.gameName && formik.errors.gameName)}
                  fullWidth
                  helperText={formik.touched.gameName && formik.errors.gameName}
                  label="Game Name"
                  name="gameName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  color="success"
                  value={formik.values.gameName}
                  size="small"
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  error={Boolean(formik.touched.gameCode && formik.errors.gameCode)}
                  fullWidth
                  helperText={formik.touched.gameCode && formik.errors.gameCode}
                  label="Game Code"
                  name="gameCode"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  color="success"
                  value={formik.values.gameCode}
                  size="small"
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  error={Boolean(formik.touched.gameIconURL && formik.errors.gameIconURL)}
                  fullWidth
                  helperText={formik.touched.gameIconURL && formik.errors.gameIconURL}
                  label="Game Icon URL"
                  name="gameIconURL"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  color="success"
                  value={formik.values.gameIconURL}
                  size="small"
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Licence Catagory"
                  name="licenceCatagory"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  color="success"
                  value={formik.values.licenceCatagory}
                  size="small"
                  select
                >
                  {licenseCatIDs.map((licenseCatId) => (
                    <MenuItem key={`${licenseCatId.id}-${licenseCatId.liceCatName}`} value={licenseCatId.id}>
                      {licenseCatId.liceCatName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item md={12}>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Description"
                  name="description"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  color="success"
                  value={formik.values.description}
                  multiline
                  rows={3}
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
                Create Game
              </Button>
            </Box>
          </form>
        </Card>
      </Box>
    </>
  );
};

CreateGame.propTypes = {
  setModalKey: PropTypes.func,
};
