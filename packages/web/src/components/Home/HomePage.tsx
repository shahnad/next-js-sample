import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography/Typography";

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { categoryList } from "./categoryList";
import { useHistory } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import LoaderImage from "../../assets/loader.gif";
import { api } from "../../config/api";
import Nodata from "../../assets/images/1.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: "hidden",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.primary,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    media: {
      height: 190,
    },
    card: {
      padding: 30,
    },
    form: {
      flex: "auto",
    },
    show: {
      flex: 10,
      margin: "auto",
    },
    resetbutton: {
      height: "fit-content",
      margin: "auto",
    },
    cartbutton: {
      width: "100%",
      margin: "auto",
    },
    addcartbutton: {
      width: "100%",
      margin: "auto",
    },
    selected: {
      backgroundColor: "#007bff !important",
      color: "white !important",
    },
    itemtitle: {
      cursor: "pointer",
    },
    cardContent: {
      height: 88,
    },
    pagination: {
      display: "flex",
      justifyContent: "flex-end",
      margin: "30px auto",
    },
    container: {
      // height:'500px',
      marginTop: 20,
    },
    nodata: {
      display: "flex",
      justifyContent: "center",
      margin: "auto",
    },
  })
);
let timeout: any = 0;
export default function HomePage(props: any) {
  const classes = useStyles();
  const [category, setCategory] = useState([]);
  const [types, setTypes] = useState([]);
  const [service, setservice] = useState([]);
  const [sorttype, setSorttype] = React.useState("ASC");
  const [search, setsearch] = useState("");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [selectedTypeIndex, setSelectedTypeIndex] = React.useState(0);
  const [loading, setloading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [total, settotal] = useState("");

  React.useEffect(() => {
    getCategories();
    getTypes();
    getServices();
  }, [sorttype, search, selectedCategoryIndex, selectedTypeIndex, page]);

  const handleCategoryListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: any
  ) => {
    console.log(index);
    setSelectedCategoryIndex(index);
  };

  const handleChangeSort = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSorttype(event.target.value as string);
  };

  const SearchData = (e: any) => {
    let value = e.target.value;
    setPage(0);
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      setsearch(value);
    }, 500);
  };

  const handleTypeListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: any
  ) => {
    console.log(index);

    setSelectedTypeIndex(index);
  };

  const getCategories = () => {
    api
      .get(`/category?filter=%7B%7D&range=0&range=20&sort=id&sort=ASC`)
      .then((res: any) => {
        setCategory(res.data.data);
      });
  };

  const getTypes = () => {
    api
      .get("/types?filter=%7B%7D&range=0&range=9&sort=id&sort=ASC")
      .then((res: any) => {
        setTypes(res.data.data);
      });
  };
  const getServices = () => {
    setloading(false);
    
    api
      .get(
        `/service?filter=%7B%22q%22%3A%22${search}%22%7D&category=${selectedCategoryIndex}&type=${selectedTypeIndex}&pageno=${page}&sort=price&sort=${sorttype}`
      )
      .then((res: any) => {
        setservice(res.data.data);
        console.log(res.data);
        settotal(res.data.total);
        setloading(true);
      })
      .catch((err: any) => {
        setloading(false);
      });
  };
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction="row" justify="center">
        <Grid item xs={10} sm={3} md={3} lg={2}>
          <SidbarData
            category={category}
            selectedCategoryIndex={selectedCategoryIndex}
            types={types}
            sorttype={sorttype}
            handleChangeSort={handleChangeSort}
            handleCategoryListItemClick={handleCategoryListItemClick}
            selectedTypeIndex={selectedTypeIndex}
            handleTypeListItemClick={handleTypeListItemClick}
          />
        </Grid>
        <Grid item xs={10} sm={8} md={8} lg={8}>
          <MainContainer
            service={service}
            SearchData={SearchData}
            loading={loading}
          />
          {service.length ? (
            <PaginationData
              page={page}
              count={total}
              handleChangePage={handleChangePage}
            />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </div>
  );
}

const SidbarData = ({
  category,
  types,
  sorttype,
  handleChangeSort,
  selectedCategoryIndex,
  handleCategoryListItemClick,
  selectedTypeIndex,
  handleTypeListItemClick,
}: any) => {
  return (
    <Box display="flex" flexDirection="column">
      <SortData sorttype={sorttype} handleChangeSort={handleChangeSort} />
      <CategoryList
        category={category}
        selectedCategoryIndex={selectedCategoryIndex}
        handleCategoryListItemClick={handleCategoryListItemClick}
      />
      <Typelists
        types={types}
        selectedTypeIndex={selectedTypeIndex}
        handleTypeListItemClick={handleTypeListItemClick}
      />
    </Box>
  );
};

