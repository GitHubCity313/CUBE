import {
  Button,
  Grid,
  Paper,
  Snackbar,
  Typography,
  // IconButton,
} from "@mui/material";
// import { HighlightOffIcon, BorderColorIcon } from "@mui/icons-material";
import Image from "next/image";
import commentIcone from "../../public/icones/commentIcone.svg";
import React, { useCallback, useContext, useState } from "react";
import PropTypes from "prop-types";
import styles from "../../styles/Comments.module.css";
import AuthContext from "../../context/authContext";
import apiService from "../../services/apiService";
import { useRouter } from "next/router";

export default function Comment(props) {
  const formatDate = props.formatDate;
  const { session, token } = useContext(AuthContext);
  const router = useRouter();
  const comment = props.comment;
  const commentAuthorId = comment.author;
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const isCreator = useCallback(
    () => commentAuthorId === session.id,
    [commentAuthorId, session]
  );

  const deleteComment = async () => {
    try {
      const deleteItem = await apiService.deleteItem(
        "comments",
        comment._id,
        token
      );
      if (deleteItem.status === 204) {
        console.log("le commentaire a bien été supprimé");
        setSnackbar({
          open: true,
          message: "Commentaire supprimé",
          severity: "success",
        });
        setTimeout(() => router.reload(), 800);
      }
    } catch (e) {
      console.log(e);
      setSnackbar({
        open: true,
        message: "Echec lors de la suppression",
        severity: "error",
      });
    }
  };

  if (!comment.isModerated) {
    return (
      <>
        <Snackbar
          open={snackbar.open}
          severity={snackbar.severity}
          message={snackbar.message}
          onClick={() => setSnackbar({ ...snackbar, open: false })}
        />
        <Paper key={comment._id} elevation={6} sx={{ p: 2, mb: 2 }}>
          <Grid className={styles.buttonsRow}>
            <Image src={commentIcone} />
            {isCreator() && (
              <div className={styles.buttonsCol}>
                <Button variant="text" onClick={deleteComment}>
                  Supprimer
                </Button>
              </div>
            )}
          </Grid>
          <Typography variant="h4" sx={{ mt: 1.4, mb: 0.8 }}>
            {comment.title}
          </Typography>
          <Typography variant="subtitle1">{comment.authorName}</Typography>
          <Typography variant="body1">« {comment.value} »</Typography>
          <Grid container sx={{ mt: 0.8 }}>
            <Typography variant="body2" sx={{ fontSize: "0.83rem" }}>
              {`Publié le ${formatDate(comment.createdAt)}.`}
            </Typography>
          </Grid>
        </Paper>
      </>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object,
  formatDate: PropTypes.func,
  commentAuthorId: PropTypes.object,
};
