import React from "react";
import PropTypes from "prop-types";
import { Grid, Stack, TextField, Button, Typography } from "@mui/material";
import Layout from "../components/Layout/Layout";
import Image from "next/image";
import Logo from "../public/logoMini.svg";

const Login = () => {
  return (
    <Layout title="Cube | Login" withSidebar={false}>
      <Grid container sx={{ minHeight: "85vh"}}>
        <Grid item xs={6}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ height : "80vh"}}
          >
            <Image src={Logo} width={250} height={250} alt="Gouv" />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Stack spacing={3}>
            <Typography variant="h2">Se connecter</Typography>
            <TextField
              id="filled-basic"
              label="Nom d'utilisateur"
              variant="filled"
            />
            <TextField
              id="filled-basic"
              label="Mot de passe"
              variant="filled"
            />
            </Stack>
            <Stack alignItems="flex-end" mt={3}>
            <Button variant="contained">Connexion</Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Login;
