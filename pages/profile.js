import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Stack,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import AuthContext from "../context/authContext";
import { useRouter } from "next/router";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Layout from "../components/Layout/Layout";
import authService from "../services/authService";
import apiService from "../services/apiService";

export default function Profile() {
  const { isAuthenticated, fetchProfile } = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchingError, setFetchingError] = useState(false);
  const [user, setUser] = useState({});
  const router = useRouter();
  useEffect(async () => {
    if (isAuthenticated === false) {
      router.push("/");
    } else {
      try {
        const profile = await fetchProfile();
        setUser(profile);
        setIsFetching(false);
      } catch (err) {
        setIsFetching(false);
        setFetchingError(true);
      }
    }
  }, [isAuthenticated]);

  return (
    <Layout title="Cube | Profil">
      {fetchingError ||
        (isFetching && (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              mt: "50vh",
              backgroundColor: "gov.mediumBlue",
              color: "gov.white",
              p: 4,
              borderRadius: "8px",
            }}
          >
            <ErrorOutlineIcon />
            <Typography>Erreur lors de la récuperation des données</Typography>
          </Stack>
        ))}

      {!isFetching && !fetchingError && (
        <Grid container sx={{ mt: 20 }} spacing={2}>
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ color: "gov.blue" }}
                >
                  Mes informations personnelles
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Vous pouvez à tout moment mettre à jour et modifier vos
                  informations.
                </Typography>
                <Stack justifyContent="end">
                  <Button
                    sx={{ m: 4, alignSelf: "flex-end" }}
                    variant="borderBtn"
                    size="small"
                    color="primary"
                    startIcon={<SettingsIcon />}
                    onClick={() => router.push("/events")}
                  >
                    Modifier
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ color: "gov.blue" }}
                >
                  Mes évènements
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Suivez le déroulement des projets qui vous tiennent à coeur.
                </Typography>
                <Box>
                  {user.hasEvents === undefined ||
                  user.hasEvents.length === 0 ? (
                    <>
                      <Typography sx={{ my: 2, fontStyle: "italic" }}>
                        Vous n'avez aucun évènement créé
                      </Typography>
                      <Stack justifyContent="end">
                        <Button
                          sx={{ m: 4, alignSelf: "flex-end" }}
                          variant="borderBtn"
                          size="small"
                          color="primary"
                          startIcon={<AddCircleOutlineIcon />}
                          onClick={() => router.push("/login")}
                        >
                          Créer
                        </Button>
                      </Stack>
                    </>
                  ) : (
                    <Stack>Le gros map</Stack>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ color: "gov.blue" }}
                >
                  Mes favoris
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Qui suivez-vous en ce moment ?
                </Typography>
                <Box>
                  {user.likes === undefined || user.likes.length === 0 ? (
                    <Typography sx={{ my: 2, fontStyle: "italic" }}>
                      Vous n'avez pas encore de favoris
                    </Typography>
                  ) : (
                    <Stack>Le gros map</Stack>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}
