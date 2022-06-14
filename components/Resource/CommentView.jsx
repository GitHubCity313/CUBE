import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";

export default function CommentView({ comment }) {
  return (
    <Grid container flexDirection="column">
      <Typography variant="body1">{comment.value}</Typography>
    </Grid>
  );
}

CommentView.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    relatedResource: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    moderationValidation: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    isModerated: PropTypes.bool.isRequired,
    isReported: PropTypes.bool.isRequired,
    updatedAt: PropTypes.string.isRequired,
    validationStatus: PropTypes.bool.isRequired,
  }),
};
