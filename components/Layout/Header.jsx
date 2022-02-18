import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Drawer,
  AppBar,
  Box,
  Typography,
  InputBase,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logoMini.svg";
import Sidebar from "./Sidebar";

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

const Header = (props) => {
  const { withSidebar } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        variant="header"
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box sx={{ cursor: "pointer" }}>
            <Link href="/">
              <Image
                src={Logo}
                width={120}
                height={102}
                alt="Picture of the author"
              />
            </Link>
          </Box>
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
      {withSidebar && !isMobile && (
        <Drawer variant="permanent" sx={{ backgroundColor: "transparent" }}>
          <Sidebar />
        </Drawer>
      )}
    </Box>
  );
};

export default Header;
