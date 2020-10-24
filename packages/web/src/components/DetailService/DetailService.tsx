import React from "react";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, AppBar } from "../../material-ui/MaterialImports";
import { Tabs, Tab } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import LinearProgress from "@material-ui/core/LinearProgress";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ChatIcon from "@material-ui/icons/Chat";
import CakeIcon from "@material-ui/icons/Cake";
import WcIcon from "@material-ui/icons/Wc";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import { api } from "../../config/api";
import ReactImageMagnify from "react-image-magnify";
import Link from "@material-ui/core/Link";
import useStyles from "./DetailStyle";
import Slider from "react-slick";
import "./details.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";

export default function DetailService(props: any) {
  const classes = useStyles();
  let slug: any = useParams();
  const [servicedata, setservicedata] = React.useState([]);
  const [itemcount, setitemcount] = React.useState(1);
  const getServiceDetails = () => {
    api.get(`/service/${atob(slug.id)}`).then((res: any) => {
      console.log(res.data.data[0], "res.data.data");

      setservicedata(res.data.data[0]);
    });
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);

    getServiceDetails();
  }, []);

  const ChangeCount = (process: any) => {
    if (process === "add") {
      setitemcount(itemcount + 1);
    } else {
      if (itemcount >= 0) {
        setitemcount(1);
      } else {
        setitemcount(itemcount - 1);
      }
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction="row" justify="center">
        <Grid item xs={10} sm={10} md={5} lg={5}>
          <ItemImage servicedata={servicedata} />
        </Grid>
        <Grid item xs={10} sm={10} md={5} lg={5}>
          <ItemDetails
            servicedata={servicedata}
            itemcount={itemcount}
            ChangeCount={ChangeCount}
          />
        </Grid>
        <Grid item xs={10} sm={10} md={5} lg={5}>
          <Description />
        </Grid>
        <Grid item xs={10} sm={10} md={5} lg={5}></Grid>
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <AlignItemsList />
        </Grid>
      </Grid>
    </div>
  );
}

function ItemImage({ servicedata }: any) {
  const classes = useStyles();
  const images: any = [
    {
      id: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQlODRk_O003vlcnQmEpBnpU-gTHhUmhSPOhg&usqp=CAU",
    },
    {
      id: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqH6PIWhNLXxeytQq58glOQuLhHxHlvJ4CFw&usqp=CAU",
    },
    {
      id: 3,
      image: "https://m.media-amazon.com/images/I/41+fXlXMPyL._SR500,500_.jpg",
    },
    {
      id: 4,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/611ZsR2eJsL._SL1500_.jpg",
    },
    {
      id: 5,
      image: "https://m.media-amazon.com/images/I/41+fXlXMPyL._SR500,500_.jpg",
    },
  ];

  var settings = {
    customPaging: function (i: any) {
      return (
        <a key={i}>
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "sss",
                isFluidWidth: false,
                src: images[i].image,
                width: 80,
                height: 80,
              },
              largeImage: {
                src: images[i].image,
                isFluidWidth: false,
                width: 0,
                height: 0,
                lensStyle: { height: 400 },
              },
            }}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // centerPadding: "0px",
    arrows: false,
  };

  return (
    <div className={classes.card}>
      <Box display="flex" flexDirection="row" justifyContent="space-evenly">
        <Slider {...settings} className={classes.fullwidth}>
          {images.map((element: any, i: any) => (
            <div>
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: element.id,
                    isFluidWidth: false,
                    src: element.image,
                    width: 300,
                    height: 300,
                  },
                  largeImage: {
                    src: element.image,
                    isFluidWidth: false,
                    width: 1200,
                    height: 1800,
                  },
                  enlargedImageContainerDimensions: {
                    width: "200%",
                    height: "200%",
                  },
                }}
              />
            </div>
          ))}
        </Slider>
      </Box>
    </div>
  );
}

