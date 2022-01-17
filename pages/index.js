import React from "react";
import { Box, TextField } from "@mui/material";
import Card from "../components/Card";
import SelectVariants from "../components/SelectVariants";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout title="Cube | Home">
      <Box sx={{ marginLeft: "13.9vw", backgroundColor: "#FBFBFB" }}>
        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          defaultValue="Normal"
          variant="filled"
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <SelectVariants />
        <Card />
      </Box>
    </Layout>
  );
}
