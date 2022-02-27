import React, { useContext, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import AuthContext from "../../context/authContext";
import {
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  Link,
  Paper,
  Stack,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import { useQuill } from "react-quilljs";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import CommentForm from "../../components/Resource/CommentForm";
import Snackbar from "../../components/Snackbar";
import commentIcone from "../../public/icones/commentIcone.svg";
import apiService from "../../services/apiService";
import editorUtils from "../../utils/editorUtils";

export default function Resource({
  resource,
  comments,
  resourceAuthor,
  authorId,
}) {
  const { session, isAuthenticated, token } = useContext(AuthContext);
  const router = useRouter();
  const { createdAt, updatedAt } = resource;
  const [editingMode, setEditingMode] = useState(false);
  const [contents, setContents] = useState([]);
  const options = editorUtils.getEditorOptions();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { quill, quillRef } = useQuill(options);

  useEffect(() => {
    if (quill) {
      const contents = quill.setContents(resource.content);
      setContents(contents);
    }
  }, [resource, quill]);

  // Vérifie si l'id de l'auteur de la ressource et celui de l'utilisateur connecté sont les mêmes
  const isCreator = useCallback(
    () => authorId === session.id,
    [session, authorId]
  );

  const formatDate = (date) => {
    const dateFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const publicationDate = new Date(date);
    return publicationDate.toLocaleString("fr-FR", dateFormatOptions);
  };

  const openEditor = (e) => {
    e.preventDefault();
    quill.enable();
    quill.focus();
    setEditingMode(true);
  };

  const updateResource = async () => {
    const newContent = quill.getContents().ops;

    try {
      const updateArticle = await apiService.updateItem(
        "resources",
        resource._id,
        { content: newContent },
        token
      );
      if (updateArticle.status === 204) {
        console.log("yes", updateArticle);
        setEditingMode(false);
        setSnackbar({
          open: true,
          message: "Modifications enregistrées",
          severity: "success",
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Erreur pendant la modification",
        severity: "error",
      });
    }
  };

  const resetRessource = () => {
    quill.setContents(contents);
    setEditingMode(false);
  };

  const deleteResource = async () => {
    const newContent = quill.getContents().ops;

    try {
      const deleteArticle = await apiService.deleteItem(
        "resources",
        resource._id,
        token
      );
      if (deleteArticle.status === 204) {
        setEditingMode(false);
        setSnackbar({
          open: true,
          message: "Votre ressource a bien ete supprimee",
          severity: "success",
        });
        setTimeout(() => router.push("/"), 3000);
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Erreur pendant la suppression",
        severity: "error",
      });
    }
  };

  // Mur de la honte du dry Mathieu
  // const formatedCreatedDate = resourceCreationDate.toLocaleString(
  //   "fr-FR",
  //   dateFormatOptions
  // );
  // const formatedUpdatedDate = resourceUpdatedDate.toLocaleString(
  //   "fr-FR",
  //   dateFormatOptions
  // );
  return (
    <Layout title={resource.title} withSidebar withFooter>
      <Grid container flexDirection="column">
        <Grid container flexDirection="row" sx={{ mb: 3 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Accueil
            </Link>
            <Typography color="text.primary">{resource.title}</Typography>
          </Breadcrumbs>
        </Grid>
        <Typography variant="h1">{resource.title}</Typography>
        <Grid
          container
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{ m: 1.2 }}
            alignItems="center"
          >
            {resource.categories.map((cat) => (
              <Chip key={`id-${cat}`} label={cat} color="primary" />
            ))}
            <Divider orientation="vertical" flexItem />
            <Typography variant="body2">
              {createdAt === updatedAt
                ? `Publié le
                    ${formatDate(createdAt)}`
                : `Mis à jour le
                    ${formatDate(updatedAt)}`}
              {` par ${resourceAuthor.firstName} ${resourceAuthor.lastName}`}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            {isCreator() && (
              <>
                {editingMode ? (
                  <>
                    <Button variant="redBtn" onClick={resetRessource}>
                      Annuler
                    </Button>
                    <Button variant="bleuBtn" onClick={updateResource}>
                      Modifier
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="bleuBtn" onClick={openEditor}>
                      Editer
                    </Button>
                    <Button variant="redBtn" onClick={deleteResource}>
                      Supprimer
                    </Button>
                  </>
                )}
              </>
            )}
            {isAuthenticated && !isCreator() ? (
              <Button variant="bleuBtn">+ Ajouter aux favoris</Button>
            ) : null}
          </Stack>
        </Grid>

        <Grid
          container
          flexDirection="column"
          mt={2}
          sx={{
            "& div.ql-toolbar": {
              border: "none",
              display: !editingMode ? "none" : "default",
              backgroundColor: "rgba(122, 177, 232, 0.3)",
            },
          }}
        >
          <Box
            sx={{
              "&.ql-container.ql-snow": {
                border: "rgba(122, 177, 232, 0.3)",
                backgroundColor: editingMode && "whitesmoke",
              },
              "&.ql-tooltip": {
                display: "none",
              },
            }}
            ref={quillRef}
          />
        </Grid>
        <CommentForm />
        <Grid sx={{ mt: 2, mb: 2 }} flexDirection="column">
          <Typography variant="h3">Commentaires</Typography>
          {comments.map((comment) => {
            if (!comment.isModerated) {
              const createdAtDate = new Date(comment.createdAt * 1000);
              const updatedAtDate = new Date(comment.updatedAt * 1000);
              const formatedCreatedDate = createdAtDate.toLocaleString(
                "fr-FR",
                dateFormatOptions
              );
              const formatedUpdatedDate = updatedAtDate.toLocaleString(
                "fr-FR",
                dateFormatOptions
              );
              return (
                <Paper key={comment._id} elevation={6} sx={{ p: 2, mb: 2 }}>
                  <Image src={commentIcone} />
                  <Typography variant="h4">{comment.title}</Typography>
                  <Typography variant="subtitle1">
                    {comment.authorName}
                  </Typography>
                  <Typography variant="body1">« {comment.value} »</Typography>
                  <Grid container>
                    <Typography variant="body2">
                      {!isNaN(updatedAtDate.getDate())
                        ? `Mis à jour le ${formatedUpdatedDate}.`
                        : `Écrit le ${formatedCreatedDate}.`}
                    </Typography>
                  </Grid>
                </Paper>
              );
            }
          })}
        </Grid>
        <Snackbar
          open={snackbar.open}
          severity={snackbar.severity}
          message={snackbar.message}
          onClick={() => setSnackbar({ ...snackbar, open: false })}
        />
      </Grid>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  let resource = [];
  let contents = [];
  let comments = [];
  let resourceAuthor = [];
  let authorId = "";

  try {
    const apiSResourceRequest = await apiService.getItem(
      "resources",
      params.id
    );
    //mongo sending it back in an array even if there is juste one item :|
    resource = apiSResourceRequest.data.resource[0];
    authorId = resource.author;

    const userReq = await apiService.getItem("users", resource.author);
    resourceAuthor = await userReq.data.user[0];

    const contentsReq = await apiService.getItem(
      "contents",
      resource.contentId
    );
    contents = await contentsReq.data.content;

    const commentsReq = await apiService.getItem("comments", resource._id);
    comments = await commentsReq.data.comments;
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      resource,
      contents,
      comments,
      resourceAuthor,
      authorId,
    },
  };
}

export async function getStaticPaths() {
  let resources = [];

  try {
    const fetchedResources = await apiService.getItems("resources");

    resources = await fetchedResources.data.resources;
  } catch (e) {
    console.log(e);
  }

  return {
    paths: resources.map((resource) => ({
      params: { id: resource._id.toString() },
    })),
    fallback: false,
  };
}

Resource.propTypes = {
  resource: PropTypes.object,
  categories: PropTypes.array,
  contents: PropTypes.object,
  comments: PropTypes.array,
  resourceAuthor: PropTypes.object,
};
