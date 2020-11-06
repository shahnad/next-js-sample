import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import RequiredValidation from "../common/validation";
import api from "../api/api";
import CommonSnackbars from "../common/snackbar";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
    text: {
      minWidth: "100% !important",
    },
  },
  cancelButton: {
    margin: "auto 10px",
  },
  textareastyle: {
    width: "100%",
    backgroundColor: "#fafafa",
    fontFamily: "Roboto",
    fontWeight: 400,
    padding: 5,
    lineHeight: "1.187em",
    letterSpacing: "0.00938em",
    fontSize: "1rem",
  },
}));

export default function CreateType(props) {
  const classes = useStyles();
  const router = useRouter();

  const [form, setform] = useState({
    name: "",
  });

  const [error, seterror] = useState({
    nameerror: "",
  });

  const [snackmessage, setsnackmessage] = useState({
    isopen: false,
    message: "",
    type: "",
  });
  const handleChange = (event) => {
    if (event.target.name === "name") {
      let errcheck = RequiredValidation(event.target.value);
      if (errcheck.helerText) {
        seterror({ ...error, nameerror: errcheck.helerText });
        setform({ ...form, name: event.target.value});
      }else{
          setform({ ...form, name: event.target.value});
          seterror({ ...error, nameerror: '' });

      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createType(form);
  };

  const createType = async (form) => {
    const res = await api.post(`/types`, form);
    if (res.status === 200) {
      setsnackmessage({
        ...snackmessage,
        isopen: true,
        message: res.data.message,
        type: "info",
      });
    } else {
      setsnackmessage({
        ...snackmessage,
        isopen: true,
        message: res.data.message,
        type: "error",
      });
    }
  };

  const alertResponce = (cb) => {
    setsnackmessage({ ...snackmessage, isopen: false, type: "", message: "" });
    router.push("/types");
  };

  return (
    <Layout {...props}>
      <form
        className={classes.root}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={3}>
          <Grid item xs={7}>
            <TextField
              id="standard-basic"
              fullWidth
              label="type"
              onChange={handleChange}
              name="name"
              variant="outlined"
              value={form && form.name}
              helperText={error && error.nameerror}
              error={error && error.nameerror ? true : false}
            />
          </Grid>

          <Grid item xs={7}>
            <Button
              variant="contained"
              disabled={!form.name || error.nameerror}
              color="primary"
              type="submit"
            >
              Save
            </Button>
            <Button
              className={classes.cancelButton}
              color="secondary"
              variant="contained"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
      {snackmessage.isopen && (
        <CommonSnackbars alertResponce={alertResponce} alert={snackmessage} />
      )}
    </Layout>
  );
}
