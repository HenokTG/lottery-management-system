import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// @mui
import { Box, Container, Card, CardContent, Typography, Avatar } from '@mui/material';
// components
import Page from '../components/layout/Page';
// context and modules
import { useGlobalContext } from '../context';

const user = {
  avatar: '/static/images/avatars/avatar_1.png',
  city: 'Addis Ababa',
  country: 'Ethiopia',
  jobTitle: 'System Admin',
  name: 'John Dobodye',
  phone: '+251 93 434 43 74',
  email: 'john.doe1496@gmail.com',
  timezone: 'GTM+3',
};

const UserProfile = () => {
  const { loggedIn, profilePk } = useGlobalContext();

  const navigate = useNavigate();
  const prevLocation = useLocation();

  useEffect(
    () => {
      // if (loggedIn === false) {
      //   navigate(`/login?redirectTo=${prevLocation.pathname}`);
      // }

      // const summaryAPI = `/ecl-analysis/api/dashboard-summary/${bankName}/${profilePk}/${summaryMonth}`;

      // fetchDashboardSummary(profilePk, summaryAPI, setSummaryList);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Page title="User Profile">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            User Profile
          </Typography>
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyItems: 'center',
                alignItems: 'center',
              }}
            >
              <Avatar
                src={user.avatar}
                sx={{
                  height: 200,
                  width: 200,
                  mb: 2,
                }}
              />
              <Typography color="textPrimary" gutterBottom variant="h5">
                {user.name}
              </Typography>
              <Typography color="textPrimary" gutterBottom variant="subtitle2">
                {user.jobTitle}
              </Typography>
              <Typography color="textPrimary" gutterBottom variant="caption">
                {user.timezone}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyItems: 'center',
                  mt: 4,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="textPrimary" gutterBottom variant="body">
                    Email:
                  </Typography>
                  <Typography color="textPrimary" gutterBottom variant="body">
                    {user.email}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 15 }}>
                  <Typography color="textPrimary" gutterBottom variant="body">
                    Phone Number:
                  </Typography>
                  <Typography color="textPrimary" gutterBottom variant="body">
                    {user.phone}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="textPrimary" gutterBottom variant="body">
                    Location:
                  </Typography>
                  <Typography color="textPrimary" gutterBottom variant="body">
                    {user.city}, {user.country}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Page>
  );
};

export default UserProfile;
