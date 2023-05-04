// @mui
import { Container, Box, Typography } from '@mui/material';

// components
import Page from '../../components/Page';
import { BettingTransactionsResults } from '../../components/report/betting-transactions';

const BettingTransactionsReport = () => (
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
            Betting Transactions Report
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <BettingTransactionsResults />
        </Box>
      </Container>
    </Box>
  </Page>
);

export default BettingTransactionsReport;
