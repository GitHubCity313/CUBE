import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import Logo from "../../public/logoMini.svg";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Link } from "@mui/material";

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  borderRaduis: "10px",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  marginRight: "100px",
  borderRadius: "0px",
  textAlign: "left",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ElevationScroll {...props}>
        <AppBar variant="header" position="fixed">
          <Toolbar>
            <Link href="/">
              <Image
                src={Logo}
                width={120}
                height={102}
                alt="Picture of the author"
              />
            </Link>
            <Typography
              variant="h6"
              noWrap
              component="div"
              style={{ marginLeft: 50 }}
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Ressources Relationnelles
            </Typography>
            <Search
              variant="searchHeader"
              style={{
                borderBottom: "2px solid #000091",
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "space-between",
                backgroundColor: "#EEEEEE",
                width: "300px",
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Rechercher"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
}
