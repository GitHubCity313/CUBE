import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Box } from "@mui/material";
import { useQuill } from "react-quilljs";
import "react-quill/dist/quill.snow.css";
import editorUtils from "../../utils/editorUtils";

export default function Editor({ resource }) {
  const [, setContents] = useState([]);
  const options = editorUtils.getEditorOptions();

  const { quill, quillRef } = useQuill(options);

  useEffect(() => {
    if (quill) {
      const contents = quill.setContents(resource.content);
      setContents(contents);
    }
  }, [resource, quill]);

  return (
    <Grid
      container
      flexDirection="column"
      sx={{
        "& div.ql-toolbar": {
          border: "none",
          display: "none",
          backgroundColor: "rgba(122, 177, 232, 0.3)",
        },
      }}
    >
      <Box
        sx={{
          "&.ql-container.ql-snow": {
            border: "rgba(122, 177, 232, 0.3)",
          },
          "&.ql-tooltip": {
            display: "none",
          },
          "& input": {
            display: "none",
          },
        }}
        ref={quillRef}
      />
    </Grid>
  );
}

Editor.propTypes = {
  resource: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    resourceType: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    author: PropTypes.string.isRequired,
    hasParticipants: PropTypes.arrayOf(PropTypes.string).isRequired,
    moderationValidation: PropTypes.bool.isRequired,
    publicationStatus: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.arrayOf(
      PropTypes.shape({
        insert: PropTypes.string.isRequired,
      })
    ).isRequired,
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    hasParticipants: PropTypes.arrayOf(PropTypes.string).isRequired,
    likes: PropTypes.number.isRequired,
    moderationValidation: PropTypes.bool.isRequired,
    place: PropTypes.shape({
      city: PropTypes.string.isRequired,
      zipCode: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
    }).isRequired,
    publicationStatus: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }).isRequired,
    updatedAt: PropTypes.string.isRequired,
    validationStatus: PropTypes.bool.isRequired,
  }),
};
