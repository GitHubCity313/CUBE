import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Stack,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import AuthContext from "../context/authContext";
import { useRouter } from "next/router";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Layout from "../components/Layout/Layout";
import Link from "next/link";

export default function Profile() {
  const { isAuthenticated, fetchProfile, fetchLikes, fetchEvents } =
    useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchingError, setFetchingError] = useState(false);
  const [user, setUser] = useState({});
  const router = useRouter();
  // State pour les evenements
  const [events, setEvents] = useState([]);
  // State pour les favoris
  const [favorites, setFavorites] = useState([]);
  // State pour les infos utilisateurs
  const [data, setData] = useState([]);

  useEffect(async () => {
    if (isAuthenticated === false) {
      router.push("/");
    } else {
      try {
        const profile = await fetchProfile();
        setUser(profile);
        setIsFetching(false);
        if (profile.likes.length > 0) {
          const likes = await fetchLikes(profile.likes);
          setFavorites(likes);
        }
        if (profile.hasEvents > 0) {
          const events = await fetchEvents(profile.hasEvents);
          setEvents(events);
        }
      } catch (err) {
        setIsFetching(false);
        setFetchingError(true);
      }
    }
  }, [isAuthenticated]);

  return (
    <Layout title="Cube | Profil">
      {isFetching && (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            mt: "50vh",
            color: "gov.mediumCumulus",
          }}
        >
          <CircularProgress color="inherit" />
        </Stack>
      )}
      {fetchingError && (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            mt: "50vh",
            backgroundColor: "gov.lightTuile",
            color: "gov.white",
            p: 4,
            borderRadius: "8px",
          }}
        >
          <ErrorOutlineIcon />
          <Typography>Erreur lors de la récuperation des données</Typography>
        </Stack>
      )}

      {!isFetching && !fetchingError && (
        <Grid container spacing={2}>
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
                  {events.length === 0 ? (
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
                    <Stack direction="row">
                      {events.map((e) => (
                        <Card sx={{ display: "flex", my: 4, mr: 4 }} key={e._id}>
                          <Link href={`/resource/${f._id}`}>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                sx={{
                                  width: 125,
                                  heigth: 125,
                                  borderRadius: "16px",
                                  objectFit: "cover",
                                }}
                                image={`${e.thumbnail.url}`}
                                alt=""
                              />
                            </CardActionArea>
                          </Link>
                        </Card>
                      ))}
                    </Stack>
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
                  {favorites.length === 0 ? (
                    <Typography sx={{ my: 2, fontStyle: "italic" }}>
                      Vous n'avez pas encore de favoris
                    </Typography>
                  ) : (
                    <Stack direction="row">
                      {favorites.map((f) => (
                        <Card sx={{ display: "flex", my: 4, mr: 4 }} key={f._id}>
                          <Link href={`/resource/${f._id}`}>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                sx={{
                                  width: 125,
                                  heigth: 125,
                                  borderRadius: "16px",
                                  objectFit: "cover",
                                }}
                                image={`${f.thumbnail.url}`}
                                alt=""
                              />
                            </CardActionArea>
                          </Link>
                        </Card>
                      ))}
                    </Stack>
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
