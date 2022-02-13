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

const SignIn = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Layout title="Cube | Sign In" withSidebar={false} withFooter>
      <Grid
        container
        flexDirection={isMobile ? "column" : "row"}
        justifyContent="center"
        alignItems="center"
        sx={{ pt: 20 }}
      >
        <Grid item xs={12} md={4}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            pt={isMobile && 1}
          >
            <Image
              src={Logo}
              width={isMobile ? 125 : 250}
              height={isMobile ? 125 : 250}
              alt="Gouv"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={7}>
          <Grid
            container
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            pt={isMobile && 5}
          >
            <Box sx={{ alignSelf: "center" }}>
              <Typography variant="h2">Inscription</Typography>
            </Box>
            <Grid
              container
              flexWrap={isMobile ? " none" : "wrap"}
              flexDirection={isMobile ? " column" : "row"}
              alignItems={"center"}
              justifyContent={"space-around"}
              rowSpacing={4}
            >
              <Grid item>
                <TextField
                  id="filled-basic"
                  label="Nom"
                  variant="filled"
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  id="filled-basic"
                  label="Prenom"
                  variant="filled"
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  id="filled-basic"
                  label="Mot de passe"
                  variant="filled"
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  id="filled-basic"
                  label="Adresse email "
                  variant="filled"
                  required
                />
              </Grid>
            </Grid>
            <Box sx={{ alignSelf: "end", pr: isMobile ? 0 : 3, mt: 4 }}>
              <Button variant="bleuBtn">S'inscrire</Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default SignIn;
