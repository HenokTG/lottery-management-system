// @mui
import { Container, Box, Typography } from '@mui/material';

// components
import Page from '../../components/layout/Page';
import { AppConfigResults } from '../../components/app-config';

const AppSettings = () => (
  <Page title="App Settings ">
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Box>
          <Typography sx={{ m: 1, mb: 4 }} variant="h4">
            App Settings
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <AppConfigResults />
        </Box>
      </Container>
    </Box>
  </Page>
);

export default AppSettings;
