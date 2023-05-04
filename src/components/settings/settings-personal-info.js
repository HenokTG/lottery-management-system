import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";

const states = [
  {
    value: "addis-ababa",
    label: "Addis Ababa",
  },
  {
    value: "oromia",
    label: "Oromia",
  },
  {
    value: "amhara",
    label: "Amhara",
  },
];

export const SettingsPersonalInfo = (props) => {
  const [values, setValues] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe1496@gmail.com",
    phone: 934344374,
    state: "Addis Ababa",
    country: "Ethiopia",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form {...props}>
      <Card>
        <CardHeader subheader="Update Personal Info" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3} md={8}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                // helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
                color="success"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
                color="success"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
                color="success"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
                color="success"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
                color="success"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
                color="success"
              >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            p: 2,
            ml: 5,
          }}
        >
          <Button color="success" size="large" variant="contained" sx={{ width: "15rem" }}>
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};
