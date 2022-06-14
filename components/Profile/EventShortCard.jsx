import * as React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  Tooltip,
  CardActionArea,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

export default function EventShortCard({ event }) {
  const router = useRouter();
  return (
    <Card sx={{ width: "100%", mt: 2 }}>
      <CardContent>
        <CardActionArea onClick={() => router.push(`./resource/${event._id}`)}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            minHeight="50px"
            sx={{
              p: 1,
              px: 2,
              backgroundColor: "white",
            }}
          >
            <Typography variant="body1" sx={{ color: "gov.darkCumulus" }}>
              {event?.title}
            </Typography>

            <Stack justifyContent="space-between" sx={{ ml: 3 }}>
              {event.validationStatus ? (
                <Tooltip title="Votre ressource est disponible sur la plateforme">
                  <TaskAltIcon sx={{ color: "gov.lightMenthe" }} />
                </Tooltip>
              ) : (
                <Tooltip title="Ressource en cours de validation">
                  <HourglassEmptyIcon sx={{ color: "gov.lightTuile" }} />
                </Tooltip>
              )}
            </Stack>
          </Stack>
        </CardActionArea>
      </CardContent>
    </Card>
  );
}

EventShortCard.propTypes = {
  event: PropTypes.object,
};
