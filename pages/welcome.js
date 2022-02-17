import React, { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import Layout from "../components/Layout/Layout";

export default function Welcome() {
  return (
    <Layout title="Cube | Welcome" withFooter>
      <Grid container flexDirection="column">
        <Grid
          container
          sx={{ ml: 3, pb: 3 }}
          alignItems="center"
          flexDirection="column"
        >
          <Typography variant="h1" sx={{ pr: 2, color: "gov.blue" }}>
            Bienvenue sur Ressources Relationnelles
          </Typography>
          <Typography variant="body1" sx={{ p: 3, my: 4, color: "gov.white", backgroundColor: "gov.lightMenthe"  }}>
            Votre compte est désormais validé.
          </Typography>
          <Typography variant="body1" sx={{ pr: 2 }}>
            Vous pouvez à présent vous connecter pour commencer à créer votre
            contenu
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
}
