import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  CardActionArea,
  Stack,
} from "@mui/material";
import { getMatchingCategories } from "../utils";
import Link from "next/link";
import PropTypes from "prop-types";

export default function MultiActionAreaCard({ resourceData, categories }) {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "transparent",
        height: "250px",
      }}
    >
      <CardActionArea>
        <CardMedia
          variant="imageCard"
          component="img"
          src={resourceData?.thumbnail.url}
          alt={resourceData?.thumbnail.alt}
          sx={{
            objectFit: "fill",
            height: "100%",
            padding: "0px",
          }}
        />
      </CardActionArea>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 2,
          backgroundColor: "#f9f8f6",
        }}
      >
        <Stack spacing={1} justifyContent="space-between" sx={{ mt: 2 }}>
          <Typography variant="categoryTypo">
            {resourceData?.categories.map((resourceCategory) => {
              return getMatchingCategories(resourceCategory, categories);
            })}
          </Typography>
          <Typography gutterBottom variant="TitreCard" component="div">
            {resourceData?.title}
          </Typography>
          <Typography variant="DesCard">
            {resourceData?.description}...
          </Typography>
        </Stack>
        <Stack spacing={2} justifyContent="space-evenly">
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: 4,
              px: 0,
            }}
          >
            <Button variant="bleuBtn" size="small" color="primary">
              Suivre
            </Button>
            <Link href={`./resource/${resourceData._id}`}>
              <Button variant="borderBtn" size="small" color="primary">
                En savoir plus
              </Button>
            </Link>
          </CardActions>
        </Stack>
      </CardContent>
    </Card>
  );
}

MultiActionAreaCard.propTypes = {
  resourceData: PropTypes.object,
  categories: PropTypes.array,
};
