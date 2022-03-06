import React, { useContext } from "react";
import { Box, Avatar, ListItem, ListItemText, Button } from "@mui/material";
import { useRouter } from "next/router";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";
import AuthContext from "../../context/authContext";

export default function Sidebar() {
  const { isAuthenticated, signOut, role } = useContext(AuthContext);
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
          <Link href="/admin">
            <ListItem>
              {role === "admin" ||
                (role === "moderateur" && (
                  <Button variant="textBtn" sx={{ color: "gov.red" }}>
                    Administration
                  </Button>
                ))}
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
