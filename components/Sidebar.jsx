import * as React from "react";
import { Box, ListItem, ListItemText, Button } from "@mui/material";
import Link from "next/link";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: "15.5vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2,
        backgroundColor: "white",
        paddingLeft: "-3vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ paddingTop: "190px", width: "80%" }}>
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
        <ListItem>
          <Link href="/login">
            <a>
              <ListItemText primary="Se connecter" />
            </a>
          </Link>
        </ListItem>
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
