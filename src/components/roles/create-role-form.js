import PropTypes from 'prop-types';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// forms validate
import { useFormik } from 'formik';
import * as Yup from 'yup';
// @mui
import { Box, Button, Card, Grid, TextField, Typography, MenuItem, OutlinedInput, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// context and modules
import { axiosInstance } from '../../utils/axios';

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

export const CreateRole = ({ setModalKey }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [assignedPermissionsList, setAssignedPermissionsList] = useState([]);

  const handleMultiSelect = (event) => {
    const {
      target: { value },
    } = event;
    setAssignedPermissionsList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const formik = useFormik({
    initialValues: {
      roleName: '',
      roleDescription: '',
    },
    validationSchema: Yup.object({
      roleName: Yup.string().max(255).required('Role name is required'),
      roleDescription: Yup.string(),
    }),
    onSubmit: (values, helpers) => {
      const postData = {
        name: values.roleName,
        description: values.roleDescription,
        is_active: true,
        permissions: {
          module: {
            can_create: assignedPermissionsList.includes('can_create'),
            can_view: assignedPermissionsList.includes('can_view'),
            can_update: assignedPermissionsList.includes('can_update'),
            can_delete: assignedPermissionsList.includes('can_delete'),
            can_list: assignedPermissionsList.includes('can_list'),
            can_enable: assignedPermissionsList.includes('can_enable'),
            can_disable: assignedPermissionsList.includes('can_disable'),
          },
        },
        // permissions_list: assignedPermissionsList,
      };

      axiosInstance
        .post(`role`, postData)
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
          Create Role
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
                Role Deatail
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
                <TextField
                  error={Boolean(formik.touched.permissions && formik.errors.permissions)}
                  fullWidth
                  helperText={formik.touched.permissions && formik.errors.permissions}
                  label="Permissions"
                  name="permissions"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.permissions}
                  size="medium"
                  color="success"
                  select
                  SelectProps={{
                    multiple: true,
                    value: assignedPermissionsList,
                    onChange: handleMultiSelect,
                    input: <OutlinedInput id="select-multiple-chip" label="Chip" />,
                    renderValue: (selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    ),
                    menuprops: { MenuProps },
                  }}
                >
                  <MenuItem value={'can_create'}>Can Create</MenuItem>
                  <MenuItem value={'can_update'}>Can Update</MenuItem>
                  <MenuItem value={'can_list'}>Can View List</MenuItem>
                  <MenuItem value={'can_view'}>Can View Detail</MenuItem>
                  <MenuItem value={'can_delet'}>Can Delete</MenuItem>
                  <MenuItem value={'can_enable'}>Can Enable</MenuItem>
                  <MenuItem value={'can_disable'}>Can Disable</MenuItem>
                </TextField>
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
                Create Role
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
