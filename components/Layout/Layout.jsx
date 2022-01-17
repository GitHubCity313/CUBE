import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { Grid } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = (props) => {
  const { title, withSidebar, children } = props;

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <Head>
        <title>{title} </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Grid container flexDirection="row" alignItems="center">
        {withSidebar && (
          <Grid item xs>
            <Sidebar />
          </Grid>
        )}
        <Grid
          item
          xs={withSidebar ? 9 : 12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "100vh",
            pt: 18
          }}
        >
          {children}
          <Footer />
        </Grid>
      </Grid>
    </Grid>
  );
};

Layout.defaultProps = {
  withSidebar: true,
  title: "Cube",
};

Layout.propTypes = {
  withSidebar: PropTypes.bool,
  title: PropTypes.string,
};

export default Layout;
