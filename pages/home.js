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
import Layout from "../components/Layout/Layout";
import apiService from "../services/apiService";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import theme from "../theme";
import PropTypes from "prop-types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Home({ resources, categories }) {
  const [categoriesName, setCategory] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Layout title="Cube | Home">
      <Grid container flexDirection="column">
        <div>
          <FormControl sx={{ mt: 20, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">Catégories</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={categoriesName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category._id}
                  value={category.name}
                  style={getStyles(category.name, categoriesName, theme)}
                >
                  {category.name}
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

export async function getServerSideProps(user) {
  let resources = [];
  let categories = [];

  try {
    const fetchedResources = await apiService.getItems("resources");
    const fetchedCategories = await apiService.getItems("categories");

    resources = await fetchedResources.data.resources;
    categories = await fetchedCategories.data.categories;
    console.log("getStaticProps() types:");
    console.log(typeof resources);
    console.log(typeof categories);
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
  resources: PropTypes.object,
  categories: PropTypes.object,
};
