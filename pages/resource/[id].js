import React, { useContext, useEffect, useState, useCallback } from "react";
import Layout from "../../components/Layout/Layout";
import PropTypes from "prop-types";
import {
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  Link,
  Paper,
  Stack,
  Box,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import apiService from "../../services/apiService";
import Chip from "@mui/material/Chip";
import { useQuill } from "react-quilljs";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import commentIcone from "../../public/icones/commentIcone.svg";
import CommentForm from "../../components/Resource/CommentForm";
import AuthContext from "../../context/authContext";

export default function Resource({
  resource,
  comments,
  resourceAuthor,
  authorId,
}) {
  const { session, isAuthenticated } = useContext(AuthContext);
  const { createdAt, updatedAt } = resource;
  const [quillOptions, setQuillOptions] = useState({
    readOnly: true,
    modules: { toolbar: false },
  });

  const { quill, quillRef } = useQuill(quillOptions);
  const [content, setContent] = useState([]);

  useEffect(() => {
    if (quill) {
      const currentContent = quill.setContents(resource.content);
      setContent(currentContent);
    }
  }, [quill, resource]);

  console.log(session, authorId);
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

  const openEditor = () => {};

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
        <Grid container sx={{ mt: 2, mb: 2 }}></Grid>
        <Grid container flexDirection="row" alignItems="center">
          <Stack direction="row" spacing={1} sx={{ mr: 1.2 }}>
            {resource.categories.map((cat) => (
              <Chip key={`id-${cat}`} label={cat} color="primary" />
            ))}
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack
            direction="row"
            spacing={2}
            sx={{ ml: 1.2, mr: 1.2 }}
            alignItems="center"
          >
            <Typography variant="body2">
              {createdAt === updatedAt
                ? `Publié le
                    ${formatDate(createdAt)}`
                : `Mis à jour le
                    ${formatDate(updatedAt)}`}
              {` par ${resourceAuthor.firstName} ${resourceAuthor.lastName}`}
            </Typography>
            <Stack justifyContent={"flex-end"}>
              {isCreator() ? (
                <Button variant="bleuBtn" onClick={() => openEditor()}>
                  Editer
                </Button>
              ) : null}
              {isAuthenticated && !isCreator() ? (
                <Button variant="bleuBtn">+ Ajouter aux favoris</Button>
              ) : null}
            </Stack>
          </Stack>
        </Grid>

        <Grid container flexDirection="column" mt={2}>
          <Box
            ref={quillRef}
            sx={{ p: 2, mb: 2, border: "1px solid transparent" }}
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
