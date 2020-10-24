import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider, Grid } from "@material-ui/core";
import theme from "./material-ui/theme";
// import HomePage from "./components/Home/HomePage";
import SellerHeader from "./Layout/SellerHeader";
import LoaderImage from "../src/assets/timer.gif";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import routes from "./Layout/routes";

function App(props:any) {
  const [loading, setstate] = React.useState(false);
  React.useEffect(() => {
    setstate(true);
  }, []);
  return (
    <div>
      {loading ? (
        <div>
          <ThemeProvider theme={theme}>
            {/* <SellerHeader /> */}
            <div style={{ marginTop: 20 }}>
              <Router>
                <Switch>
                  {routes &&
                    routes.map((route, index) => (
                      <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                      />
                    ))}
                </Switch>
              </Router>
            </div>
            <div>
              <Router>
                <Switch>
                  {routes &&
                    routes.map((route, index) => (
                      <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        children={<route.main />}
                      />
                    ))}
                </Switch>
              </Router>
            </div>
          </ThemeProvider>
        </div>
      ) : (
        <div style={{ overflow: "hidden" }}>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Loading />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default App;
const Loading = () => {
  return (
    <div>
      <img
        src={LoaderImage}
        style={{ margin: "auto", display: "flex" }}
        alt=""
      />
    </div>
  );
};
