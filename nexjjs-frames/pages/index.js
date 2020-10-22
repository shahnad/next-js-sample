import React from "react";
import {
  Grid,
  Card,
  Box,
  TextField,
  Button,
  Typography,
  CssBaseline,
  Link,
} from "@material-ui/core";
import { useRouter } from "next/router";

function Login(props) {
  const router = useRouter();

  const [values, setValues] = React.useState({
    email: "",
    emailError: "",
    password: "",
    passwrdError: "",
  });

  // form submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  // onChange function
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <CssBaseline />
      <Grid
        container
        style={{ height: "100vh" }}
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Card style={{ padding: "60px" }}>
            <Typography
              variant="h6"
              style={{ textAlign: "center" }}
              gutterBottom
            >
              Login
            </Typography>
            <form
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
              className="flex-column"
            >
              <Box display="flex" flexDirection="column">
                <TextField
                  id="email"
                  name="email"
                  error={values.emailError ? true : false}
                  style={{ margin: 6 }}
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  label={values.emailError ? "Error" : "Email"}
                  variant="outlined"
                  helperText={values.emailError && values.emailError}
                />
                <TextField
                  id="password"
                  name="password"
                  style={{ margin: 6 }}
                  type="password"
                  error={values.passwrdError ? true : false}
                  value={values.password}
                  onPaste={(e) => e.preventDefault()}
                  onChange={handleChange}
                  label={values.passwrdError ? "Error" : "Password"}
                  helperText={values.passwrdError && values.passwrdError}
                  variant="outlined"
                />

                <Button
                  variant="contained"
                  style={{ margin: 6 }}
                  type="submit"
                  color="primary"
                >
                  Login
                </Button>
              </Box>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
export default React.memo(Login);
