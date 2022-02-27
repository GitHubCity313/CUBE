import React, { useContext, useEffect, useState } from "react";
import { Grid, Stack, Typography, CircularProgress } from "@mui/material";
import AuthContext from "../context/authContext";
import { useRouter } from "next/router";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Layout from "../components/Layout/Layout";
import UserInfoCard from "../components/Profile/UserInfoCard";

export default function Profile() {
  const {
    isAuthenticated,
    fetchProfile,
    fetchLikes,
    fetchEvents,
    fetchCreatedEvents,
  } = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchingError, setFetchingError] = useState(false);
  const [user, setUser] = useState({});
  const router = useRouter();
  // State pour les evenements prevus
  const [events, setEvents] = useState([]);
  // State pour les evenements cree par l'utilisateur
  const [userEvents, setUserEvents] = useState([]);
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
        if (profile.hasEvents.length > 0) {
          const events = await fetchEvents(profile.hasEvents);
          setEvents(events);
        }
        console.log(profile.hasEventsCreated);
        if (profile.hasEventsCreated.length > 0) {
          const events = await fetchCreatedEvents(profile.hasEventsCreated);
          setUserEvents(events);
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
            backgroundColor: "gov.red",
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
            <UserInfoCard
              title="Mes événements"
              list={userEvents}
              subtitle="  Suivez le déroulement des projets qui vous tiennent à coeur."
              isEmptyLabel="Vous n'avez encore crée aucun événement"
              hasActionButton
              actionButton={{
                label: "créer",
                icon: <AddCircleOutlineIcon />,
                onClick: () => router.push("/login"),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <UserInfoCard
              title="Bientôt"
              list={events}
              subtitle="    Vos prochains évènements à venir"
              isEmptyLabel="       Aucun évènement prévu dans le mois"
              hasActionButton={false}
            />
          </Grid>

          <Grid item xs={12}>
            <UserInfoCard
              title="Mes favoris"
              list={favorites}
              subtitle="      Qui suivez-vous en ce moment ?"
              isEmptyLabel="                  Vous n'avez pas encore de favoris"
              hasActionButton={false}
            />
          </Grid>
          <Grid item xs={12}>
            <UserInfoCard
              title="Mes infos"
              list={[]}
              subtitle="     Vous pouvez à tout moment mettre à jour et modifier vos
                  informations."
              isEmptyLabel="                 "
              hasActionButton
              actionButton={{
                label: "modifier",
                icon: <SettingsIcon />,
                onClick: () => console.log("pouet"),
              }}
            />
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}
