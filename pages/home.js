import React, { useContext, useState } from "react";
import Link from "next/link";

import AuthContext from "./../context/authContext";
import {
  Box,
  Grid,
  TextField,
  Checkbox,
  InputLabel,
  OutlinedInput,
  Select,
  Chip,
} from "@mui/material";
import Card from "../components/Card";
import SelectVariants from "../components/SelectVariants";
import CategoriesSelect from "../components/Home/CategoriesSelect";
import ResourceTypeSelect from "../components/Home/ResourceTypeSelect";
import Layout from "../components/Layout/Layout";
import apiService from "../services/apiService";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import theme from "../theme";
import PropTypes from "prop-types";

export default function Home({ resources, categories }) {
  return (
    <Layout title="Cube | Home">
      <Grid container flexDirection="column">
        <CategoriesSelect categories={categories} />
        <ResourceTypeSelect types={["association", "event"]} />
        {/*<ResourceTypeSelect types={["association", "event"]} />*/}
        <ul>
          {resources.map((resource) => {
            return (
              <li key={resource._id}>
                <Link href={`./resource/${resource._id}`}>
                  <a>
                    <Card resourceData={resource} categories={categories} />
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
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

  try {
    const fetchedResources = await apiService.getItems("resources");
    const fetchedCategories = await apiService.getItems("categories");

    resources = await fetchedResources.data.resources;
    categories = await fetchedCategories.data.categories;
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      resources,
      categories,
    },
  };
}

Home.propTypes = {
  resources: PropTypes.array,
  categories: PropTypes.array,
};
