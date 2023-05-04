// @mui
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// routes
import Router from './routes';
// theme
import { theme } from './theme';
// utils
import { createEmotionCache } from './utils/create-emotion-cache';
import { registerChartJs } from './utils/register-chart-js';

// ----------------------------------------------------------------------

registerChartJs();
const clientSideEmotionCache = createEmotionCache();

// ----------------------------------------------------------------------
export default function App() {
  const emotionCache = clientSideEmotionCache;

  return (
    <CacheProvider value={emotionCache}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
}
