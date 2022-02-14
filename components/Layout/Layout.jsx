import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { Grid, Container, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AppBar from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
  const { title, withSidebar, withFooter, children } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Head>
        <title>{title} </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar withSidebar={withSidebar} />
      <Container
        maxWidth="xl"
        sx={{
          display: " flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FBFBFB",
        }}
      >
        <Grid
          container
          sx={{ minHeight: `calc(100vh - 16px)` }}
          justifyContent="flex-end"
        >
          <Grid item xs={withSidebar && !isMobile ? 9 : 12}>
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
