import React, {useState} from "react";
import Link from "next/link";
import {Grid, Checkbox, InputLabel, ListItemText, OutlinedInput, Select, TextField} from "@mui/material";
import Card from "../components/Card";
import SelectVariants from "../components/SelectVariants";
import Layout from "../components/Layout/Layout";
import APIService from "../services/APIService";
import MenuItem from "@mui/material/MenuItem";
import { isCategoryChecked } from "../utils";
import FormControl from "@mui/material/FormControl";

export default function Home({ resources, categories }) {
  // console.log("test staticProps (resources) : ")
  // console.log(resources)

  // console.log("test staticProps (categories) : ")
  console.log(categories)
  const _checkedCategories = categories.map((category) => { return {...category, checked: false}});

  const [checkedCategories, setCheckCategory] = useState(_checkedCategories);


  console.log("in Home")
  //console.log(checkedCategories)

  // const updateCheckedCategories = (event) => {
  //   // console.log("event")
  //   // console.log(event.target.value)
  //   // checkedCategories.push(event.target.value)
  //   console.log("checkedCategories in updateCC")
  //   console.log(checkedCategories)
  //   console.log(typeof checkedCategories)
  //   console.log(`pushing : ${event.target.value}`)
  //
  //   setCheckCategory(checkedCategories => checkedCategories.push(event.target.value))
  //
  //   console.log("checkedCategories in updateCC")
  //   console.log(checkedCategories)
  //   console.log(typeof checkedCategories)
  // }

  const handleChange = (event) => {
    const {
      target: { value, id },
    } = event;
    console.log(value, id, checkedCategories);
    //update array
    //setCheckCategory([...category, ])
  };

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

        <div>
          <FormControl sx={{ mt: 20, width: 300}}>
            <InputLabel id="demo-multiple-chip-label">Catégories</InputLabel>
            <Select
                label="demos"
                //id="demo-multiple-checkbox"
                multiple
                value={checkedCategories.filter((categorie) => categorie.checked === true)}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
            >
              {categories.map((category) => (
                  <MenuItem key={category._id} value={category.name}>
                    <Checkbox checked={checkedCategories.checked} />
                    <ListItemText primary={category.name} />
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
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
