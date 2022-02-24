import Typography from "@mui/material/Typography";
import { Button, Grid, TextareaAutosize } from "@mui/material";
import React from "react";
import styles from "../../styles/CommentForm.module.css";

export default function CommentForm() {
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
        placeholder="Veuillez vous connecter pour laisser un commentaire"
      />
      <Grid sx={{ mt: 1 }}>
        <Button variant="bleuBtn">Envoyer</Button>
      </Grid>
    </Grid>
  );
}
