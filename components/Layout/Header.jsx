import React, { useState, useEffect, useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Drawer,
  AppBar,
  Box,
  Typography,
  InputBase,
  Toolbar,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logoMini.svg";
import Sidebar from "./Sidebar";
import AuthContext from "../../context/authContext";

const Header = (props) => {
  const { withSidebar } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { session, fetchProfile, isAuthenticated, token } =
    useContext(AuthContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profile = await fetchProfile(token);
        setUser(profile);
      } catch (err) {}
    };

    const onLoad = async () => await getProfile();

    return onLoad();
  }, [session]);
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
          {isAuthenticated && (
            <>
              <Typography
                variant="body2"
                sx={{ color: "gov.blue" }}
              >{`${user?.firstName} ${user?.lastName}`}</Typography>
              <Avatar
                alt={`${user?.firstName}`}
                src={`${user?.profilePic}`}
                sx={{ mr: 2, ml: 2 }}
              />{" "}
            </>
          )}
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
