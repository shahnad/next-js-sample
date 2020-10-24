import "../styles/globals.css";
import { useRouter } from "next/router";
import React from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();



  return <Component {...pageProps} />;
}

export default MyApp;
