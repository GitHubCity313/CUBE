// Pour appeler un contexte, on importe le useContext de React
import React, { useState, useContext } from "react";
// Et le contexte aue l'on souhaite consommer (il peut en avoir plus d'un)
import AuthContext from "../context/authContext";
import {
  Grid,
  Stack,
  TextField,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Layout from "../components/Layout/Layout";
import Image from "next/image";
import Logo from "../public/logoMini.svg";
import Link from "next/link";

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // Ensuite, on recupere les infos qui nous interesse dans le contexte. 
  // Pour les connaitre -> GO context/authProvider -- En bas dans le useMemo
  const { signIn, error, resetError } = useContext(AuthContext);
  const [fields, setFields] = useState({ email: "", password: "" });

  // Met a jour le state qui controle la valeur des champs du formulaire
  // Et vide l'erreur histoire au'elle ne reste pas 15 ans apres modification
  const updateField = (e) => {
    if (error.length > 0) {
      resetError();
    }
    return setFields({ ...fields, [e.target.id]: e.target.value });
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
              {error !== null && (
                <Typography sx={{ color: "red" }}>{error}</Typography>
              )}
              <TextField
                id="email"
                label="Email"
                variant="filled"
                type="email"
                value={fields.username}
                onChange={updateField}
              />
              <TextField
                id="password"
                label="Mot de passe"
                variant="filled"
                type="password"
                value={fields.password}
                onChange={updateField}
              />
              <Stack sx={{ alignSelf: "end" }}>
                <Button
                  variant="bleuBtn"
                  onClick={() => signIn(fields, "/profile")}
                >
                  Se connecter
                </Button>
                <Typography>
                  {`Pas de compte? `}
                  <Link href="/signIn">
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
