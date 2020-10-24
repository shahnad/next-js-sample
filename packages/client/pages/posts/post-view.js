import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

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

function PostView(props) {
  const classes = useStyles();
  const router = useRouter();
  const { post } = props;

  const handleBack = () => {
    router.back();
  };
  return (
    <Layout {...props}>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Word of the Day
          </Typography>
          <Typography variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography variant="body2" component="p">
            {post.body}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={handleBack}
            variant="contained"
            color="primary"
          >
            {" "}
            Back
          </Button>
        </CardActions>
      </Card>
    </Layout>
  );
}
PostView.getInitialProps = async ({ query }) => {
  const res = await fetch(`${process.env.customKey}posts/${query.pid}`);
  const json = await res.json();
  return {
    post: json,
    id: query.pid ? query.pid : null,
  };
};
export default PostView;
