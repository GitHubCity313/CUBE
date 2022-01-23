import React from "react";
import PropTypes from "prop-types";
import { parse } from "date-fns";
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
import APIService from "../services/APIService";

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  //! Pour demo - a virer ensuite 
  //! Pour utiliser, decommenter le bouton en commentaire dans le composant
  const add = async () => {
    try {
      // const mockedResource = {
      //   resourceType: "event",
      //   categories: ["61e17b033d88f191f3f9226f"],
      //   author: "61e17a1d3d88f191f3f8f6fc",
      //   hasParticipants: [],
      //   moderationValidation: false,
      //   publicationStatus: "public",
      //   name: "Distribution de fournitures scolaires pour la rentrée",
      //   contentId: "1",
      //   createdAt: Date.now(),
      //   //startDate: parse("2022-01-06").getTime(),
      //   //endDate: parse("2022-03-06").getTime(),
      //   place: {
      //     city: "Lille",
      //     zipCode: "59000",
      //     region: "Hauts-de-France",
      //   },
      //   likes: 0,
      // };
      // Pour l'update - retirer l'id de l'objet et ne donner a l'API que les champs a modifier
      const id = "61e177193d88f191f3f8589c";

      const mockedResource = {
        name: "Distribution de fournitures scolaires",
      };
      //const test = await APIService.createItem("resources", mockedResource);
      // const plop = await APIService.getItems("resources");
      const test = await APIService.updateItem(
        "resources",
        id,
        mockedResource
      );

      console.log(test);
    } catch (err) {
      console.log(" deso");
      console.log(err);
    }
  };

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
                  <Link href="/signIn">
                    <a>S'inscrire </a>
                  </Link>
                </Typography>
              </Stack>
            </Stack>

            <Box sx={{ alignSelf: "end" }}>
              {/* <Button onClick={add} variant="bleuBtn">
                Add resources
              </Button> */}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Login;
