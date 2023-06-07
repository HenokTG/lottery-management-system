import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// @mui
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// components
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';

// context hook and modules
import useAuth from '../../hooks/useAuth';
import { axiosInstance } from '../../utils/axios';

// Custom styles
const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 24,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280,
  },
}));

export const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const { auth } = useAuth();

  console.log('userEmail: ', auth.userEmail);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      setLoading(true);

      axiosInstance
        .get(`user/7`) // ${auth.userEmail}
        .then((res) => {
          console.log(res.data);
          setProfile({
            userPrivilage: res.data?.is_superuser ? 'Admin' : 'Operator',
            email: res.data?.email,
            firstName: res.data?.first_name,
            lastName: res.data?.last_name,
            phone: res.data?.phone,
            userImage: res.data?.image,
            operatorDetail: res.data?.operator,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Outlet />
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} userProfile={profile} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
        userProfile={profile}
        role={auth.role ? auth.role[0] : 'unknown'}
      />
    </>
  );
};
