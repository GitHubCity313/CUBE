import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Layout from "../components/Layout/Layout";
import Image from "next/image";
import Logo from "../public/logoMini.svg";

const Login = () => {
  return (
    <Layout title="Cube | Login" withSidebar={false}>
      <Grid container>
        <Grid item xs={6}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ p: 4, minHeight: "70vh" }}
          >
            <Image
              src={Logo}
              width={250}
              height={250}
              alt="Gouv"
            />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ p: 4, backgroundColor: "green", minHeight: "70vh" }}
          >
            Ici le beau login form
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Login;
