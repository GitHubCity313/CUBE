import React from "react";
import Layout from "../../components/Layout/Layout";
import PropTypes from "prop-types";
import {Breadcrumbs, Divider, Fab, Grid, Link, Paper, Stack, TextareaAutosize} from "@mui/material";
import Typography from "@mui/material/Typography";
import apiService from "../../services/apiService";
import Chip from "@mui/material/Chip";
import {getMatchingCategories} from "../../utils";
import Image from "next/image"
import commentIcone from "../../public/icones/commentIcone.svg";

export default function Resource({ resource, categories, contents, comments, resourceAuthor }) {
  const resourceCreationDate = new Date(resource.createdAt*1000);
  console.log("comments");
  console.log(typeof comments);
  console.log(comments);
  return (
    <Layout title={resource.name} withSidebar withFooter>
      <Grid
          container
          flexDirection="column"
          sx={{mt : 20 }}
      >
        <Grid
            container
            flexDirection="row"
            sx={{mb : 3 }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Accueil
            </Link>
            <Typography color="text.primary">{resource.name}</Typography>
          </Breadcrumbs>
        </Grid>
        <Typography variant="h1">{resource.name}</Typography>
        <Grid
          container
          flexDirection="row"
          alignItems="center"
        >
          <Stack direction="row" spacing={1} sx={{ mr : 1.2 }}>
            {
              resource.categories.map(resourceCategory => {
                const matchedCategory = getMatchingCategories(resourceCategory, categories);
                if(matchedCategory) {
                  return (
                      <Chip key={resourceCategory._id} label={matchedCategory} color="primary"/>
                  )
                }
              })
            }
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack direction="row" spacing={1} sx={{ ml : 1.2, mr : 1.2 }}>
            <div>
              Publié le{" "}
            {resourceCreationDate.getDate()}/{resourceCreationDate.getMonth()+1}/{resourceCreationDate.getFullYear()}
            </div>
          </Stack>
          <Fab size="small" variant="extended" color="primary">
            {/*<NavigationIcon sx={{ mr: 1 }} />*/}
            + Ajouter aux favoris
          </Fab>
        </Grid>
        <Grid
        container
        sx={{mt: 2, mb: 2}}
        >
          <Image
              src={resource.thumbnail.url}
              alt={resource.thumbnail.alt}
              width={900}
              height={300}
          />
        </Grid>
        <Grid
          container
          >
          {
            contents.content.map((content) => {
              return(
                  <div key={content.value} className={content.type}>
                    {content.value}
                  </div>
              )
            })
          }
        </Grid>
        <Grid
            container
            sx={{mt: 2}}
            flexDirection="column"
        >
          <Typography variant="h6">Poster un commentaire</Typography>
          <TextareaAutosize
          aria-label="Laisser un commentaire"
          minRows={3}
          placeholder="Veuillez vous connecter pour laisser un commentaire"
          style={{ width: "80%" }}
          />
          <Grid
              sx={{mt: 1}}
          >
            <Fab size="small" variant="extended" color="primary">
              Envoyer
            </Fab>
          </Grid>
        </Grid>
        <Grid
            sx={{mt: 2}}
            flexDirection="column"
        >
          <Typography variant="h3">Commentaires</Typography>
          {comments.map((comment) => {
            if (!comment.isModerated){
              const createdAtDate = new Date(comment.createdAt*1000);
              const updatedAtDate = new Date(comment.updatedAt*1000);
              return (
                  <Paper key={comment._id} elevation={6} sx={{p:2}}>
                    <Image src={commentIcone} />
                    <Typography variant="h4">{comment.title}</Typography>
                    <Typography variant="subtitle1">{comment.author}</Typography>
                    <Typography variant="body1">« {comment.value} »</Typography>
                    <Grid
                      container
                      >
                      {!(isNaN(updatedAtDate.getDate())) ?
                          `Mis à jour le 
                          ${updatedAtDate.getDate()}/${updatedAtDate.getMonth()+1}/${updatedAtDate.getFullYear()}
                          à 
                          ${updatedAtDate.getHours()}:${updatedAtDate.getMinutes()}`
                          :`Écrit le 
                          ${createdAtDate.getDate()}/${createdAtDate.getMonth()+1}/${createdAtDate.getFullYear()}
                          à 
                          ${createdAtDate.getHours()}:${createdAtDate.getMinutes()}`}
                    </Grid>
                  </Paper>
              )
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
    const apiSResourceRequest = await apiService.getItem("resources", params.id);
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
    const contentsReq = await apiService.getItem("contents", resource.contentId);
    contents = await contentsReq.data.content[0];
  } catch (e) {
    console.log(e);
  }

  let comments = [];
  let formatedComments = {};
  //updating the comments object from mongo : adding the name and forname of the author in a formated string .author
  //keeping the comment'author'user'id in .authorId
  try {
    const commentsReq = await apiService.getItem("comments", resource._id);
    comments = await commentsReq.data.comments;
    comments.map(async (comment) => {
      let user = {};
      try {
        const authorReq = await apiService.getItem("users", comment.author);
        user = authorReq.data.user[0];
        formatedComments = comment;
        formatedComments.authorId = user._id;
        formatedComments.author = `${user.firstName} ${user.lastName}`;
      } catch (e) {
        console.log(e);
      }
      console.log("comment inside try getStaticProps");
      console.log(comment);
    })
  } catch (e) {
    console.log(e);
  }

  let resourceAuthor = [];

  try {
    const userReq = await apiService.getItem("users", resource.author);
    resourceAuthor = await userReq.data.user;
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      resource,
      categories,
      contents,
      comments,
      resourceAuthor
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
  resourceAuthor: PropTypes.object
}
