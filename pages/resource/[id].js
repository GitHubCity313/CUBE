import React from "react";
import Layout from "../../components/Layout/Layout";
import PropTypes from "prop-types";
import {Breadcrumbs, Grid, Link} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Resource({ resource }) {
  console.log(typeof resource);
  console.log(resource);
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
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Accueil
            </Link>
            <Typography color="text.primary">{resource.name}</Typography>
          </Breadcrumbs>
        </Grid>
        <Typography variant="h1">{resource.name}</Typography>
      </Grid>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const resourceRequest = `http://localhost:3000/api/resources/${params.id}`;
  const fetchedResource = await fetch(resourceRequest);
  const JsonResource = await fetchedResource.json();
  //mongo me renvoie le json dans un tableau :|
  const resource = JsonResource.resource[0];

  return {
    props: {
      resource,
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
  resource: PropTypes.array
}