const Description = () => {
  const classes = useStyles();
  return (
    <div>
      <Box display="flex" flexDirection="column">
        {/* <div className={classes.title}>
          <Typography variant="body1" gutterBottom>
            Specification
          </Typography>
        </div> */}
        <div className={classes.descriptioncontent}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <CheckIcon className={classes.smallIcon} />
                <Typography
                  variant="caption"
                  className={classes.smalltitle}
                  gutterBottom
                >
                  Language : English
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <FavoriteIcon className={classes.smallIcon} />
                <Typography
                  variant="caption"
                  className={classes.smalltitle}
                  gutterBottom
                >
                  Avg. Likes : 22334
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <LocationOnIcon className={classes.smallIcon} />
                <Typography
                  variant="caption"
                  className={classes.smalltitle}
                  gutterBottom
                >
                  country : United Kingdom
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <ChatIcon className={classes.smallIcon} />
                <Typography
                  variant="caption"
                  className={classes.smalltitle}
                  gutterBottom
                >
                  Avg Comment : 4556
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <CakeIcon className={classes.smallIcon} />
                <Typography
                  variant="caption"
                  className={classes.smalltitle}
                  gutterBottom
                >
                  Age : 17-25
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <ViewComfyIcon className={classes.smallIcon} />
                <Typography
                  variant="caption"
                  className={classes.smalltitle}
                  gutterBottom
                >
                  Total Posts: 234
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <WcIcon className={classes.smallIcon} />
                <Typography
                  variant="caption"
                  className={classes.smalltitle}
                  gutterBottom
                >
                  Gender : Male
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>

        {/* <div className={classes.title}>
          <Typography variant="body1" gutterBottom>
            Description
          </Typography>
        </div> */}
        <div className={classes.descriptioncontent}>
          <Typography variant="body2" gutterBottom>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et
            excepturi cum aut, minus ipsum necessitatibus dolores fuga?
            Perspiciatis ducimus magni quo officia animi quaerat, architecto
            laudantium consequatur odio sint. Hic!
          </Typography>
        </div>
      </Box>
    </div>
  );
};

