import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// @mui
import { Box, Container, Typography } from '@mui/material';

// components
import Page from '../components/layout/Page';
import { SettingsPersonalInfo } from '../components/settings/settings-personal-info';
import { SettingsPassword } from '../components/settings/settings-password';
// context and modules
import { useGlobalContext } from '../context';

const AccountSettings = () => {
  const { loggedIn, profilePk } = useGlobalContext();

  const navigate = useNavigate();
  const prevLocation = useLocation();

  useEffect(
    () => {
      if (loggedIn === false) {
        navigate(`/login?redirectTo=${prevLocation.pathname}`);
      }

      // const summaryAPI = `/ecl-analysis/api/dashboard-summary/${bankName}/${profilePk}/${summaryMonth}`;

      // fetchDashboardSummary(profilePk, summaryAPI, setSummaryList);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <Page title="Account Settings">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 0 }} variant="h4">
            Account Settings
          </Typography>
          <Box sx={{ pt: 3 }}>
            <SettingsPersonalInfo />
          </Box>
          <Box sx={{ pt: 3 }}>
            <SettingsPassword />
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default AccountSettings;
