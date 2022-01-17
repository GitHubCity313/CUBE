import { ThemeProvider } from '@mui/material/styles';
import theme from "../theme";
//import Marianne from '../public/fonts/Marianne/Marianne-Regular.woff';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default MyApp
