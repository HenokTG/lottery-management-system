// @mui
import { Container, Box, Typography } from '@mui/material';

// components
import Page from '../../components/layout/Page';
import { OperatorWalletResults } from '../../components/report/operator-wallet';

const OperatorWalletReport = () => (
  <Page title="Operator Wallet Report">
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
            Operator Wallet Report
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <OperatorWalletResults />
        </Box>
      </Container>
    </Box>
  </Page>
);

export default OperatorWalletReport;
