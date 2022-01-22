import React, { useContext } from "react";
import { Box, Grid, ListItem, ListItemText, Button } from "@mui/material";
import Link from "next/link";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import AuthContext from "../../context/authContext";

export default function Sidebar() {
  const { session, isAuthenticated, signIn, signOut } = useContext(AuthContext);

  console.log(session, isAuthenticated);

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
        justifyContent: "space-between",
        width: "10vw",
        height: "90vh",
      }}
    >
      <Box>
        {isAuthenticated && (
          <ListItem>
            <ListItemText primary={`Bonjour ${session?.firstName}`} />
          </ListItem>
        )}
        <ListItem>
          <HomeIcon sx={{ marginRight: "20px" }} color="primary" />
          <ListItemText primary="Item 1" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
        {!isAuthenticated ? (
          <ListItem>
            <Link href="/login">
              <a>
                <ListItemText primary="Se connecter" onClick={signIn} />
              </a>
            </Link>
          </ListItem>
        ) : (
          <ListItem>
            <Link href="/home">
              <a>
                <ListItemText primary="Se deconnecter" onClick={signOut} />
              </a>
            </Link>
          </ListItem>
        )}
      </Box>
      <Box sx={{ marginBottom: "100px" }}>
        <Button
          variant="borderBtn"
          size="small"
          color="primary"
          startIcon={<SettingsIcon />}
        >
          Paramètres
        </Button>
      </Box>
    </Box>
  );
}
