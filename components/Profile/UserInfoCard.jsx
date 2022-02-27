import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Button,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logoMini.svg";

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
              {list.map((e) => (
                <Card
                  sx={{
                    display: "flex",
                    my: 4,
                    mr: 4,
                    alignItems: "center",
                  }}
                  key={e._id}
                >
                  <Typography variant="caption" component="div">
                    {e.title}
                  </Typography>
                  <Link href={`/resource/${e._id}`}>
                    <CardActionArea>
                      {e?.thumbnail?.url ? (
                        <CardMedia
                          component="img"
                          sx={{
                            width: 125,
                            heigth: 125,
                            borderRadius: "16px",
                            objectFit: "cover",
                          }}
                          image={`${e.thumbnail.url}`}
                        />
                      ) : (
                        <Image src={Logo} width={50} height={50} alt="Gouv" />
                      )}
                    </CardActionArea>
                  </Link>
                </Card>
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
