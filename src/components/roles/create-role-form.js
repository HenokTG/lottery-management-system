import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

// forms validate
import { useFormik } from 'formik';
import * as Yup from 'yup';

// @mui
import { Box, Button, Card, Grid, TextField, Typography, MenuItem, OutlinedInput, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// components
import PermissionsForm from './permissions_form';

// context and modules
import { axiosInstance } from '../../utils/axios';
import { useGlobalContext } from '../../context';
import { roleUpdateFetch } from '../../_apiAxios/management';

// multi select styles
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// -----------------------------------------------------------------------------------------------------------------------

const CreateRole = ({ setModalKey }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const prevLocation = useLocation();

  const { id } = useParams();

  const { loggedIn } = useGlobalContext();

  const [permissionsObject, setPermissionsObject] = useState({});
  const [isPermissions, setIsPermissions] = useState(false);

  const [assignedPermissionsList, setAssignedPermissionsList] = useState([]);

  const [intialRoleData, setIntialRoleData] = useState({
    roleName: '',
    roleDescription: '',
  });

  useEffect(
    () => {
      if (id !== undefined) {
        if (loggedIn === false) {
          navigate(`/login?redirectTo=${prevLocation.pathname}`);
        }

        const updateLicenceAPI = `role/${id}`;
        roleUpdateFetch(updateLicenceAPI, setIntialRoleData);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );

  const handleMultiSelect = (event) => {
    const {
      target: { value },
    } = event;
    setAssignedPermissionsList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleFormCancel = () => {
    if (id === undefined) {
      setModalKey(false);
    } else {
      navigate('/app/management/role-management', { replace: true });
    }
  };

  const formik = useFormik({
    initialValues: intialRoleData,
    enableReinitialize: true,
    validationSchema: Yup.object({
      roleName: Yup.string().max(255).required('Role name is required'),
      roleDescription: Yup.string(),
    }),
    onSubmit: (values, helpers) => {
      const postData = {
        name: values.roleName,
        description: values.roleDescription,
        permissions: permissionsObject,
      };

      if (id === undefined) {
        postData.is_active = true;

        axiosInstance
          .post('role', postData)
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
          .patch(`role/${id}`, postData)
          .then(() => {
            navigate('/app/management/role-management', { replace: true });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  });

  return (
    <>
      {isPermissions && (
        <PermissionsForm
          isPermissionOpen={isPermissions}
          permOpenFunc={setIsPermissions}
          setPermissionsObject={setPermissionsObject}
        />
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Typography sx={{ ml: 4, mt: 1, mb: 3 }} variant="h4">
          {id === undefined ? 'Create' : 'Update'} Role
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
                {id === undefined ? 'Enter' : 'Edit'} Role Deatails
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <TextField
                  error={Boolean(formik.touched.roleName && formik.errors.roleName)}
                  fullWidth
                  helperText={formik.touched.roleName && formik.errors.roleName}
                  label="Role Name"
                  name="roleName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.roleName}
                  size="medium"
                  color="success"
                />
              </Grid>

              <Grid item md={6}>
                <Button
                  onClick={() => setIsPermissions(true)}
                  color="primary"
                  fullWidth
                  size="medium"
                  variant="contained"
                  sx={{ width: '75%', mt: 0.75, ml: 3 }}
                >
                  Set Permissions
                </Button>
              </Grid>
              <Grid item md={12}>
                <TextField
                  error={Boolean(formik.touched.roleDescription && formik.errors.roleDescription)}
                  fullWidth
                  helperText={formik.touched.roleDescription && formik.errors.roleDescription}
                  label="Role Description"
                  name="roleDescription"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.roleDescription}
                  size="small"
                  color="success"
                  multiline
                  rows={4}
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
                {id === undefined ? 'Create' : 'Update'} Role
              </Button>
            </Box>
          </form>
        </Card>
      </Box>
    </>
  );
};

CreateRole.propTypes = {
  setModalKey: PropTypes.func,
};

export default CreateRole;
