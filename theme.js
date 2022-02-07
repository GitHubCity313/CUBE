import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000091",
    },
    secondary: {
      main: "#EEEEEE",
    },
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#F9F8F6",
          boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.2)",
          borderRadius: "0px",
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "bleuBtn" },
          style: {
            backgroundColor: "#000091",
            color: "#FFFFFF",
            textTransform: "capitalize",
            borderRadius: "0px",
            boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.2)",
            padding: "0.3rem 1.3rem 0.3rem 1.3rem",
            border: "1px solid #000091",
            ":hover": {
              backgroundColor: "transparent",
              border: "1px solid #000091",
              color: "#000091",
            },
          },
        },
        {
          props: { variant: "borderBtn" },
          style: {
            backgroundColor: "transparent",
            border: "1px solid #000091",
            textTransform: "capitalize",
            color: "#000091",
            boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.2)",
            padding: "0.3rem 0.5rem 0.3rem 0.5rem",
            borderRadius: "0px",
            ":hover": {
              backgroundColor: "#000091",
              border: "1px solid #000091",
              color: "#FFFFFF",
              fill: "#FFFFFF",
            },
          },
        },
      ],
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: "h1" },
          style: {
            fontFamily: "Marianne",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "32px",
            lineHeight: "40px",
            marginBottom: "24px",
          },
        },
        {
          props: { variant: "h2" },
          style: {
            fontFamily: "Marianne",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "28px",
            lineHeight: "36px",
            marginBottom: "24px",
          },
        },
        {
          props: { variant: "h3" },
          style: {
            fontFamily: "Marianne",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "24px",
            lineHeight: "32px",
            marginBottom: "24px",
          },
        },
        {
          props: { variant: "h4" },
          style: {
            fontFamily: "Marianne",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "22px",
            lineHeight: "28px",
            marginBottom: "24px",
          },
        },
        {
          props: { variant: "categoryTypo" },
          style: {
            fontFamily: "Marianne",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "12px",
            lineHeight: "20px",
            color: "#666666",
          },
        },
        {
          props: { variant: "TitreCard" },
          style: {
            fontFamily: "Marianne",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "20px",
            lineHeight: "28px",
            color: "black",
          },
        },
        {
          props: { variant: "DesCard" },
          style: {
            fontFamily: "Marianne",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "13px",
            //lineHeight: "16px",
            color: "black",
          },
        },
        {
          props: { variant: "TitreSelect" },
          style: {
            fontFamily: "Marianne",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "16px",
            lineHeight: "20px",
          },
        },
      ],
    },
    MuiCardContent: {
      variants: [
        {
          props: { variant: "wrapperImageCard" },
          style: {
            width: "100%",
            height: "185px",
            padding: "0px",
            overflow: "hidden",
          },
        },
        {
          props: { variant: "wrapperContentCard" },
          style: {
            padding: "0px",
            paddingLeft: "30px",
            paddingRight: "30px",
          },
        },
      ],
    },
    MuiCardMedia: {
      variants: [
        {
          props: { variant: "imageCard" },
          style: {
            width: "100%",
            height: "100%",
          },
        },
      ],
    },
    MuiFormControl: {
      variants: [
        {
          props: { variant: "filled" },
          style: {
            width: "300px",
            height: "50px",
            borderBottom: "2px solid #3A3A3A",
          },
        },
      ],
    },
    MuiAppBar: {
      variants: [
        {
          props: { variant: "header" },
          style: {
            backgroundColor: "white",
            color: "black",
            width: "100vw",
            height: "126px",
            paddingTop: "1%",
            paddingBottom: "1%",
            paddingLeft: "100px",
            paddingRight: "100px",
            boxShadow:
              "0px 16px 16px -16px rgba(0, 0, 0, 0.32), 0px 8px 16px rgba(0, 0, 0, 0.1)",
          },
        },
      ],
    },
    MuiSearch: {
      variants: [
        {
          props: { variant: "searchHeader" },
          style: {
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            backgroundColor: "red",
          },
        },
      ],
    },
    MuiInputBase: {
      variants: [
        {
          props: { variant: "searchHeader" },
          style: {
            backgroundColor: "red",
            borderRadius: "0px",
            border: "1px solid #3A3A3A",
          },
        },
      ],
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: "filled" },
          style: {
            borderRadius: "0px",
            "&.MuiInputBase-root::after": {
              border: "1px solid transparent",
              transform: "none",
            },
          },
        },
      ],
    },
  },
});

export default theme;