const Reviews = () => {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(50);
  return (
    <div>
      <Box display="flex" flexDirection="row">
        <Typography className={classes.rating} variant="h6" gutterBottom>
          27 Reviews
        </Typography>
        <Rating
          name="read-only"
          className={classes.rating}
          value={4}
          readOnly
        />
      </Box>

      <Grid container justify="flex-start" spacing={3}>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <div className={classes.margintop}>
            <Box
              display="flex"
              flexDirection="row"
              className={classes.marginbox}
            >
              <Typography
                className={classes.rating}
                variant="subtitle1"
                gutterBottom
              >
                4 Stars
              </Typography>
              <LinearDeterminate data={45} />
              <Typography
                className={classes.rating}
                variant="subtitle1"
                gutterBottom
              >
                (45)
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              className={classes.marginbox}
            >
              <Typography
                className={classes.rating}
                variant="subtitle1"
                gutterBottom
              >
                3 Stars
              </Typography>
              <LinearDeterminate data={8} />
              <Typography
                className={classes.rating}
                variant="subtitle1"
                gutterBottom
              >
                (8)
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              className={classes.marginbox}
            >
              <Typography
                className={classes.rating}
                variant="subtitle1"
                gutterBottom
              >
                2 Stars
              </Typography>
              <LinearDeterminate data={6} />
              <Typography
                className={classes.rating}
                variant="subtitle1"
                gutterBottom
              >
                (6)
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              className={classes.marginbox}
            >
              <Typography
                className={classes.rating}
                variant="subtitle1"
                gutterBottom
              >
                1 Stars
              </Typography>
              <LinearDeterminate data={11} />
              <Typography
                className={classes.rating}
                variant="subtitle1"
                gutterBottom
              >
                (11)
              </Typography>
            </Box>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

function LinearDeterminate({ data }: any) {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(data);

  return (
    <div className={classes.progress}>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
}

function AlignItemsList(props: any) {
  const classes = useStyles();
  const RateTest = () => {
    return (
      <div>
        <Box display="flex" flexDirection="row">
          <Typography
            variant="body2"
            className={classes.centerdiv}
            gutterBottom
          >
            Anus 9898
          </Typography>
          <Rating
            name="read-only"
            className={classes.rating}
            value={1}
            max={1}
            readOnly
          />
          <Typography
            variant="body2"
            className={classes.centerdiv}
            gutterBottom
          >
            5
          </Typography>
        </Box>
      </div>
    );
  };

  return (
    <List className={classes.list}>
      {[1, 2, 3].map((element: any, i: number) => (
        <React.Fragment key={i}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/1.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              primary={<RateTest />}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    CANADA
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    className={classes.smalltitle}
                    gutterBottom
                  >
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea
                    nobis dolorem, quibusdam aliquam sit tempore voluptatibus
                    totam magni voluptatum debitis esse, sunt ducimus minima
                    ipsum qui quas? Nam, earum neque.
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}

const ItemDetails = ({ servicedata, ChangeCount, itemcount }: any) => {
  const classes = useStyles();
  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();
  return (
    <div>
      <Box display="flex" flexDirection="column" justifyContent="flex-start">
        <Typography variant="h4" gutterBottom>
          {servicedata.title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          body2. Lorem ipsum dolor sit amet, consec
        </Typography>

        <Box display="flex" flexDirection="row">
          <Rating
            name="read-only"
            className={classes.rating}
            value={4}
            readOnly
          />
          <Typography
            variant="body2"
            className={classes.centerdiv}
            gutterBottom
          >
            <Link href="#" onClick={preventDefault}>
              5333 Reviews ||
            </Link>
          </Typography>

          <Typography
            variant="body2"
            className={classes.centerdiv}
            gutterBottom
          >
            <Link href="#" onClick={preventDefault}>
              1323 comments
            </Link>
          </Typography>
        </Box>
        <Divider />
        <Grid container spacing={3} direction="row" justify="center">
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <PriceDeatils itemcount={itemcount} ChangeCount={ChangeCount} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <StockDetails itemcount={itemcount} ChangeCount={ChangeCount} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <DeliveryDetails itemcount={itemcount} ChangeCount={ChangeCount} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

const PriceDeatils = ({ itemcount }: any) => {
  const classes = useStyles();
  return (
    <div>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" className={classes.margintop}>
          <Typography
            variant="body1"
            className={classes.centerdiv}
            gutterBottom
          >
            M.R.P :
          </Typography>
          <Typography
            variant="caption"
            className={classes.oldprice}
            gutterBottom
          >
            $ {itemcount * 6060}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row">
          <Typography
            variant="body1"
            className={classes.centerdiv}
            gutterBottom
          >
            Price :
          </Typography>
          <Typography variant="h4" className={classes.newPrice} gutterBottom>
            $ {itemcount * 3060}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" className={classes.margintop}>
          <Typography
            variant="body1"
            className={classes.centerdiv}
            gutterBottom
          >
            You Save :
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{ margin: "auto 5px" }}
          >
            $ {itemcount * 3000}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row">
          <Typography
            variant="body1"
            className={classes.smalltext}
            gutterBottom
          >
            (inclusive of all taxes)
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

const StockDetails = ({ itemcount }: any) => {
  const classes = useStyles();
  return (
    <div>
      <Box display="flex" flexDirection="column" className={classes.margintop}>
        {/* <Box display="flex" flexDirection="row"> */}
        <Typography variant="caption" display="block" gutterBottom>
          Sold by Appario Retail Private Ltd and Fulfilled by Amazon.
        </Typography>
        <div className={classes.stockdiv}>
          <Button color="secondary" variant="contained">
            PURCHASE ({itemcount})
          </Button>
        </div>
      </Box>
    </div>
  );
};

const DeliveryDetails = ({ ChangeCount, itemcount }: any) => {
  const classes = useStyles();

  return (
    <div>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row">
          <Typography variant="body1" gutterBottom>
            <Link>Free Delivery :</Link>
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            className={classes.deliverydetails}
          >
            Monday, Sep 14 on orders over ₹ 499.00 shipped by Amazon.
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row">
          <label htmlFor="icon-button-RemoveIcon">
            <IconButton
              color="primary"
              aria-label="upload RemoveIcon"
              component="span"
              onClick={() => ChangeCount("remove")}
            >
              <RemoveIcon />
            </IconButton>
          </label>
          <form noValidate autoComplete="off" style={{ width: "10%" }}>
            <TextField
              id="outlined-basic"
              disabled
              value={itemcount}
              variant="outlined"
            />
          </form>

          <label htmlFor="icon-button-AddIcon">
            <IconButton
              color="primary"
              aria-label="AddIcon"
              onClick={() => ChangeCount("add")}
              component="span"
            >
              <AddIcon />
            </IconButton>
          </label>
        </Box>
      </Box>
    </div>
  );
};
