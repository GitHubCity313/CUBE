import {
  Button,
  Grid,
  Paper,
  Typography,
  // IconButton,
} from "@mui/material";
// import { HighlightOffIcon, BorderColorIcon } from "@mui/icons-material";
import Image from "next/image";
import commentIcone from "../../public/icones/commentIcone.svg";
import React, { useCallback, useContext } from "react";
import PropTypes from "prop-types";
import styles from "../../styles/Comments.module.css";
import AuthContext from "../../context/authContext";

export default function Comment(props) {
  const formatDate = props.formatDate;
  const { session } = useContext(AuthContext);
  const comment = props.comment;
  const commentAuthorId = comment.author;
  const isCreator = useCallback(
    () => commentAuthorId === session.id,
    [commentAuthorId, session]
  );

  if (!comment.isModerated) {
    return (
      <Paper key={comment._id} elevation={6} sx={{ p: 2, mb: 2 }}>
        <Grid className={styles.buttonsRow}>
          <Image src={commentIcone} />
          {isCreator() && (
            <div className={styles.buttonsCol}>
              <Button variant="text">Supprimer</Button>
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
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object,
  formatDate: PropTypes.func,
  commentAuthorId: PropTypes.object,
};
