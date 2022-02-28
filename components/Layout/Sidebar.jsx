import React, { useContext, useEffect, useState } from "react";
import { Box, Avatar, ListItem, ListItemText, Button } from "@mui/material";
import { useRouter } from "next/router";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Link from "next/link";
import AuthContext from "../../context/authContext";
import UserInfoCard from "../Profile/UserInfoCard";

export default function Sidebar() {
  const { session, fetchProfile, isAuthenticated, signOut, token } =
    useContext(AuthContext);
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profile = await fetchProfile(token);
        setUser(profile);
      } catch (err) {}
    };

    const onLoad = async () => await getProfile();

    return onLoad();
  }, [session]);

  const handleDisconnexion = () => {
    signOut();
    return router.push("/home");
  };

  return (
    <Box
      sx={{
        mt: "126px",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "20vw",
      }}
    >
      {isAuthenticated && (
        <Box sx={{ p: 2 }}>
          <ListItem sx={{ mb: 2 }}>
            <Avatar
              alt={`${user?.firstName}`}
              src={`${user?.profilePic}`}
              sx={{ mr: 2 }}
            />
            <ListItemText primary={`${user?.firstName} ${user?.lastName}`} />
          </ListItem>

          <Link href="/">
            <ListItem sx={{ borderBottom: `1px solid ${"gov.blue"}` }}>
              <Button variant="textBtn">Accueil</Button>
            </ListItem>
          </Link>
          <Link href="/resource/add">
            <ListItem>
              <Button variant="textBtn">Créer une ressource</Button>
            </ListItem>
          </Link>
          <Link href="/profile">
            <ListItem>
              <Button variant="textBtn">Mon profil</Button>
            </ListItem>
          </Link>
        </Box>
      )}
      <Box sx={{ p: 2 }}>
        {isAuthenticated ? (
          <Button
            variant="borderBtn"
            color="primary"
            startIcon={<SettingsIcon />}
            onClick={handleDisconnexion}
          >
            Se déconnecter
          </Button>
        ) : (
          <Button
            variant="borderBtn"
            size="small"
            color="primary"
            startIcon={<SettingsIcon />}
            onClick={() => router.push("/login")}
          >
            Se connecter
          </Button>
        )}
      </Box>
    </Box>
  );
}
