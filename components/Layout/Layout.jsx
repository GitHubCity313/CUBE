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
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container xs={12}>
          {withSidebar && (
            <Grid item xs={2}>
              <Drawer variant="permanent" open>
                <Sidebar />
              </Drawer>
            </Grid>
          )}

          {withFooter && <Footer />}

          <Grid item xs={withSidebar ? 10 : 12}>
            {children}
          </Grid>
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
