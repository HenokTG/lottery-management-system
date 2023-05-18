import PropTypes from 'prop-types';

import { useState } from 'react';

// material
import {
  Box,
  Stack,
  Button,
  Drawer,
  Divider,
  IconButton,
  Typography,
  MenuItem,
  TextField,
  FormControl,
} from '@mui/material';

// components
import Iconify from './Iconify';
import DatePicker from './DatePicker';
import Scrollbar from './Scrollbar';

// icons
import { Filter } from '../../icons/filter';

// ----------------------------------------------------------------------

AnnualReportFilter.propTypes = {
  fetchRootAPI: PropTypes.string,
  filterQueryAPI: PropTypes.string,
  filterProps: PropTypes.array,
  setFetchAPI: PropTypes.func,
};

export default function AnnualReportFilter({ filterProps, fetchRootAPI, filterQueryAPI, setFetchAPI }) {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleBackendFilter = () => {

    console.log('Called URL: ', `${fetchRootAPI}&${filterQueryAPI}`);
    const reportBackendURL = `${fetchRootAPI}&${filterQueryAPI}`;

    setFetchAPI(reportBackendURL);
    handleCloseFilter();
  };

  const clearBackendFilter = () => {
    filterProps.map((catg) => {
      if (catg.fieldType === 'date') {
        catg.callChangeFunc(null);
      } else {
        catg.callChangeFunc('');
      }

      return '';
    });

    setFetchAPI(fetchRootAPI);
    handleCloseFilter();
  };

  return (
    <>
      <Button color="info" variant="contained" startIcon={<Filter />} onClick={handleOpenFilter}>
        Filter
      </Button>
      <Drawer
        anchor="right"
        open={openFilter}
        onClose={handleCloseFilter}
        PaperProps={{
          sx: {
            width: 300,
            border: 'none',
            overflow: 'auto',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '0em',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={handleCloseFilter}>
            <Iconify icon="eva:close-fill" width={20} height={20} sx={{ color: 'error.main' }} />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={2} sx={{ p: 3 }}>
            {filterProps &&
              filterProps.map((catg, idx) =>
                catg.child ? (
                  <FormControl fullWidth key={`${idx} - ${catg.title}`}>
                    <TextField
                      select={catg.child !== 'text-input'}
                      size="small"
                      name={catg.fieldName}
                      label={catg.title}
                      value={catg.valueSet}
                      onChange={(elem) => catg.callChangeFunc(elem.target.value)}
                      sx={{ mt: 0.25 }}
                    >
                      {catg.child !== 'text-input' &&
                        catg.child.map((operator) => (
                          <MenuItem key={`${operator.id}-${operator.name}`} value={operator.id}>
                            {operator.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </FormControl>
                ) : (
                  <DatePicker
                    key={`${idx} - ${catg.title}`}
                    picekerName={catg.fieldName}
                    pickerLabel={catg.title}
                    date={catg.valueSet}
                    setDate={catg.callChangeFunc}
                  />
                )
              )}
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="success"
            variant="outlined"
            startIcon={<Iconify icon="codicon:github-action" />}
            sx={{ mb: 1 }}
            onClick={() => handleBackendFilter()}
          >
            Apply Filter
          </Button>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="warning"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
            onClick={() => clearBackendFilter()}
          >
            Clear Filter
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
