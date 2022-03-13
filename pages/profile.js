import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/authContext";
import { Grid, Stack, Typography, CircularProgress } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Layout from "../components/Layout/Layout";
import UserInfoCard from "../components/Profile/UserInfoCard";
import UserEditDialog from "../components/Profile/UserEditDialog";
import Snackbar from "../components/Snackbar";
import apiService from "../services/apiService";
import authService from "../services/authService";

export default function Profile() {
  const {
    isAuthenticated,
    fetchProfile,
    fetchLikes,
    fetchEvents,
    fetchCreatedEvents,
    token,
    refresh,
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(async () => {
    if (!isAuthenticated) {
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
          const monthlyEvents = () =>
            events.filter(
              (e) =>
                new Date(e.startDate).getMonth() ===
                new Date(Date.now()).getMonth()
            );

          setEvents(monthlyEvents);
        }
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

  const handleChangeOnUserInfos = async () => {
    try {
      const { lastName, firstName, profilePic, email } = user;
      const updatedUser = await apiService.updateItem(
        "users",
        user._id,
        { lastName, firstName, profilePic, email },
        token
      );
      if (updatedUser.status === 204) {
        // Bricole => refresh le state de la session pour provoauer l'update de l'image de la sidebar
        refresh();
        setSnackbar({
          open: true,
          message: "Votre profil est bien mis à jour",
          severity: "success",
        });
        setIsDialogOpen(false);
      }
    } catch (err) {
      console.log(err);
      setSnackbar({
        open: true,
        message: "Erreur pendant la mise à jour",
        severity: "error",
      });
    }
  };

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
                onClick: () => router.push("/resource/add"),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <UserInfoCard
              title="Bientôt"
              list={events}
              subtitle="Vos prochains évènements à venir"
              isEmptyLabel="Aucun évènement prévu dans le mois"
              hasActionButton={false}
            />
          </Grid>

          <Grid item xs={12}>
            <UserInfoCard
              title="Mes favoris"
              list={favorites}
              subtitle="Qui suivez-vous en ce moment ?"
              isEmptyLabel="Vous n'avez pas encore de favoris"
              hasActionButton={false}
            />
          </Grid>
          <Grid item xs={12}>
            <UserInfoCard
              title="Mes infos"
              list={[]}
              subtitle="Vous pouvez à tout moment mettre à jour et modifier vos
                  informations."
              isEmptyLabel=""
              hasActionButton
              actionButton={{
                label: "modifier",
                icon: <SettingsIcon />,
                onClick: () => setIsDialogOpen(true),
              }}
            />
          </Grid>
          <UserEditDialog
            open={isDialogOpen}
            handleClose={() => setIsDialogOpen(false)}
            user={user}
            setUser={setUser}
            handleChangeOnUserInfos={handleChangeOnUserInfos}
          />
        </Grid>
      )}
      <Snackbar
        open={snackbar.open}
        severity={snackbar.severity}
        message={snackbar.message}
        onClick={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Layout>
  );
}
