// @mui
import { Container, Box, Typography } from '@mui/material';
// components
import Page from '../../components/layout/Page';
import { RevenueReportResults } from '../../components/report/revenue';

const RevenueReport = () => (
  <Page title="Revenue Report">
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
            Revenue Report
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <RevenueReportResults />
        </Box>
      </Container>
    </Box>
  </Page>
);

export default RevenueReport;
