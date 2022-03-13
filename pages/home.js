import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Card from "../components/Card";
import CategoriesSelect from "../components/Home/CategoriesSelect";
import DateSelect from "../components/Home/DateSelect";
import Layout from "../components/Layout/Layout";
import apiService from "../services/apiService";
import Searchbar from "../components/Home/Searchbar";

export default function Home({ resources, categories, localities }) {
  const [activeFilter, setActiveFilter] = useState({
    date: "",
    categories: [],
  });
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSearch = (search) => {
    if (search.length === 0) {
      return setActiveFilter({
        date: "",
        categories: [],
      });
    } else {
      let result = displayedEvents.filter(
        (e) =>
          e.title.toLowerCase().includes(search) ||
          e.place.zipCode.includes(search.toString()) ||
          e.place.city.includes(search)
      );

      return setDisplayedEvents(result);
    }
  };
  useMemo(() => {
    if (
      activeFilter.date.length === 0 &&
      activeFilter.categories.length === 0
    ) {
      return setDisplayedEvents(resources);
    } else {
      // L'alias est set pour ne pas confondre ces categories la avec celles que l'on recupere en props
      const { date, categories: selectedCategories } = activeFilter;

      // Le filtrage par categories
      const filteredByCat = resources.reduce((val, acc) => {
        selectedCategories.forEach((cat) => {
          if (acc.categories.includes(cat)) {
            val.push(acc);
          }
        });
        return val;
      }, []);

      // Si on a pas selectionne de types, on appliaue uniauement le filtre par categorie
      if (date.length === 0) {
        return setDisplayedEvents(filteredByCat);
      }
      // Le filtrage par type
      const filteredByDate = resources.reduce((val, acc) => {
        const now = Date.now();
        const currentDate = new Date(now);
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const eventDate = new Date(acc.startDate);
        const currentEventMonth = eventDate.getMonth();
        const currentEventYear = eventDate.getFullYear();

        if (date === "all") {
          val.push(acc);
        }
        if (date === "today" && currentDate === eventDate) {
          val.push(acc);
        }
        if (date === "month" && currentEventMonth === currentMonth) {
          val.push(acc);
        }
        if (date === "year" && currentEventYear === currentYear) {
          val.push(acc);
        }
        return val;
      }, []);

      // Si on a pas selectionne de categorie, on appliaue uniauement le filtre par type
      if (selectedCategories.length === 0) {
        return setDisplayedEvents(filteredByDate);
      }

      // Si on utilise les deux filtres, on affiche les elements sont presents dans les deux tableaux de filtres alors on les affiche
      const duplicates = filteredByCat.filter((val) =>
        filteredByDate.includes(val)
      );

      return setDisplayedEvents(duplicates);
    }
  }, [activeFilter]);

  const handleCategoryChange = (e) =>
    setActiveFilter({
      ...activeFilter,
      categories:
        e.target.value === "string"
          ? e.target.value.split(",")
          : e.target.value,
    });

  return (
    <Layout title="Cube | Home">
      <Grid container flexDirection="column" mt={2}>
        <Grid
          container
          sx={{ mr: 3, pb: 3, borderBottom: "1px solid #E5E5E5" }}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Typography sx={{ pr: 2, color: "gov.blue" }}>Filtres</Typography>
          <CategoriesSelect
            onChange={(e) => handleCategoryChange(e)}
            categories={categories}
            value={activeFilter.categories}
          />
          <DateSelect
            types={[
              { value: "tous", key: "all" },
              { value: "aujourd'hui", key: "today" },
              { value: "ce mois", key: "month" },
              { value: "cette année", key: "year" },
            ]}
            setActiveFilter={setActiveFilter}
            activeFilter={activeFilter}
          />
        </Grid>
        <Grid
          container
          flexDirection={isMobile && "column"}
          sx={{ mr: 3, py: 3 }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography sx={{ pr: 2, color: "gov.blue", pb: isMobile && 3 }}>
            Tous les évènements
          </Typography>

          <Searchbar onChange={(e) => handleSearch(e.target.value)} />
        </Grid>
        {displayedEvents.length !== resources.length && (
          <Typography
            variant="body2"
            sx={{ pr: 2, color: "gov.lightCumulus", pb: isMobile && 3 }}
          >
            {`${displayedEvents.length} évènement(s) trouvé(s)`}
          </Typography>
        )}
        <Grid container pt={2} justifyContent="flex-start">
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
  let localities = [];

  try {
    const fetchedResources = await apiService.getItems("resources");
    const fetchedCategories = await apiService.getItems("categories");
    const fetchedLocalities = await apiService.getItems("zipcode");

    const rawResources = await fetchedResources.data.resources;
    resources = rawResources.filter((r) => r.validationStatus);
    categories = await fetchedCategories.data.categories;
    localities = await fetchedLocalities.data.localities;

    console.log(localities);
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      resources,
      categories,
      localities,
    },
  };
}

Home.propTypes = {
  resources: PropTypes.array,
  categories: PropTypes.array,
  resourceTypes: PropTypes.array,
};
