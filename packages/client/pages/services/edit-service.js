import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import RequiredValidation, { NumberValidation } from "../common/validation";
import api from "../api/api";
import CommonSnackbars from "../common/snackbar";
import { useRouter } from "next/router";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import AttachFileIcon from "@material-ui/icons/AttachFile";

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
  dropzone: {},

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
  fieldmain: {
    "& p": {
      position: "absolute",
      top: 56,
      bottom: 0,
      right: 0,
      left: 0,
      width: "max-content",
    },
  },
  forms: {
    width: "100%",
    "& label": {
      transform: "translate(14px, 22px) scale(0.75) !important",
    },
  },
  file: {
    "& input": {
      opacity: 0,
    },
  },
}));

export default function EditService(props) {
  const classes = useStyles();
  const router = useRouter();
  const [category, setcategory] = useState([]);
  const [types, settypes] = useState([]);
  const [singlecategory, setSinglecategory] = React.useState("");
  const [singletype, setSingletype] = React.useState("");
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const [hidden, sethidden] = useState(false);
  const [file, setfile] = useState([]);
  const { id } = props;

  console.log(props, "ss");
  const [form, setform] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
    type: "",
    imagename: "",
  });

  const [error, seterror] = useState({
    titleerror: "",
    priceerror: "",
    imageerror: "",
    categoryerror: "",
    typeerror: "",
  });

  const [snackmessage, setsnackmessage] = useState({
    isopen: false,
    message: "",
    type: "",
  });
  let disabledstate =
    !form.title ||
    error.titleerror ||
    !form.price ||
    error.priceerror ||
    !form.category ||
    error.categoryerror ||
    !form.type ||
    error.typeerror ||
    !form.imagename ||
    error.imageerror;
  useEffect(() => {
    getformdata(id);
    gettypesandCategories();
  }, []);

  const getformdata = async (id) => {
    const singledata = await api.get(`service/${id}`);
    if (singledata.status === 200) {
      let result = "";
      result = singledata.data.data;
      sethidden(true);
      setform({
        ...form,
        title: result.title,
        price: result.price,
        imagename: result.image,
      });
    }
    console.log(singledata, "singledata");
  };

  const gettypesandCategories = async () => {
    const category = await api.get(`category`);
    if (category && category.data && category.data.data && category.data.data) {
      setcategory(category.data.data);
    }
    const type = await api.get(`types`);
    if (type && type.data && type.data.data && type.data.data) {
      settypes(type.data.data);
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "title") {
      let errcheck = RequiredValidation(event.target.value);
      if (errcheck.helerText) {
        seterror({ ...error, titleerror: errcheck.helerText });
        setform({ ...form, title: event.target.value });
      } else {
        setform({ ...form, title: event.target.value });
        seterror({ ...error, titleerror: "" });
      }
    } else if (event.target.name === "price") {
      let errcheck = NumberValidation(event.target.value);
      if (errcheck.helerText) {
        seterror({ ...error, priceerror: errcheck.helerText });
        setform({ ...form, price: event.target.value });
      } else {
        setform({ ...form, price: event.target.value });
        seterror({ ...error, priceerror: "" });
      }
    } else if (event.target.name === "category") {
      if (!event.target.value) {
        seterror({ ...error, categoryerror: "Required" });
      } else {
        seterror({ ...error, categoryerror: "" });
        setSinglecategory(event.target.value);
        setform({ ...form, category: event.target.value });
      }
    } else if (event.target.name === "type") {
      if (!event.target.value) {
        seterror({ ...error, typeerror: "Required" });
      } else {
        setform({ ...form, type: event.target.value });
        seterror({ ...error, typeerror: "" });
        setSingletype(event.target.value);
      }
    } else {
      return false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createType(form);
  };

  const createType = async (form) => {
    const res = await api.post(`/service`, form);
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
    if (!disabledstate) {
      router.push("/services");
    }
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      sethidden(true);
      setCropData(cropper.getCroppedCanvas().toDataURL());
      imageUpload(file);
    }
  };

  const imageUpload = async (file) => {
    let data = new FormData();
    data.append("file", file);
    const res = await api.post(`upload`, data);
    if (res.status === 200) {
      setform({ ...form, imagename: res.data.data.filename });
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
        message: "Upload Failed !",
        type: "error",
      });
    }
  };

  const onChange = async (e) => {
    let files;
    files = e.target.files;
    setform({ ...form, image: URL.createObjectURL(files[0]) });
    setfile(files[0]);
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
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              className={classes.fieldmain}
              fullWidth
              label="Title"
              onChange={handleChange}
              name="title"
              variant="outlined"
              value={form && form.title}
              helperText={error && error.titleerror}
              error={error && error.titleerror ? true : false}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="standard-basic"
              className={classes.fieldmain}
              fullWidth
              label="Price"
              onChange={handleChange}
              name="price"
              variant="outlined"
              value={form && form.price}
              helperText={error && error.priceerror}
              error={error && error.priceerror ? true : false}
            />
          </Grid>
          <Grid item xs={9}>
            <TextField
              id="standard-basic"
              className={classes.file}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachFileIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
              type="file"
              label="Image"
              onChange={onChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={9}>
            <div className={classes.dropzone}></div>

            {!hidden ? (
              <span onDoubleClick={getCropData}>
                <Cropper
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={form.image}
                  viewMode={1}
                  guides={true}
                  minCropBoxHeight={5}
                  minCropBoxWidth={5}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                  style={{ width: 400, height: "max-content" }}
                />
              </span>
            ) : (
              <img
                style={{ width: 400, height: 400, objectFit: "cover" }}
                src={cropData}
                alt="cropped"
              />
            )}
          </Grid>
          <Grid item xs={5}>
            <>
              <FormControl variant="outlined" className={classes.forms}>
                {!singlecategory && (
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                )}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="category"
                  onChange={handleChange}
                  value={singlecategory}
                >
                  {category &&
                    category.map((res) => (
                      <MenuItem key={res.id} value={res.id}>
                        {res.category}
                      </MenuItem>
                    ))}
                </Select>
                {error && error.categoryerror && (
                  <FormHelperText style={{ color: "red" }}>
                    {error && error.categoryerror}
                  </FormHelperText>
                )}
              </FormControl>
            </>
          </Grid>
          <Grid item xs={4}>
            <>
              <FormControl variant="outlined" className={classes.forms}>
                {!singletype && (
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                )}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleChange}
                  name="type"
                  value={singletype}
                >
                  {types &&
                    types.map((res) => (
                      <MenuItem key={res.id} value={res.id}>
                        {res.name}
                      </MenuItem>
                    ))}
                </Select>
                {error && error.typeerror && (
                  <FormHelperText style={{ color: "red" }}>
                    {error && error.typeerror}
                  </FormHelperText>
                )}
              </FormControl>
            </>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              disabled={disabledstate ? true : false}
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
