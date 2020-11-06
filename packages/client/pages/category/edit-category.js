import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
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

export default function EditCategory(props) {
  const classes = useStyles();
  const router = useRouter();
  const { id } = props;

  const [form, setform] = useState({
    category: "",
    description: "",
  });
  console.log(id, "sss");
  const [error, seterror] = useState({
    categoryerror: "",
    descriptionerror: "",
  });

  const [snackmessage, setsnackmessage] = useState({
    isopen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    getCategoryByid(id);
  }, [id]);

  const getCategoryByid = async (id) => {
    const res = await api.get(`category/${id}`);
    let result = "";
    result = res.data.data;

    setform({
      ...form,
      category: result.category,
      description: result.description,
    });
  };

  const handleChange = (event) => {
    if (event.target.name === "category") {
      let errcheck = RequiredValidation(event.target.value);
      if (errcheck.helerText) {
        seterror({ ...error, categoryerror: errcheck.helerText });
      }
    } else if (event.target.name === "description") {
      let errcheck = RequiredValidation(event.target.value);
      if (errcheck.helerText) {
        seterror({ ...error, descriptionerror: errcheck.helerText });
      }
    }
    setform({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCategory(form, id);
  };

  const updateCategory = async (form, id) => {
    const res = await api.put(`/category/${id}`, form);
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
    router.push("/category");
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
              label="category"
              onChange={handleChange}
              name="category"
              variant="outlined"
              value={form && form.category}
              helperText={error && error.categoryerror}
              error={error && error.categoryerror ? true : false}
            />
          </Grid>
          <Grid item xs={7}>
            <TextareaAutosize
              aria-label="minimum height"
              rowsMin={3}
              onChange={handleChange}
              value={form && form.description}
              name="description"
              className={classes.textareastyle}
              placeholder={
                error && error.descriptionerror
                  ? error.descriptionerror
                  : "Enter Descriptions here..."
              }
            />
          </Grid>
          <Grid item xs={7}>
            <Button
              variant="contained"
              disabled={
                !form.category ||
                !form.description ||
                error.categoryerror ||
                error.descriptionerror
              }
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
export async function getServerSideProps(context) {
  let id = context && context.query && context.query.slug && context.query.slug;
  return {
    props: { id }, // will be passed to the page component as props
  };
}
