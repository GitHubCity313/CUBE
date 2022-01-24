import React from "react";
import Link from "next/link";
import { Grid, TextField } from "@mui/material";
import Card from "../components/Card";
import SelectVariants from "../components/SelectVariants";
import Layout from "../components/Layout/Layout";


export default function Home({ resources, categories }) {
  // console.log("test staticProps (resources) : ")
  // console.log(resources)

  // console.log("test staticProps (categories) : ")
  // console.log(categories)
  return (
    <Layout title="Cube | Home">
      <Grid container flexDirection="column">
        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          defaultValue="Normal"
          variant="filled"
        />

        <SelectVariants />
        <Card />

        {resources.map(resource => {
          console.log(resource);
          return (
              <Card key={resource._id} resourceData={resource} categories={categories}/>
          )
        })}
=======
        <ul>
          {resources.map(resource => {
            return (
                <li key={resource._id}>
                  <Link href={`./resource/${resource._id}`}>
                    <a>
                      <Card resourceData={resource} categories={categories}/>
                    </a>
                  </Link>
                </li>
            )
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
  const fetchedResources = await fetch("http://localhost:3000/api/resources/");
  const JsonResources = await fetchedResources.json();
  const resources = JsonResources.resources;

  const fetchedCategories = await fetch("http://localhost:3000/api/categories/");
  const JsonCategories = await fetchedCategories.json();
  const categories = JsonCategories.categories;

  return {
    props: {
      resources,
      categories,
    },
  }
}
