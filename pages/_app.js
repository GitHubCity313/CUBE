import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import GlobalStyles from '@mui/material/GlobalStyles';
// Provider qui gère l'authentification -- Refetch interval determine la duree de validite du token
import AuthProvider from "./../context/authProvider";
import theme from "../theme";
//import Marianne from '../public/fonts/Marianne/Marianne-Regular.woff';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider refetchInterval={1440}>
          <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}
export default MyApp;
