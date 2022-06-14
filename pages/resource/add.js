import React, { useState, useMemo, useContext } from "react";
import PropTypes from "prop-types";
import { getTime } from "date-fns";
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
} from "@mui/material";
import Layout from "../../components/Layout/Layout";
import DatePicker from "../../components/DatePicker";
//import TypeRadio from "../../components/Event/TypeRadio";
import Snackbar from "../../components/Snackbar";
import CategoriesSelect from "../../components/Home/CategoriesSelect";

import apiService from "../../services/apiService";
import AuthContext from "../../context/authContext";
import editorUtils from "../../utils/editorUtils";

const AddArticle = ({ categories }) => {
  const options = editorUtils.getEditorOptions();
  const { quill, quillRef } = useQuill({
    ...options,
    readOnly: false,
    placeholder:
      "Exemple : Adieu les prises de tête face à la liste de fournitures scolaires ! Cette année à Lille, la mairie fournit gratuitement et sans condition de ressources des kits scolaires. Une initiative saluée par les parents qui n'y voient que des avantages.",
  });
  const { token, session, fetchProfile } = useContext(AuthContext);
  // Snackbar apres soumission de la ressource
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  // Responsive
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // La resource finale a envoyer
  const [newResource, setNewResource] = useState({
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    resourceType: "event",
    categories: [],
    place: {
      city: "",
      zipCode: "",
    },
  });

  // Verifie que la ressource a un titre et des categories avant de permettre l'envoi
  const isFormValid = useMemo(() => {
    const { categories, title } = newResource;
    return title !== "" && categories && categories.length !== 0;
  }, [newResource]);

  // Util pour racourcir le texte tapé sans couper les mots - Snippet useful af o/
  const shortenText = (str, maxLength, separator = " ") => {
    if (str.length <= maxLength) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLength)) + "...";
  };

  // Fetch des données de l'editeur
  const getContent = () => quill.getContents().ops;
  const getSummary = () => shortenText(quill.getText(), 200);
  const createThumbnail = () => {
    const currentContent = quill.getContents();

    //const firstPic = currentContent.ops.find((i) => "image" in i.insert);
    const firstPic = undefined;
    return {
      url: firstPic !== undefined ? firstPic.insert.image : "",
      alt: "cover-image",
    };
  };
  const clearEditor = () => quill.setText("");

  // Util pour le changement de couleur
  const isEvent = () => newResource.resourceType === "event";

  // Validation
  const submitResource = async () => {
    const content = getContent();
    const thumbnail = createThumbnail();
    const description = getSummary();

    const { endDate, startDate, place } = newResource;

    const resource = {
      eventType: "event",
      ...newResource,
      content,
      thumbnail,
      description,
      endDate: endDate,
      startDate: startDate,
      place,
    };

    try {
      let createResource = await apiService.createItem(
        "resources",
        resource,
        token
      );

      console.log(createResource);
      if (createResource.status === 201) {
        const profile = await fetchProfile();
        const events = profile.hasEventsCreated;
        const newResource = [createResource.data.add.insertedId];
        const newEvents = events.concat(newResource);
        await apiService.updateItem(
          "users",
          session.id,
          {
            hasEventsCreated: newEvents,
          },
          token
        );
        setNewResource({
          title: "",
          startDate: new Date(),
          endDate: new Date(),
          resourceType: "event",
          categories: [],
          place: {
            city: "",
            zipCode: "",
          },
        });
        setSnackbarSeverity("success");

        setSnackbarMessage(
          "Votre ressource a bien été créée. Vous pouvez suivre sa validation sur votre profil"
        );
        setIsSnackbarOpen(true);
        clearEditor();
      }
    } catch (err) {
      console.log(err);
      setSnackbarSeverity("error");
      setSnackbarMessage(
        "Erreur à la creation. Veuillez modifier votre ressource et rééssayer."
      );
      setIsSnackbarOpen(true);
    }
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
            <Typography
              variant="h2"
              sx={{
                color: isEvent() ? "gov.blue" : "gov.mediumGlycine",
                my: 4,
              }}
            >
              Ajouter une ressource
            </Typography>
          </Grid>
          <Grid item xs={12} m={2}>
            <Typography
              variant="body1"
              sx={{ color: isEvent() ? "gov.blue" : "gov.mediumGlycine" }}
            >
              Titre
            </Typography>
            <TextField
              fullWidth
              required
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
                onChange={(e) =>
                  setNewResource((newResource) => ({
                    ...newResource,
                    categories:
                      e.target.value === "string"
                        ? e.target.value.split(",")
                        : e.target.value,
                  }))
                }
                value={newResource.categories}
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
              <DatePicker
                onChange={(e) =>
                  setNewResource({
                    ...newResource,
                    startDate: getTime(e),
                  })
                }
                value={getTime(newResource.startDate)}
                minDate={new Date()}
                pickerLabel="Date de début de l'évènement"
                label={"du"}
                isEvent={isEvent()}
              />

              <DatePicker
                onChange={(e) =>
                  setNewResource({
                    ...newResource,
                    endDate: getTime(e),
                  })
                }
                value={getTime(newResource.endDate)}
                minDate={newResource.startDate}
                pickerLabel="Date de fin de l'évènement"
                label={"au"}
                isEvent={isEvent()}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography
              variant="body2"
              sx={{
                color: isEvent() ? "gov.blue" : "gov.mediumGlycine",
                ml: 1,
              }}
            >
              Code postal
            </Typography>
            <TextField
              fullWidth
              required
              id="zipCode"
              label=""
              variant="standard"
              type="text"
              sx={{ maxWidth: "100px", ml: 1 }}
              value={newResource.place.zipCode}
              onChange={(e) =>
                setNewResource({
                  ...newResource,
                  place: { ...newResource.place, zipCode: e.target.value },
                })
              }
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ py: 4 }}>
            <Typography
              variant="body2"
              sx={{ color: isEvent() ? "gov.blue" : "gov.mediumGlycine" }}
            >
              Lieu
            </Typography>
            <TextField
              fullWidth
              required
              id="city"
              label=""
              variant="standard"
              type="text"
              value={newResource.place.city}
              onChange={(e) =>
                setNewResource({
                  ...newResource,
                  place: { ...newResource.place, city: e.target.value },
                })
              }
            />
          </Grid>
          <Grid item md={4} xs={12}></Grid>

          <Grid item xs={12}>
            <Typography
              variant="body1"
              sx={{
                color: isEvent() ? "gov.blue" : "gov.mediumGlycine",
                mb: 2,
              }}
            >
              Décrivez plus précisément votre projet
            </Typography>
            <Box
              ref={quillRef}
              sx={{ minHeight: "300px", mb: 2 }}
              onChange={() =>
                setNewResource({
                  ...newResource,
                  content: getContent(),
                })
              }
            />
            <Stack
              sx={{ pb: 4, mt: 2 }}
              alignItems={isMobile ? "center" : "flex-end"}
            >
              <Button
                variant="bleuBtn"
                onClick={submitResource}
                disabled={!isFormValid}
              >
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

AddArticle.propTypes = {
  categories: PropTypes.array,
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
