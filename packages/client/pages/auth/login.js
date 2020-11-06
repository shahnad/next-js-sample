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
import api from "../api/api";
import CommonSnackbars from "../common/snackbar";
import { EmailValidation, PasswordValidation } from "../common/validation";
import { makeStyles } from "@material-ui/core/styles";
import store from 'store';


const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    color: (props) => props.color,
  },
  formfields: {
    margin: "12px 0 15px 0",
    "& p": {
      position: "absolute",
      left: 0,
      right: 0,
      width: "max-content",
      bottom: 0,
      top: 55,
    },
  },
  card: {
    padding: "60px",
  },
  containerdiv: {
    height: "100vh",
  },
  loginbutton: {
    margin: 6,
  },
  title: {
    textAlign: "center",
  },
});

function Login(props) {
  const router = useRouter();
  const classes = useStyles(props);
  const [values, setValues] = React.useState({
    email: "",
    emailError: "",
    password: "",
    passwrdError: "",
  });

  const [snackmessage, setsnackmessage] = React.useState({
    isopen: false,
    message: "",
    type: "",
  });

  // form submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    loginApiCall(values);
  };

  const loginApiCall = async (values) => {
    let data = {
      email: values.email,
      password: values.password,
      usertype: "admin",
    };

    const send = await api.post(`/login`, data);
    let res = send.data;
;
    if (res.session) {
        store.set("USER",JSON.stringify(res));
      setsnackmessage({
        ...snackmessage,
        isopen: true,
        message: res.message,
        type: "success",
      });

      router.push("/dashboard");
    } else {
      setsnackmessage({
        ...snackmessage,
        isopen: true,
        message: res.message,
        type: "error",
      });

      return false;
    }
  };

  const alertResponce = (cb) => {
    setsnackmessage({ ...snackmessage, isopen: cb, type: "", message: "" });
  };

  // onChange function
  const handleChange = (event) => {
    if (event.target.name === "email") {
      let err = EmailValidation(event.target.value);
      if (err.helerText) {
        setValues({
          ...values,
          emailError: err.helerText,
          email: event.target.value,
        });
      } else {
        setValues({
          ...values,
          emailError: err.helerText,
          email: event.target.value,
        });
      }
    } else if (event.target.name === "password") {
      let err = PasswordValidation(event.target.value);
      if (err.helerText) {
        setValues({
          ...values,
          passwrdError: err.helerText,
          password: event.target.value,
        });
      } else {
        setValues({
          ...values,
          passwrdError: err.helerText,
          password: event.target.value,
        });
      }
    } else {
      return false;
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid
        container
        className={classes.containerdiv}
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card className={classes.card}>
            <Typography variant="h6" className={classes.title} gutterBottom>
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
                  className={classes.formfields}
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  label={"Email"}
                  variant="outlined"
                  helperText={values.emailError && values.emailError}
                />
                <TextField
                  id="password"
                  name="password"
                  className={classes.formfields}
                  type="password"
                  error={values.passwrdError ? true : false}
                  value={values.password}
                  onPaste={(e) => e.preventDefault()}
                  onChange={handleChange}
                  label={"Password"}
                  helperText={values.passwrdError && values.passwrdError}
                  variant="outlined"
                />

                <Button
                  variant="contained"
                  className={classes.loginbutton}
                  type="submit"
                  color="primary"
                  disabled={
                    values.emailError ||
                    values.passwrdError ||
                    !values.email 
                   
                  }
                >
                  Login
                </Button>
              </Box>
            </form>
          </Card>
        </Grid>
      </Grid>
      {snackmessage.isopen && (
        <CommonSnackbars alertResponce={alertResponce} alert={snackmessage} />
      )}
    </div>
  );
}
export default React.memo(Login);
