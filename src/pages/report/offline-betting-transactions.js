// @mui
import { Container, Box, Typography } from '@mui/material';

// components
import Page from '../../components/layout/Page';
import { OfflineBettingResults } from '../../components/report/offline-bettings-list';

const OfflineBettingTransactionsReport = () => (
  <Page title="Betting Transactions Report">
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
            Offline Betting Transactions Report
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <OfflineBettingResults />
        </Box>
      </Container>
    </Box>
  </Page>
);

export default OfflineBettingTransactionsReport;
