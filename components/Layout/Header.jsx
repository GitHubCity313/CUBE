import React, { useState, useEffect, useContext } from "react";
import {
  Drawer,
  AppBar,
  Box,
  Typography,
  Toolbar,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logoMini.svg";
import Sidebar from "./Sidebar";
import AuthContext from "../../context/authContext";
import Menu from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";

const Header = (props) => {
  const { withSidebar } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, flexGrow: 1, p: 2 }}
      >
        <Toolbar
          disableGutters
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              ml: "12px",
            }}
          >
            <Link href="/">
              <a>
                <Image
                  src={Logo}
                  width={120}
                  height={102}
                  alt="Picture of the author"
                />
              </a>
            </Link>
            {!isMobile && (
              <Typography
                variant="h6"
                noWrap
                component="div"
                style={{ marginLeft: 50 }}
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                Ressources Relationnelles
              </Typography>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isAuthenticated && session !== undefined && !isMobile && (
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
            {isMobile && !isDrawerOpen && (
              <Menu
                sx={{ color: "gov.blue", cursor: "pointer" }}
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              />
            )}
            {isDrawerOpen && (
              <Close
                sx={{ color: "gov.blue", cursor: "pointer" }}
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={isDrawerOpen} anchor="top">
        <Sidebar />
      </Drawer>
      {withSidebar && !isMobile && (
        <Drawer variant="permanent" sx={{ backgroundColor: "transparent" }}>
          <Sidebar />
        </Drawer>
      )}
    </Box>
  );
};

export default Header;
