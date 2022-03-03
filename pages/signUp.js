import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/authContext";
import {
  Grid,
  TextField,
  Button,
  Typography,
  useMediaQuery,
  Box,
  Alert,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Layout from "../components/Layout/Layout";
import Image from "next/image";
import Logo from "../public/img/register.jpg";

const SignUp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => resetError, []);

  // Ensuite, on recupere les infos qui nous interesse dans le contexte.
  // Pour les connaitre -> GO context/authProvider -- En bas dans le useMemo
  const { signUp, error, resetError, isSignUpPending } =
    useContext(AuthContext);
  const [fields, setFields] = useState({
    email: "",
    password: "",
    lastName: "",
    firstName: "",
  });

  const updateField = (e) => {
    if (error.length > 0) {
      resetError();
    }
    return setFields({ ...fields, [e.target.id]: e.target.value });
  };

  return (
    <Layout title="Cube | Sign In" withSidebar={false} withFooter>
      <Grid
        container
        flexDirection={isMobile ? "column" : "row"}
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "50vh"}}
      >
        <Grid item xs={12} md={4} >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            pt={isMobile && 1}
          >
            <Image src={Logo} alt="Gouv" />
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
            <Stack flexDirection="center" alignItems="center">
              <Typography variant="h2">Inscription</Typography>
              {error !== "" && (
                <Typography sx={{ color: "gov.red" }} variant="caption">
                  {error}
                </Typography>
              )}
            </Stack>

            {isSignUpPending ? (
              <Alert severity="success">
                <Typography>
                  Votre inscription est bien enregistrée. Un mail de
                  confirmation vient de vous être envoyé
                </Typography>
              </Alert>
            ) : (
              <>
                <Grid
                  container
                  flexWrap={isMobile ? " none" : "wrap"}
                  flexDirection={isMobile ? " column" : "row"}
                  alignItems={"center"}
                  justifyContent={"space-around"}
                  rowSpacing={4}
                  mt={1}
                >
                  <Grid item>
                    <TextField
                      id="lastName"
                      label="Nom"
                      variant="filled"
                      required
                      value={fields.lastName}
                      onChange={updateField}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="firstName"
                      label="Prenom"
                      variant="filled"
                      required
                      value={fields.firstName}
                      onChange={updateField}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="password"
                      label="Mot de passe"
                      variant="filled"
                      type="password"
                      required
                      value={fields.password}
                      onChange={updateField}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="email"
                      label="Adresse email "
                      variant="filled"
                      required
                      value={fields.email}
                      onChange={updateField}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ alignSelf: "end", pr: isMobile ? 0 : 3, mt: 4 }}>
                  <Button
                    onClick={() => signUp(fields, "/profile")}
                    variant="bleuBtn"
                  >
                    S'inscrire
                  </Button>
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default SignUp;
