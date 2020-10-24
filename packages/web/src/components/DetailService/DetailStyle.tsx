import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

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
    media: {
      width: 405,
      // borderRadius: "50%",
      height: 405,
    },
    card: {
      padding: 20,
      width:'160%',
      zIndex:5
    },
    centerdiv: {
      margin: "auto 0",
    },
    smallIcon: {
      fontSize: 16,
      color: "green",
      margin: "auto",
    },
    smalltitle: {
      margin: "auto 5px",
      flex: "auto",
    },
    continuebutton: {
      height: 60,
      backgroundColor: "green",
      color: "white",
      width: "100%",
    },
    contactsellerbutton: {
      marginTop: 30,
      color: "black",
      width: "100%",
    },
    title: {
      backgroundColor: "#000",
      padding: "5px 0 5px 10px",
      color: "white",
      //   borderRadius: "15px 15px 0 0",
    },
    descriptioncontent: {
      marginTop: 20,
      marginBottom: 20,
      textAlign: "justify",
    },
    rating: {
      margin: "auto 5px",
      fontSize: 15,
      zIndex:-5
    },
    progress: {
      margin: "auto",
      flexGrow: 1,
    },
    margintop: {
      marginTop: 20,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      flex: "auto",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    tabsubtitle: {
      margin: "20px 0",
    },
    sortby: {
      margin: "auto 5px",
      flex: 1,
    },
    inline: {
      display: "inline",
    },
    marginbox: {
      margin: "10px auto",
    },
    list: {
      flexGrow: 1,
      marginBottom: 30,
    },
    fullwidth: {
      width: "100%",
      paddingBottom: 80,
    },
    oldprice: {
      textDecoration: "line-through",
      margin: "auto 15px",
      color: "red",
    },
    newPrice: {
      margin: "auto 15px",
      color: "green",
    },
    stockdiv: {
      textAlign: "left",
      zIndex:-5
    //   backgroundColor: "#0b5216",
    //   color: "white",
    },
    instock: {
      margin: "auto",
      padding: 5,
    },
    smalltext: {
      fontSize: 12,
      color: "green",
    },
    deliverydetails: {
      fontSize: 14,
      margin:'auto 10px'
    },
  })
);
export default useStyles;
