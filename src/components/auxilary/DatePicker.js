import React from 'react';
import PropTypes from 'prop-types';

// date-picker
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

// @mui
import { TextField } from '@mui/material';

const DatePicker = ({ pickerName, pickerLabel, date, setDate, sx }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DesktopDatePicker
      name={pickerName}
      type="date"
      label={pickerLabel}
      value={date}
      onChange={(newValue) => {
        setDate(newValue);
      }}
      inputFormat="MMMM DD, YYYY"
      disableMaskedInput
      openTo="year"
      views={['year', 'month', 'day']}
      renderInput={(params) => <TextField {...params} color="success" required variant="standard" sx={sx} />}
      OpenPickerButtonProps={{ color: 'primary' }}
    />
  </LocalizationProvider>
);

DatePicker.propTypes = {
  pickerName: PropTypes.string,
  pickerLabel: PropTypes.string,
  date: PropTypes.any,
  setDate: PropTypes.func,
  sx: PropTypes.object,
};

export default DatePicker;
