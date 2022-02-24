import Typography from "@mui/material/Typography";
import { Button, Grid, TextareaAutosize } from "@mui/material";
import React, { useContext } from "react";
import styles from "../../styles/CommentForm.module.css";
import AuthContext from "../../context/authContext";

export default function CommentForm() {
  const { session, isAuthenticated } = useContext(AuthContext);
  let placeHolderText = "Laissez votre commentaire..";
  if (!isAuthenticated) {
    placeHolderText = "Veuillez vous connecter pour laisser un commentaire";
  }
  return (
    <Grid
      className={styles.grid}
      container
      sx={{ mt: 2 }}
      flexDirection="column"
    >
      <Typography variant="h6">Poster un commentaire</Typography>
      <TextareaAutosize
        className={styles.textArea}
        aria-label="Laisser un commentaire"
        minRows={3}
        placeholder={placeHolderText}
      />
      <Grid sx={{ mt: 1 }}>
        <Button variant="bleuBtn">Envoyer</Button>
      </Grid>
    </Grid>
  );
}
