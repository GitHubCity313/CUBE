import * as React from "react";
import {
  Grid,
  Box,
  Typography,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import Logo from "../../public/logoMini.svg";

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid
      container
      sx={{
        borderTop: "3px solid #000091",
        pt: 3,
      }}
    >
      <Box
        display="flex"
        justifyContent={isMobile ? "center" : "space-between"}
        px={!isMobile && 20}
        pb={3}
        alignItems="center"
        width="100%"
        borderBottom="1px solid #E5E5E5"
      >
        {!isMobile && (
          <Image
            src={Logo}
            height="100%"
            alt="Picture of the author"
            item
            xs={1}
          />
        )}

        <Box item display="flex" flexDirection="column">
          <Typography textAlign={isMobile ? "center" : "left"}>
            Sites associés
          </Typography>

          <ListItem sx={{ p: 0 }}>
            <ListItemText secondary="http://www.service-public.fr/" />
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemText secondary="http://www.gouvernement.fr/" />
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemText secondary="http://www.france.fr/" />
          </ListItem>
        </Box>
      </Box>
      <Grid
        width={"100%"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        pt={1}
      >
        <ListItem sx={{ pt: 0 }}>
          <ListItemText secondary="Plan du site" sx={{ textAlign: "center" }} />
        </ListItem>
        <ListItem sx={{ p: 0 }}>
          <ListItemText
            secondary="Mentions légales"
            sx={{ textAlign: "center" }}
          />
        </ListItem>
        <ListItem sx={{ p: 0 }}>
          <ListItemText
            secondary="Données personnelles et cookies"
            sx={{ textAlign: "center" }}
          />
        </ListItem>
      </Grid>
    </Grid>
  );
}
