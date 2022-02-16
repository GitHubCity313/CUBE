import React, { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import Layout from "../components/Layout/Layout";

export default function Welcome() {
  return (
    <Layout title="Cube | Welcome">
      <Grid container flexDirection="column">
        <Grid
          container
          sx={{ ml: 3, mt: 22, pb: 3, borderBottom: "1px solid #E5E5E5" }}
          alignItems="center"
        >
          <Typography variant="h1" sx={{ pr: 2, color: "gov.blue" }}>
            Bienvenue sur Ressources Relationnelles
          </Typography>
          <Typography variant="body1" sx={{ pr: 2, color: "gov.blue" }}>
            Vous pouvez à présent vous connecter pour commencer à créer votre
            contenu
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
}
