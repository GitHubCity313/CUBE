import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { Grid, Container, Drawer } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = (props) => {
  const { title, withSidebar, withFooter, children } = props;

  return (
    <>
      <Head>
        <title>{title} </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          display: " flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container sx={{ minHeight: `calc(100vh - 16px)` }}>
          <Grid item xs={2}>
            {withSidebar && (
              <Drawer variant="permanent" open>
                <Sidebar />
              </Drawer>
            )}
          </Grid>

          <Grid item xs={withSidebar ? 10 : 12}>
            {children}
          </Grid>
          {withFooter && <Footer />}
        </Grid>
      </Container>
    </>
  );
};

Layout.defaultProps = {
  withSidebar: true,
  withFooter: false,
  title: "Cube",
};

Layout.propTypes = {
  withSidebar: PropTypes.bool,
  withFooter: PropTypes.bool,
  title: PropTypes.string,
};

export default Layout;
