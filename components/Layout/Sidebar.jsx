import React, { useContext } from "react";
import { Box, Avatar, ListItem, ListItemText, Button } from "@mui/material";
import { useRouter } from "next/router";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Link from "next/link";
import AuthContext from "../../context/authContext";

export default function Sidebar() {
  const { session, isAuthenticated, signOut } = useContext(AuthContext);
  const router = useRouter();

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
              alt={`${session?.firstName}`}
              src={`${session?.profilePic}`}
              sx={{ mr: 2 }}
            />
            <ListItemText
              primary={`${session?.firstName} ${session?.lastName}`}
            />
          </ListItem>

          <Link href="/">
            <ListItem sx={{ borderBottom: `1px solid ${"gov.blue"}` }}>
              <Button variant="textBtn">Accueil</Button>
            </ListItem>
          </Link>
          <Link href="/article">
            <ListItem>
              <Button variant="textBtn">Créer un évènement</Button>
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
