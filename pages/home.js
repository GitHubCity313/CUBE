import React from "react";
import Link from "next/link";
import {Box, Grid, TextField} from "@mui/material";
import Card from "../components/Card";
import SelectVariants from "../components/SelectVariants";
import Layout from "../components/Layout/Layout";
import APIService from "../services/APIService";
import MenuItem from "@mui/material/MenuItem";

export default function Home({ resources, categories }) {
  return (
    <Layout title="Cube | Home">
      <Grid container flexDirection="column">
        {/*<TextField*/}
        {/*    // hiddenLabel*/}
        {/*    // id="filled-hidden-label-normal"*/}
        {/*    defaultValue="Normal"*/}
        {/*    variant="filled"*/}
        {/*    sx={{ margin: 7 }}*/}
        {/*/>*/}

        {/*<SelectVariants />*/}

        <Box
            component="form"
            sx={{ mt: 21 }}
        >
          <div>
            <TextField
              select
              label="select"
              value={categories}
              >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Box>
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
export async function getStaticProps() {
  let resources = [];
  let categories = [];

  try {
    const fetchedResources = await APIService.getItems("resources");
    const fetchedCategories = await APIService.getItems("categories");

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
