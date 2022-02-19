import React from "react";
import Layout from "../../components/Layout/Layout";
import PropTypes from "prop-types";
import {
  Breadcrumbs,
  Divider,
  Fab,
  Grid,
  Link,
  Paper,
  Stack,
  TextareaAutosize,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import apiService from "../../services/apiService";
import Chip from "@mui/material/Chip";
import { getMatchingCategories } from "../../utils";
import Image from "next/image";
import commentIcone from "../../public/icones/commentIcone.svg";

export default function Resource({
  resource,
  categories,
  contents,
  comments,
  resourceAuthor,
}) {
  const resourceCreationDate = new Date(resource.createdAt * 1000);
  const resourceUpdatedDate = new Date(resource.updatedAt * 1000);
  const dateFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatedCreatedDate = resourceCreationDate.toLocaleString(
    "fr-FR",
    dateFormatOptions
  );
  const formatedUpdatedDate = resourceUpdatedDate.toLocaleString(
    "fr-FR",
    dateFormatOptions
  );
  return (
    <Layout title={resource.name} withSidebar withFooter>
      <Grid container flexDirection="column">
        <Grid container flexDirection="row" sx={{ mb: 3 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Accueil
            </Link>
            <Typography color="text.primary">{resource.name}</Typography>
          </Breadcrumbs>
        </Grid>
        <Typography variant="h1">{resource.name}</Typography>
        <Grid container flexDirection="row" alignItems="center">
          <Stack direction="row" spacing={1} sx={{ mr: 1.2 }}>
            {resource.categories.map((resourceCategoryId) => {
              const matchedCategory = getMatchingCategories(
                resourceCategoryId,
                categories
              );
              if (matchedCategory) {
                return (
                  <Chip
                    key={resourceCategoryId.toString()}
                    label={matchedCategory}
                    color="primary"
                  />
                );
              }
            })}
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack direction="row" spacing={1} sx={{ ml: 1.2, mr: 1.2 }}>
            <div>
              {isNaN(resourceUpdatedDate.getDate())
                ? `Publié le
                    ${formatedCreatedDate}`
                : `Mis à jour le
                    ${formatedUpdatedDate}`}
              {` par ${resourceAuthor.firstName} ${resourceAuthor.lastName}`}
            </div>
          </Stack>
          <Fab size="small" variant="extended" color="primary">
            {/*<NavigationIcon sx={{ mr: 1 }} />*/}+ Ajouter aux favoris
          </Fab>
        </Grid>
        <Grid container sx={{ mt: 2, mb: 2 }}>
          <Image
            src={resource.thumbnail.url}
            alt={resource.thumbnail.alt}
            width={900}
            height={300}
          />
        </Grid>
        <Grid container>
          {contents.content.map((content) => {
            return (
              <div
                key={contents.content.indexOf(content)}
                className={content.type}
              >
                {content.value}
              </div>
            );
          })}
        </Grid>
        <Grid container sx={{ mt: 2 }} flexDirection="column">
          <Typography variant="h6">Poster un commentaire</Typography>
          <TextareaAutosize
            aria-label="Laisser un commentaire"
            minRows={3}
            placeholder="Veuillez vous connecter pour laisser un commentaire"
            style={{ width: "80%" }}
          />
          <Grid sx={{ mt: 1 }}>
            <Fab size="small" variant="extended" color="primary">
              Envoyer
            </Fab>
          </Grid>
        </Grid>
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
              console.log(comment);
              return (
                <Paper key={comment._id} elevation={6} sx={{ p: 2, mb: 2 }}>
                  <Image src={commentIcone} />
                  <Typography variant="h4">{comment.title}</Typography>
                  <Typography variant="subtitle1">
                    {comment.authorName}
                  </Typography>
                  <Typography variant="body1">« {comment.value} »</Typography>
                  <Grid container>
                    {!isNaN(updatedAtDate.getDate())
                      ? `Mis à jour le ${formatedUpdatedDate}.`
                      : `Écrit le ${formatedCreatedDate}.`}
                  </Grid>
                </Paper>
              );
            }
          })}
        </Grid>
        <Grid container>
          {contents.content.map((content) => {
            return (
              <div key={content.value} className={content.type}>
                {content.value}
              </div>
            );
          })}
        </Grid>
        <Grid container sx={{ mt: 2 }} flexDirection="column">
          <Typography variant="h6">Poster un commentaire</Typography>
          <TextareaAutosize
            aria-label="Laisser un commentaire"
            minRows={3}
            placeholder="Veuillez vous connecter pour laisser un commentaire"
            style={{ width: "80%" }}
          />
          <Grid sx={{ mt: 1 }}>
            <Fab size="small" variant="extended" color="primary">
              Envoyer
            </Fab>
          </Grid>
        </Grid>
        <Grid sx={{ mt: 2 }} flexDirection="column">
          <Typography variant="h3">Commentaires</Typography>
          {comments.map((comment) => {
            if (!comment.isModerated) {
              const createdAtDate = new Date(comment.createdAt * 1000);
              const updatedAtDate = new Date(comment.updatedAt * 1000);
              // console.log("comment.updateAt");
              // console.log(comment.updatedAt);
              // console.log(updatedAtDate);
              return (
                <Paper key={comment._id} elevation={6} sx={{ p: 2 }}>
                  <Image src={commentIcone} />
                  <Typography variant="h4">{comment.title}</Typography>
                  <Typography variant="subtitle1">{comment.author}</Typography>
                  <Typography variant="body1">« {comment.value} »</Typography>
                  <Grid container>
                    {updatedAtDate
                      ? `Mis à jour le 
                          ${updatedAtDate.getDate()}/${
                          updatedAtDate.getMonth() + 1
                        }/${updatedAtDate.getFullYear()}
                          à 
                          ${updatedAtDate.getHours()}:${updatedAtDate.getMinutes()}`
                      : `Écrit le 
                          ${createdAtDate.getDate()}/${
                          createdAtDate.getMonth() + 1
                        }/${createdAtDate.getFullYear()}
                          à 
                          ${createdAtDate.getHours()}:${createdAtDate.getMinutes()}`}
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

  try {
    const apiSResourceRequest = await apiService.getItem(
      "resources",
      params.id
    );
    //mongo sending it back in an array even if there is juste one item :|
    resource = apiSResourceRequest.data.resource[0];
  } catch (e) {
    console.log(e);
  }

  let categories = [];

  try {
    const categoriesReq = await apiService.getItems("categories");
    categories = await categoriesReq.data.categories;
  } catch (e) {
    console.log(e);
  }

  let contents = [];

  try {
    const contentsReq = await apiService.getItem(
      "contents",
      resource.contentId
    );
    contents = await contentsReq.data.content[0];
  } catch (e) {
    console.log(e);
  }

  let comments = [];
  try {
    const commentsReq = await apiService.getItem("comments", resource._id);
    comments = await commentsReq.data.comments;
  } catch (e) {
    console.log(e);
  }

  let resourceAuthor = [];

  try {
    const userReq = await apiService.getItem("users", resource.author);
    resourceAuthor = await userReq.data.user[0];
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      resource,
      categories,
      contents,
      comments,
      resourceAuthor,
    },
  };
}

export async function getStaticPaths() {
  const fetchedResources = await fetch("http://localhost:3000/api/resources/");
  const JsonResources = await fetchedResources.json();
  const resources = JsonResources.resources;

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
