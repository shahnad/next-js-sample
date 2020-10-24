import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    overflow:'hidden'
  },
  logincontainer:{
      textAlign:'center'
  }
});

const Login = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={4}>
          <div className={classes.logincontainer}>
              <form >
                  
              </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default Login;
