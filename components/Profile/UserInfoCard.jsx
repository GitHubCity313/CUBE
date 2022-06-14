import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Button,
} from "@mui/material";
import EventShortCard from "./EventShortCard";

export default function UserInfoCard(props) {
  const { title, subtitle, isEmptyLabel, list, hasActionButton, actionButton } =
    props;
  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: "gov.blue" }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
        <Box>
          {list.length === 0 ? (
            <>
              <Typography sx={{ my: 2, fontStyle: "italic" }}>
                {isEmptyLabel}
              </Typography>
              {hasActionButton && (
                <Stack justifyContent="end">
                  <Button
                    sx={{ m: 4, alignSelf: "flex-end" }}
                    variant="borderBtn"
                    size="small"
                    color="primary"
                    startIcon={actionButton.icon}
                    onClick={actionButton.onClick}
                  >
                    {actionButton.label}
                  </Button>
                </Stack>
              )}
            </>
          ) : (
            <Stack direction="row">
              {list.map((event) => (
                <EventShortCard event={event} key={event._id} />
              ))}
            </Stack>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

UserInfoCard.defaultProps = {
  hasActionButton: false,
};

UserInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  isEmptyLabel: PropTypes.bool.isRequired,
  list: PropTypes.array,
  hasActionButton: PropTypes.bool,
  actionButton: PropTypes.node.isRequired,
};
