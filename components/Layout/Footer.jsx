import * as React from "react";
import { Grid } from "@mui/material";
import Image from "next/image";
import Logo from "../../public/logoMini.svg";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function Footer() {
  return (
    <Grid
      container
      sx={{
        backgroundColor: "white",
        textAlign: "center",
        padding: "50px 130px 0px 130px",
        borderTop: "3px solid #000091",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        borderBottom="1px solid #E5E5E5"
      >
        <Box width="70%" display="flex">
          <Image
            src={Logo}
            height="100%"
            alt="Picture of the author"
            item
            xs={1}
          />
        </Box>
        <Box
          item
          display="flex"
          justifyContent="left"
          flexDirection="column"
          alignItems="flex-start"
          width="50%"
        >
          <Typography textAlign="left">
            Texte optionnel 3 lignes maximum. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Consectetur et vel quam auctor semper.
            Cras si amet mollis dolor.
          </Typography>
          <Box display="flex" justifyContent="left" alignItems="flex-start">
            <ListItem>
              <ListItemText primary="Item 1" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Item 2" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Item 3" />
            </ListItem>
          </Box>
        </Box>
      </Box>
      <Grid
        width="50%"
        display="flex"
        justifyContent="left"
        alignItems="center"
      >
        <ListItem>
          <ListItemText primary="Item 1" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 4" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 5" />
        </ListItem>
      </Grid>
    </Grid>
  );
}
