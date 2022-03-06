import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Typography } from "@mui/material";
import DataTable from "../components/BackOffice/DataTable";
import apiService from "../services/apiService";

export default function AdminPanel({ resources, comments, users }) {
  const router = useRouter();
  const [value, setValue] = useState("0");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Formate les trois tableaux de données pour afficher les mênmes infos dans les panneaux
  // Essentiellement pour la gestion de l áffichage des dates
  const formatData = () => {
    switch (value) {
      case "0":
        const resourceTable = resources.map((r) => {
          return {
            ...r,
            createdAt: format(new Date(r.createdAt), "dd/MM/yyyy"),
          };
        });
        return resourceTable;
      case "1":
        const commentTable = comments.map((c) => {
          return {
            ...c,
            createdAt: format(new Date(c.createdAt), "dd/MM/yyyy"),
          };
        });
        return commentTable;
      case "2":
        const userTable = users.map((u) => {
          return {
            ...u,
            title: u.lastName + " " + u.firstName,
            createdAt: format(new Date(u.createdAt), "dd/MM/yyyy"),
          };
        });
        return userTable;
      default:
        return [];
    }
  };

  return (
    <Layout title="Cube | Admin" withSidebar={false}>
      <Typography variant="h1" sx={{ color: "gov.blue", mt: 2 }}>
        Administration
      </Typography>
      <Box sx={{ width: "100%", typography: "body1", minHeight: "70vh" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Gestion des publications" value={"0"} />
              <Tab label="Gestion des commentaires" value={"1"} />
              <Tab label="Gestion des utilisateurs" value={"2"} />
              <Tab label="Statistiques" value={"3"} />
            </TabList>
          </Box>
          <TabPanel value={"0"}>
            <DataTable
              title="Ressources"
              data={formatData(resources)}
              type="resources"
            />
          </TabPanel>
          <TabPanel value="1">
            <DataTable
              title="Commentaires"
              data={formatData(comments)}
              type="comments"
            />
          </TabPanel>
          <TabPanel value="2">
            <DataTable
              title="Utilisateurs"
              data={formatData(users)}
              type="users"
            />
          </TabPanel>
          <TabPanel value="3">Staaaaats</TabPanel>
        </TabContext>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps() {
  let resources = [];
  let users = [];
  let comments = [];

  try {
    const fetchedResources = await apiService.getItems("resources");
    const fetchedUsers = await apiService.getItems("users");
    const fetchedComments = await apiService.getItems("comments");

    resources = await fetchedResources.data.resources;
    users = await fetchedUsers.data.users;
    comments = await fetchedComments.data.users;
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      resources,
      users,
      comments,
    },
  };
}
