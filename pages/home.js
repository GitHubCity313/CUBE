import React, { useContext } from "react";
import Link from "next/link";
import AuthContext from "./../context/authContext";
import { Grid, TextField } from "@mui/material";
import Card from "../components/Card";
import SelectVariants from "../components/SelectVariants";
import CategoriesSelect from "../components/Home/CategoriesSelect";
import ResourceTypeSelect from "../components/Home/ResourceTypeSelect";
import Layout from "../components/Layout/Layout";
import apiService from "../services/apiService";
import PropTypes from "prop-types";
import { indexResourceTypes } from "../utils";

export default function Home({ resources, categories, resourceTypes }) {
  return (
    <Layout title="Cube | Home">
      <Grid container flexDirection="column">
        <Grid container sx={{ mt: 22 }}>
          <CategoriesSelect categories={categories} />
          <ResourceTypeSelect types={resourceTypes} />
        </Grid>
        <div className="resourcesContainer">
          {resources.map((resource) => {
            return (
              <div className="resourceItem" key={resource._id}>
                <Link href={`./resource/${resource._id}`}>
                  <a>
                    <Card resourceData={resource} categories={categories} />
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          defaultValue="Normal"
          variant="filled"
        />

        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          defaultValue="Normal"
          variant="filled"
        />

        <SelectVariants />
        {/* <Card /> */}
        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          defaultValue="Normal"
          variant="filled"
        />
        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          defaultValue="Normal"
          variant="filled"
        />

        <SelectVariants />
        {/* <Card /> */}
        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          defaultValue="Normal"
          variant="filled"
        />
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
