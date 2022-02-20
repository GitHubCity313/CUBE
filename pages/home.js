import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import Card from "../components/Card";
import CategoriesSelect from "../components/Home/CategoriesSelect";
import ResourceTypeSelect from "../components/Home/ResourceTypeSelect";
import Layout from "../components/Layout/Layout";
import apiService from "../services/apiService";
import { indexResourceTypes, getCategoryByName } from "../utils";

export default function Home({ resources, categories, resourceTypes }) {
  const [activeFilter, setActiveFilter] = useState({
    types: [],
    categories: [],
  });
  const [displayedEvents, setDisplayedEvents] = useState([]);

  useMemo(() => {
    if (
      activeFilter.types.length === 0 &&
      activeFilter.categories.length === 0
    ) {
      return setDisplayedEvents(resources);
    } else {
      // L'alias est set pour ne pas confondre ces categories la avec celles que l'on recupere en props
      const { types, categories: selectedCategories } = activeFilter;

      // Le filtrage par categories
      const filteredByCat = resources.reduce((val, acc) => {
        const selectedCat = selectedCategories
          .map((name) => getCategoryByName(name, categories))
          .flat();

        selectedCat.forEach((cat) => {
          if (acc.categories.includes(cat._id)) {
            val.push(acc);
          }
        });
        return val;
      }, []);

      // Si on a pas selectionne de types, on appliaue uniauement le filtre par categorie
      if (types.length === 0) {
        return setDisplayedEvents(filteredByCat);
      }
      // Le filtrage par type
      const filteredByType = resources.reduce((val, acc) => {
        if (activeFilter.types.length === 1) {
          if (
            acc.resourceType === activeFilter.types[0] &&
            !val.includes(acc)
          ) {
            val.push(acc);
          }
        } else {
          types.forEach((type) => {
            if (acc.resourceType === type && !val.includes(acc)) {
              val.push(acc);
            }
          });
        }

        return val;
      }, []);

      // Si on a pas selectionne de categorie, on appliaue uniauement le filtre par type
      if (categories.length === 0) {
        return setDisplayedEvents(filteredByType);
      }

      // Si on utilise les deux filtres, on affiche les elements sont presents dans les deux tableaux de filtres alors on les affiche
      const duplicates = filteredByCat.filter((val) =>
        filteredByType.includes(val)
      );

      return setDisplayedEvents(duplicates);
    }
  }, [activeFilter]);

  return (
    <Layout title="Cube | Home">
      <Grid container flexDirection="column" mt={2}>
        <Grid
          container
          sx={{ ml: 3, pb: 3, borderBottom: "1px solid #E5E5E5" }}
          alignItems="center"
          justifyContent="center"
        >
          <Typography sx={{ pr: 2, color: "gov.blue" }}>Filtrer par</Typography>
          <CategoriesSelect
            categories={categories}
            setActiveFilter={setActiveFilter}
            activeFilter={activeFilter}
          />
          <ResourceTypeSelect
            types={resourceTypes}
            setActiveFilter={setActiveFilter}
            activeFilter={activeFilter}
          />
        </Grid>
        <Grid container pt={2} justifyContent="center">
          {displayedEvents.map((resource) => {
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

export async function getServerSideProps() {
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
