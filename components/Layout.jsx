import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { Grid } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Layout = (props) => {
  const { title, withSidebar, children } = props;

  return (
    <Grid container fluid>
      <Head>
        <title>{title} </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {withSidebar && <Sidebar />}
      {children}
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
