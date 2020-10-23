import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Layout from "../components/Layout";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Editusers(props) {
  const classes = useStyles();
  const { user,id } = props;


  return (
    <Layout {...props}>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {user && user.website}
          </Typography>
          <Typography variant="h5" component="h2">
            {user && user.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {user && user.email}
          </Typography>
          <Typography variant="body2" component="p">
            {user && user.company && user.company.name}
            <br />
            {user && user.company && user.company.bs}
            <br />
            {user && user.company && user.company.catchPhrase}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Layout>
  );
}
Editusers.getInitialProps = async ({ query }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${query.pid}`
  );
  const json = await res.json();
  return {
    user: json,
    id:query.pid?query.pid:null
  };
};

export default Editusers;
