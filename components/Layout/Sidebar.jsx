import React, { useContext } from "react";
import { Box, Grid, ListItem, ListItemText, Button } from "@mui/material";
import { useRouter } from "next/router";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
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
        position: "fixed",
        top: 126,
        p: 4,
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "15vw",
        height: "90vh",
      }}
    >
      {isAuthenticated && (
        <Box>
          <ListItem>
            <ListItemText primary={`Bonjour ${session?.firstName}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Créer un article" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Mon profil" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Mes favoris" />
          </ListItem>
        </Box>
      )}
      <Box sx={{ marginBottom: "200px" }}>
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
