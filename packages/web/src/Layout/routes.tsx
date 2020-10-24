import React from "react";
import HomePage from "../components/Home/HomePage";
import DetailService from "../components/DetailService/DetailService";
import Checkout from "../components/checkout/Checkout";
import Login from "../auth/Login";



const routes = [
  {
    path: "/shoutcart",
    exact: true,
    main: () => <HomePage />,
  },
  {
    path: "/detail/:id",
    exact:  false,
    main: () => <DetailService />,
  },
  {
    path: "/checkout",
    exact:  false,
    main: () => <Checkout />,
  },
  {
    path: "/login",
    exact:  false,
    main: () => <Login />,
  },

];

export default routes;
