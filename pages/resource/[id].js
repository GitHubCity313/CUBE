import React from "react";
import Layout from "../../components/Layout/Layout";
import PropTypes from "prop-types";
import {Breadcrumbs, Divider, Grid, Link, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import apiService from "../../services/apiService";
import Chip from "@mui/material/Chip";
import {getMatchingCategories} from "../../utils";

export default function Resource({ resource, categories }) {
  const resourceCreationDate = new Date(resource.createdAt*1000);
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
                      <Chip label={matchedCategory} color="primary"/>
                  )
                }
              })
            }
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack direction="row" spacing={1} sx={{ ml : 1.2 }}>
            <div>
              Publié le{" "}
            {resourceCreationDate.getDate()}/{resourceCreationDate.getMonth()}/{resourceCreationDate.getFullYear()}
            </div>
          </Stack>
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
    console.log("categories");
    console.log(categories);
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      resource,
      categories
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
  categories: PropTypes.array
}
