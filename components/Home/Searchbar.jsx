import React from "react";
import { styled, alpha } from "@mui/material/styles";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
    padding: theme.spacing(1),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "18ch",
      "&:focus": {
        width: "24ch",
      },
    },
  },
}));

const SearchBar = (props) => {
  const { onChange } = props;
  return (
    <Search
      variant="searchHeader"
      sx={{
        borderBottom: "2px solid #000091",
        display: "flex",
        flexDirection: "row-reverse",
        backgroundColor: "#EEEEEE",
        maxWidth: "300px",
        paddingLeft: 2,
      }}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="ex : 65400, test"
        inputProps={{ "aria-label": "search", sx: { fontSize: "12px" } }}
        onChange={onChange}
      />
    </Search>
  );
};

export default SearchBar;