const SortData = ({ sorttype, handleChangeSort }: any) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h6" className={classes.title}>
        sort
      </Typography>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={sorttype}
          onChange={handleChangeSort}
          label="Age"
        >
          <MenuItem value={"DESC"}>Price:Low to High</MenuItem>
          <MenuItem value={"ASC"}>Price:High to Low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

const CategoryList = ({
  category,
  selectedCategoryIndex,
  handleCategoryListItemClick,
}: any) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        Category
      </Typography>
      <div className={classes.demo}>
        <List component="nav" aria-label="primary mailbox folder">
          {category &&
            category.map((item: any, i: number) => (
              <ListItem
                key={i}
                button
                classes={{
                  selected: classes.selected,
                }}
                selected={selectedCategoryIndex === i}
                onClick={(event) => handleCategoryListItemClick(event, i)}
              >
                <ListItemText primary={item.category} />
              </ListItem>
            ))}
        </List>
      </div>
    </div>
  );
};

const Typelists = ({
  types,
  selectedTypeIndex,
  handleTypeListItemClick,
}: any) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        Types
      </Typography>
      <div className={classes.demo}>
        <List component="nav" aria-label="primary mailbox folder">
          {types &&
            types.map((type: any, i: number) => (
              <ListItem
                button
                key={i}
                classes={{
                  selected: classes.selected,
                }}
                selected={selectedTypeIndex === i}
                onClick={(event) => handleTypeListItemClick(event, i)}
              >
                <ListItemText primary={type.name} />
              </ListItem>
            ))}
        </List>
      </div>
    </div>
  );
};
const MainContainer = ({ service, SearchData, loading }: any) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column">
      <SearchFields SearchData={SearchData} />
      {loading ? (
        <Grid spacing={3} container className={classes.container}>
          {service &&
            service.map((element: any, i: number) => (
              <Grid item xs={12} md={6} sm={6} lg={4} key={i}>
                <MediaCard index={i} element={element} />
              </Grid>
            ))}
          {service.length === 0 && (
            <Grid item xs={12} md={6} sm={6} lg={4} className={classes.nodata}>
              <NoDataFound />
            </Grid>
          )}
        </Grid>
      ) : (
        <Grid
          spacing={3}
          container
          direction="row"
          justify="center"
          className="m-t-20"
          alignContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={6} sm={6} lg={4}>
            <Loading />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

const SearchFields = ({ SearchData }: any) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="row">
      <Typography variant="subtitle2" gutterBottom className={classes.show}>
        Showing 1 - 5 of 5 Results
      </Typography>

      <form className={classes.form}>
        <TextField
          id="outlined-search"
          placeholder="Search"
          onChange={SearchData}
          label="Search"
          type="search"
          variant="outlined"
        />
      </form>
    </Box>
  );
};

function MediaCard({ element, index }: any) {
  const classes = useStyles();
  let history = useHistory();
  const [state, setstate] = useState(false);
  const handleNameClick = (element: any) => {

    let id = btoa(element.id)
    console.log(id);
    
    history.push(`/detail/${id}`);
  };
  const handleAddtocartClick = (i: any) => {
    setstate(!state);
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={element.image}
        title={element.title}
      />
      <CardContent className={classes.cardContent}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.itemtitle}
          onClick={() => handleNameClick(element)}
          color="primary"
        >
          {element.title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          ${element.price}
        </Typography>
      </CardContent>
      <CardActions>
        {!state ? (
          <Button
            size="small"
            className={classes.cartbutton}
            variant="contained"
            onClick={() => handleAddtocartClick(index)}
            color="secondary"
          >
            Add to cart
          </Button>
        ) : (
          <Button
            size="small"
            onClick={() => handleAddtocartClick(index)}
            className={classes.addcartbutton}
            variant="contained"
            color="primary"
          >
            Added to cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

const PaginationData = ({ page, handleChangePage, count }: any) => {
  const classes = useStyles();
  let countdata = count / 10;
  let pagelimit = Math.round(countdata);

  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Pagination
          page={page}
          count={pagelimit}
          onChange={handleChangePage}
          color="secondary"
          // variant="outlined"
          showFirstButton
          showLastButton
          className={classes.pagination}
        />
      </Grid>
    </Grid>
  );
};
const Loading = () => {
  return (
    <div>
      <img src={LoaderImage} style={{ width: "46%", zIndex: 10000 }} alt="" />
    </div>
  );
};
const NoDataFound = () => {
  return (
    <div style={{ margin: "auto" }}>
      <img style={{ width: "150px" }} src={Nodata} alt="" />
      <Typography variant="h6" gutterBottom>
        No Items Found
      </Typography>
    </div>
  );
};
