// @mui
import { Container, Box, Typography } from '@mui/material';

// components
import Page from '../components/layout/Page';
import { ActivityLogResults } from '../components/activity-log-results';

const ActivityLogs = () => (
  <Page title="Activity Log">
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
            Activity Log
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <ActivityLogResults />
        </Box>
      </Container>
    </Box>
  </Page>
);

export default ActivityLogs;
