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
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Container
        maxWidth="xl"
        sx={{
          display: " flex",
          flexDirection: "row",
          alignItems: withSidebar ? "end" : "center",
          backgroundColor: "#FBFBFB",
        }}
      >
        <Grid item xs={withSidebar && !isMobile && 3}>
          <AppBar withSidebar={withSidebar} />
        </Grid>
        <Grid item xs={withSidebar && !isMobile ? 9 : 12}>
          <Grid
            container
            flexDirection="column"
            justifyContent={withFooter ? "space-between" : "center"}
            sx={{ width: "100%", minHeight: "calc(100vh - 20px)" }}
          >
            <Grid
              item
              xs={12}
              sx={{
                mt: "146px",
              }}
            >
              {children}
            </Grid>
            {withFooter && (
              <Grid
                item
                xs={12}
                sx={{
                  mt: 3,
                }}
              >
                <Footer />
              </Grid>
            )}
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
  children: PropTypes.node.isRequired,
};

export default Layout;
