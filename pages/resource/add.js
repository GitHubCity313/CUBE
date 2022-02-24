import React, { useState, useEffect, useMemo, useContext } from "react";
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
import { getTime } from "date-fns";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useTheme } from "@mui/material/styles";
import Layout from "../../components/Layout/Layout";
import dynamic from "next/dynamic";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import CategoriesSelect from "../../components/Home/CategoriesSelect";
import frLocale from "date-fns/locale/fr";
import { convertToRaw } from "draft-js";
import apiService from "../../services/apiService";
import AuthContext from "../../context/authContext";
// import dynamiaue de l'editeur> Permet de contourner le fait que window n'est pas defini au montage
const Editor = dynamic(
  () => {
    return import("react-draft-wysiwyg").then((mod) => mod.Editor);
  },
  { ssr: false }
);

const AddArticle = ({ categories }) => {
  const { token } = useContext(AuthContext);
  // Responsive
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // Set de l'editeur de texte
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
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
  useMemo(
    () =>
      setNewResource((newResource) => ({
        ...newResource,
        categories: rCategories,
      })),
    [rCategories]
  );

  useEffect(() => {
    // Récupère le contenu actuel de l'éditeur
    const lol = editorState.getCurrentContent();
    const test = convertToRaw(lol);
    console.log(test, "contenu de l'article");
  }, [editorState]);

  const getContent = () => {
    const currentContent = editorState.getCurrentContent();
    const rawContent = convertToRaw(currentContent);
    return JSON.stringify(rawContent);
  };

  const toolbarOptions = [
    "inline",
    "blockType",
    "fontSize",
    "list",
    "textAlign",
    "link",
    "embedded",
    "emoji",
    "image",
    "history",
  ];

  const submitResource = async () => {
    const content = getContent();
    const { categories } = rCategories;
    const resource = { ...newResource, content, categories };

    console.log(resource);
    try {
      let createResource = await apiService.createItem(
        "resources",
        resource,
        token
      );
      console.log(createResource);
    } catch (err) {
      console.log(err);
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
            <Typography variant="h2" sx={{ color: "gov.blue", my: 4 }}>
              Ajouter un évènement
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
                      setNewResource({ ...newResource, startDate: getTime(e) })
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
                      setNewResource({ ...newResource, endDate: getTime(e) })
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
            <Box
              sx={{
                mb: 3,
                backgroundColor: "gov.white",
                border: `1px solid ${theme.palette.gov.darkCumulus}`,
              }}
            >
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                toolbar={{ options: toolbarOptions }}
                wrapperStyle={{
                  minHeight: isMobile ? "400px" : "200px",
                  margin: "10px",
                }}
                toolbarStyle={{
                  border: `1px solid ${theme.palette.gov.blue}`,
                  backgroundColor: `${theme.palette.gov.blue}`,
                  padding: "10px",
                  margin: "-10px",
                }}
              />
            </Box>
            <Stack sx={{ pb: 4 }} alignItems={isMobile ? "center" : "flex-end"}>
              <Button variant="bleuBtn" onClick={submitResource}>
                Ajouter
              </Button>
            </Stack>
          </Grid>
        </Grid>
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
