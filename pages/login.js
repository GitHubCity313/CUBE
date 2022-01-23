import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Stack,
  TextField,
  Button,
  Typography,
  useMediaQuery,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Layout from "../components/Layout/Layout";
import Image from "next/image";
import Logo from "../public/logoMini.svg";
import Link from "next/link";

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Layout title="Cube | Login" withSidebar={false} withFooter>
      <Grid
        container
        flexDirection={isMobile ? "column-reverse" : "row"}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: isMobile && 12 }}
      >
        <Grid item xs={12} md={6}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            pt={isMobile && 12}
          >
            <Image
              src={Logo}
              width={isMobile ? 125 : 250}
              height={isMobile ? 125 : 250}
              alt="Gouv"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid
            container
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Stack spacing={3}>
              <Typography variant="h2">Connexion</Typography>
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
              <Stack sx={{ alignSelf: "end" }}>
                <Button variant="bleuBtn">Se connecter</Button>
                <Typography>
                 {`Pas de compte? `}
                  <Link href="signIn">
                    <a>S'inscrire </a>
                  </Link>
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Login;
