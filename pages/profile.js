import React, {useContext} from "react";
import { Typography } from "@mui/material";
import AuthContext from "../context/authContext";
import Layout from "../components/Layout/Layout";

export default function Profile() {
  const { isAuthenticated, session } = useContext(AuthContext)
  return (
    <Layout title="Cube | Profil">
      {session === null ? (
        <Typography sx={{ pt: 40 }}>Non authentifie</Typography>
      ) : (
        <Typography sx={{ pt: 40 }}>authentifie</Typography>
      )}
    </Layout>
  );
}
