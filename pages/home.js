import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import Card from "../components/Card";
import CategoriesSelect from "../components/Home/CategoriesSelect";
import ResourceTypeSelect from "../components/Home/ResourceTypeSelect";
import Layout from "../components/Layout/Layout";
import apiService from "../services/apiService";
import { indexResourceTypes } from "../utils";

export default function Home({ resources, categories, resourceTypes }) {
  return (
    <Layout title="Cube | Home">
      <Grid container flexDirection="column">
        <Grid
          container
          sx={{ ml: 3, pb: 3, borderBottom: "1px solid #E5E5E5" }}
          alignItems="center"
        >
          <Typography sx={{ pr: 2, color: "gov.blue" }}>Filtrer par</Typography>
          <CategoriesSelect categories={categories} />
          <ResourceTypeSelect types={resourceTypes} />
        </Grid>
        <Grid container pt={2} justifyContent="center">
          {resources.map((resource) => {
            return (
              <Grid item key={resource._id} my={2} mx={3}>
                <Card resourceData={resource} categories={categories} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(user) {
  let resources = [];
  let categories = [];
  let resourceTypes = [];

  try {
    const fetchedResources = await apiService.getItems("resources");
    const fetchedCategories = await apiService.getItems("categories");

    resources = await fetchedResources.data.resources;
    categories = await fetchedCategories.data.categories;
    resourceTypes = indexResourceTypes(resources);
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      resources,
      categories,
      resourceTypes,
    },
  };
}

Home.propTypes = {
  resources: PropTypes.array,
  categories: PropTypes.array,
  resourceTypes: PropTypes.array,
};
