import PropTypes from 'prop-types';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Box, MenuItem, MenuList, Popover, Typography, Button } from '@mui/material';
// context and modules
import { axiosInstance } from '../../utils/axios';
import { useGlobalContext } from '../../context';

export const AccountPopover = (props) => {
  const { setLoggedIn, setProfilePk, setProfile } = useGlobalContext();
  const navigate = useNavigate();

  const { anchorEl, onClose, open, ...other } = props;

  const handleSignOut = () => {
    axiosInstance.post('auth/logout', {
      refresh_token: localStorage.getItem('refresh_token'),
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    axiosInstance.defaults.headers.Authorization = null;
    setLoggedIn(false);
    setProfilePk('');
    setProfile({});
    navigate('/');
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: '300px' },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account: John Doe</Typography>
        <MenuList
          disablePadding
          sx={{
            '& > *': {
              '&:first-of-type': {
                borderTopColor: 'divider',
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
              },
            },
            paddingTop: 1,
          }}
        >
          <MenuItem sx={{ padding: 0 }}>
            <Button
              sx={{ display: 'flex', justifyContent: 'left' }}
              fullWidth
              color="info"
              component={RouterLink}
              to="/app/user-profile"
            >
              User profile
            </Button>
          </MenuItem>
          <MenuItem sx={{ padding: 0 }}>
            <Button
              sx={{ display: 'flex', justifyContent: 'left' }}
              fullWidth
              color="info"
              component={RouterLink}
              to="/app/account-settings"
            >
              Account settings
            </Button>
          </MenuItem>
        </MenuList>
      </Box>
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px',
            },
            padding: '20px 16px',
          },
        }}
      >
        <Button fullWidth color="error" onClick={handleSignOut}>
          Sign out
        </Button>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
