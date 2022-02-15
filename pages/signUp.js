import React, { useContext } from "react";
import AuthContext from "../context/authContext";
import {
  Grid,
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

const SignUp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Ensuite, on recupere les infos qui nous interesse dans le contexte.
  // Pour les connaitre -> GO context/authProvider -- En bas dans le useMemo
  const { signUp, error, resetError } = useContext(AuthContext);
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
                  value={field.lastName}
                  onChange={updateField}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="filled-basic"
                  label="Prenom"
                  variant="filled"
                  required
                  value={fields.firstName}
                  onChange={updateField}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="filled-basic"
                  label="Mot de passe"
                  variant="filled"
                  required
                  value={fields.password}
                  onChange={updateField}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="filled-basic"
                  label="Adresse email "
                  variant="filled"
                  required
                  value={fields.email}
                  onChange={updateField}
                />
              </Grid>
            </Grid>
            <Box sx={{ alignSelf: "end", pr: isMobile ? 0 : 3, mt: 4 }}>
              <Button onClick={SignUp} variant="bleuBtn">
                S'inscrire
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default SignUp;
