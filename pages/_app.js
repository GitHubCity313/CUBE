import React from "react";
import { ThemeProvider } from "@mui/material/styles";
// Provider qui gère l'authentification
import AuthProvider from "./../context/authProvider";
import theme from "../theme";
//import Marianne from '../public/fonts/Marianne/Marianne-Regular.woff';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider refetchInterval={24 * 60}>
          <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}
export default MyApp;
