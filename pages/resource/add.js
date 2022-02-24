import React, { useState, useEffect, useMemo, useContext } from "react";
import { getTime } from "date-fns";
import frLocale from "date-fns/locale/fr";
import { useTheme } from "@mui/material/styles";
import { useQuill } from "react-quilljs";
import "react-quill/dist/quill.snow.css";
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Stack,
  Button,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Layout from "../../components/Layout/Layout";
import Snackbar from "../../components/Snackbar";
import { DateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CategoriesSelect from "../../components/Home/CategoriesSelect";

import apiService from "../../services/apiService";
import AuthContext from "../../context/authContext";

const AddArticle = ({ categories }) => {
  const { quill, quillRef } = useQuill();
  const { token } = useContext(AuthContext);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  // Responsive
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // Set de l'editeur de texte
  // Donnees pour l'API
  // La resource finale a envoyer
  const [newResource, setNewResource] = useState({
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    resourceType: "event",
  });
  // States intermediaire pour le titre et les dates et les categories
  const [rCategories, setRCategories] = useState([]);
  // Futur state pour le contenu recupere par l'editeur a recuperer
  // Gestion du changement de categories
  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        console.log("change");
        console.log(delta, oldDelta, source);
        console.log("content", quill.getContents());
      });
    }
  }, [quillRef]);
  useMemo(
    () =>
      setNewResource((newResource) => ({
        ...newResource,
        categories: rCategories,
      })),
    [rCategories]
  );

  const getContent = () => {
    const currentContent = quill.getContents();
    return currentContent.ops;
  };

  // Utils pour racourcir le texte tapé sans couper les mots
  const shortenText = (str, maxLength, separator = " ") => {
    if (str.length <= maxLength) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLength)) + "...";
  };

  const getSummary = () => shortenText(quill.getText(), 200);

  const clearEditor = () => quill.setText("");

  const submitResource = async () => {
    const content = getContent();
    const { categories } = rCategories;
    const thumbnail = createThumbnail();
    const description = getSummary();

    const resource = {
      ...newResource,
      content,
      categories,
      thumbnail,
      description,
    };

    try {
      let createResource = await apiService.createItem(
        "resources",
        resource,
        token
      );
      console.log(createResource);
      if (createResource.status === 201) {
        setNewResource({
          title: "",
          startDate: new Date(),
          endDate: new Date(),
          resourceType: "event",
        });
        setRCategories([]);
        setSnackbarSeverity("success")

        setSnackbarMessage(
          "Votre ressource a bien été créée. Vous pouvez suivre sa validation sur votre profil"
        );
        setIsSnackbarOpen(true);
        clearEditor();
        // quill.setContents([]);
      }
    } catch (err) {
      console.log(err)
      setSnackbarSeverity("error");
      setSnackbarMessage(
        "Erreur à la creation. Veuillez modifier votre ressource et rééssayer."
      );
      setIsSnackbarOpen(true);
    }
  };

  const createThumbnail = () => {
    const currentContent = quill.getContents();
    const firstPic = currentContent.ops.find((i) =>
      i.insert.hasOwnProperty("image")
    );
    return {
      url: firstPic !== undefined ? firstPic.insert.image : "",
      alt: "cover-image",
    };
  };

  return (
    <Layout title="Cube | Ajouter une ressource" withSidebar={false}>
      <Box sx={{ flexGrow: 1, mx: 3 }}>
        <Grid
          container
          spacing={2}
          alignItems={isMobile ? "center" : "flex-start"}
          justifyContent="center"
        >
          <Grid item xs={12}>
            <Typography variant="h2" sx={{ color: "gov.blue", my: 4 }}>
              Ajouter une ressource
            </Typography>
            <FormControl>
              <FormLabel id="event-type" variant="body1">
                Type de ressources
              </FormLabel>
              <RadioGroup
                name="radio-buttons-group"
                value={newResource.resourceType}
                onChange={(e) =>
                  setNewResource({
                    ...newResource,
                    resourceType: e.target.value,
                  })
                }
              >
                <FormControlLabel
                  value="event"
                  control={<Radio />}
                  label="Evénement"
                />
                <FormControlLabel
                  value="association"
                  control={<Radio />}
                  label="Association"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} m={2}>
            <Typography variant="body1" sx={{ color: "gov.blue" }}>
              Titre
            </Typography>
            <TextField
              fullWidth
              id="title"
              label=""
              variant="standard"
              type="text"
              value={newResource.title}
              onChange={(e) =>
                setNewResource({ ...newResource, title: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={4} sx={{ minHeight: "100px", mt: 2 }}>
            <Stack
              direction={isMobile ? "column" : "row"}
              justifyContent={isMobile ? "center" : "flex-start"}
              alignItems="center"
            >
              <CategoriesSelect
                categories={categories}
                setActiveFilter={setRCategories}
                activeFilter={rCategories}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={8} sx={{ minHeight: "100px", mt: 3 }}>
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={3}
              justifyContent={isMobile ? "center" : "flex-start"}
              alignItems="center"
            >
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={frLocale}
              >
                <>
                  <Typography variant="body1" sx={{ color: "gov.blue" }}>
                    du
                  </Typography>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Date de début de l'évènement"
                    minDate={new Date()}
                    value={getTime(newResource.startDate)}
                    onChange={(e) =>
                      setNewResource({
                        ...newResource,
                        startDate: getTime(e),
                      })
                    }
                  />
                </>
                <>
                  <Typography variant="body1" sx={{ color: "gov.blue" }}>
                    au
                  </Typography>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    minDate={newResource.startDate}
                    label="Date de fin de l'évènement"
                    value={getTime(newResource.endDate)}
                    onChange={(e) =>
                      setNewResource({
                        ...newResource,
                        endDate: getTime(e),
                      })
                    }
                  />
                </>
              </LocalizationProvider>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ color: "gov.blue", mb: 2 }}>
              Décrivez plus précisément votre projet
            </Typography>
            <Box ref={quillRef} sx={{ p: 2, minHeight: "300px", mb: 2 }} />
            <Stack
              sx={{ pb: 4, mt: 2 }}
              alignItems={isMobile ? "center" : "flex-end"}
            >
              <Button variant="bleuBtn" onClick={submitResource}>
                Ajouter
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Snackbar
          open={isSnackbarOpen}
          severity={snackbarSeverity}
          message={snackbarMessage}
          onClick={() => setIsSnackbarOpen(false)}
        />
      </Box>
    </Layout>
  );
};

export async function getServerSideProps() {
  let categories = [];
  try {
    const fetchedCategories = await apiService.getItems("categories");
    categories = await fetchedCategories.data.categories;
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      categories,
    },
  };
}

export default AddArticle;
