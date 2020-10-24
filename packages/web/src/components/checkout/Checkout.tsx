import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Box, Typography, TextField, Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import DeleteIcon from "@material-ui/icons/Delete";
import { api } from "../../config/api";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: "hidden",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    form: {
      margin: 10,
    },
    icon: {
      fontSize: 22,
    },
    flex: {
      flex: 12,
    },
    total: {
      backgroundColor: "#80808026",
    },
  })
);

export default function Checkout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" spacing={3}>
        <Grid item xs={10} md={5} sm={10} lg={5}>
          <ShippingAddress />
        </Grid>
        <Grid item xs={10} md={5} sm={10} lg={5}>
          <YourCart />
        </Grid>
      </Grid>
    </div>
  );
}
const ShippingAddress = () => {
  const classes = useStyles();

  const onChangeHandler = (event: any) => {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    console.log(data, "event.target.files[0]");

    api.post("/upload", data).then((res: any) => {
      console.log(res, "resssssssssss");
    });
  };
  return (
    <div>
      <Box display="flex" flexDirection="column">
        <Typography variant="h6" gutterBottom>
          ShippingAddress
        </Typography>

        <form noValidate autoComplete="off">
          {/* <Box display="flex" flexDirection="column">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              className={classes.form}
            />
            <TextField
              id="outlined-basic"
              label="Street"
              variant="outlined"
              className={classes.form}
            />
            <TextField
              id="outlined-basic"
              label="city"
              variant="outlined"
              className={classes.form}
            />
          </Box>
          <Box display="flex" flexDirection="row">
            <TextField
              id="outlined-basic"
              label="country"
              variant="outlined"
              className={classes.form}
            />
            <TextField
              id="outlined-basic"
              label="province"
              variant="outlined"
              className={classes.form}
            />
            <TextField
              id="outlined-basic"
              label="postal code"
              variant="outlined"
              className={classes.form}
            />
          </Box> */}
          <input type="file" name="file" onChange={onChangeHandler} />
          <Button variant="contained" color="primary" className={classes.form}>
            Buy Now
          </Button>
        </form>
      </Box>
    </div>
  );
};
const YourCart = () => {
  const classes = useStyles();
  return (
    <div>
      <Box display="flex" flexDirection="column">
        <Typography variant="h6" gutterBottom>
          Your cart
        </Typography>
        <List className={classes.root}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Photos"
              className={classes.flex}
              secondary="x 1"
            />
            <ListItemText primary="$189.99" />
            <ListItemText primary={<DeleteIcon className={classes.icon} />} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Photos"
              className={classes.flex}
              secondary="x 1"
            />
            <ListItemText primary="$189.99" />
            <ListItemText primary={<DeleteIcon className={classes.icon} />} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Photos"
              className={classes.flex}
              secondary="x 1"
            />
            <ListItemText primary="$189.99" />
            <ListItemText primary={<DeleteIcon className={classes.icon} />} />
          </ListItem>

          <ListItem className={classes.total}>
            <ListItemText primary="TOTAL (CAD)" className={classes.flex} />
            <ListItemText primary="$189.99" />
          </ListItem>
        </List>
      </Box>
    </div>
  );
};
