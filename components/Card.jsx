import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import getMatchingCategories from "../utils";

const styles = () => ({
  default: {},
});

export default function MultiActionAreaCard({ resourceData, categories }) {
  // console.log("test MultiActionAreaCard (categories) : ")
  // console.log(categories)
  // console.log("resourceData")
  // console.log(resourceData)
  return (
    <Card
      sx={{ maxWidth: 700, height: "fit-content" }}
      sx={{ display: "flex" }}
    >
      <CardContent variant="wrapperImageCard">
        <CardMedia
          variant="imageCard"
          component="img"
          image={resourceData?.thumbnail.url}
          alt={resourceData?.thumbnail.alt}
        />
      </CardContent>
      <CardContent variant="wrapperContentCard">
        <Typography variant="categoryTypo">
          {
            resourceData?.categories.map(resourceCategory => {
              return getMatchingCategories(resourceCategory, categories);
            })
          }
        </Typography>
        <Typography gutterBottom variant="TitreCard" component="div">
          {resourceData?.name}
        </Typography>
        <Typography variant="DesCard">
          {resourceData?.description}
        </Typography>
        <CardActions>
          <Button variant="borderBtn" size="small" color="primary">
            Share
          </Button>
          <Button variant="bleuBtn" size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
