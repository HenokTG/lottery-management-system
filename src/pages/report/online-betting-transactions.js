// @mui
import { Container, Box, Typography } from '@mui/material';

// components
import Page from '../../components/layout/Page';
import { OnlineBettingResults } from '../../components/report/online-bettings-list';

const OnlineBettingTransactionsReport = () => (
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
            Online Betting Transactions Report
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <OnlineBettingResults />
        </Box>
      </Container>
    </Box>
  </Page>
);

export default OnlineBettingTransactionsReport;
