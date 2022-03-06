import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/authContext";
import PropTypes from "prop-types";
import {
  TableBody,
  Button,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  Box,
  Table,
  Stack,
} from "@mui/material";
import PageviewIcon from "@mui/icons-material/Pageview";
import CheckIcon from "@mui/icons-material/Check";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import WarningIcon from "@mui/icons-material/Warning";
import DataTableHead from "./DataTableHead";
import DataHead from "./DataHead";
import Editor from "../Resource/Editor";
import CommentView from "../Resource/CommentView";
import CustomDialog from "../Dialog";
import apiService from "../../services/apiService";
import Snackbar from "../Snackbar";

export default function DataTable({ title, data, type }) {
  useEffect(() => setDisplayedData(data), [data]);
  const { token } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState({
    itemValidation: false,
    itemView: false,
    itemDeletion: false,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [displayedData, setDisplayedData] = useState(data);
  const [targetItem, setTargetItem] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleModalOpening = (id, modalItem) => {
    setTargetItem(id);
    setIsModalOpen({ ...isModalOpen, [modalItem]: true });
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - displayedData.length) : 0;

  const handleChangeOnResource = async (id) => {
    try {
      const targetedItem = displayedData.filter((d) => d._id === id).shift();
      const updatedItem = await apiService.updateItem(
        type,
        id,
        { validationStatus: !targetedItem.validationStatus },
        token
      );
      if (updatedItem.status === 204) {
        const newData = displayedData.map((d) => {
          if (d._id === targetedItem._id) {
            return { ...d, validationStatus: !d.validationStatus };
          } else {
            return d;
          }
        });

        setDisplayedData(newData);
        setSnackbar({
          open: true,
          message: "La sélection a été modifiée",
          severity: "success",
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Erreur pendant la mise à jour",
        severity: "error",
      });
    }
  };

  const handleResourceDeletion = async () => {
    try {
      const itemsToDelete = displayedData.filter((d) =>
        selected.includes(d._id)
      );

      const deletionArr = await Promise.all(
        itemsToDelete.map((i) => apiService.deleteItem(type, i._id, token))
      );
      if (deletionArr.every((e) => e.status === 204)) {
        const newData = displayedData.filter((d) => !selected.includes(d._id));
        setDisplayedData(newData);
        setSelected([]);
        setSnackbar({
          open: true,
          message: "La sélection a été modifiée",
          severity: "success",
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: "La selection n'a pas pu être supprimée",
        severity: "error",
      });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <DataHead
          numSelected={selected.length}
          title={title}
          handleResourceDeletion={handleResourceDeletion}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <DataTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={displayedData.length}
            />
            <TableBody>
              {displayedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort(getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      id={row._id}
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        sx={{ maxWidth: "200px" }}
                        align="left"
                      >
                        {row.title}
                      </TableCell>
                      <TableCell align="left">{row.createdAt}</TableCell>
                      <TableCell align="left">
                        <Stack direction="row" alignItems={"center"}>
                          {row.validationStatus ? (
                            <CheckIcon
                              sx={{ color: "gov.lightMenthe", mr: 1 }}
                            />
                          ) : (
                            <HourglassEmptyIcon
                              sx={{ color: "gov.lightTuile", mr: 1 }}
                            />
                          )}
                          {row.validationStatus ? "Validé" : "En attente"}
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Stack direction="row" alignItems={"center"}>
                          {row.isReported ? (
                            <WarningIcon sx={{ color: "gov.red", mr: 1 }} />
                          ) : (
                            <CheckIcon
                              sx={{ color: "gov.lightMenthe", mr: 1 }}
                            />
                          )}
                          {row.isReported
                            ? "En attente de modération"
                            : "Valide"}
                        </Stack>
                      </TableCell>
                      <TableCell align={type !== "users" ? "left" : "right"}>
                        <Button
                          variant="bleuBtn"
                          sx={{
                            width: "100px",
                            border: "1px solid transparent",
                            backgroundColor: row.validationStatus
                              ? "gov.red"
                              : "gov.lightMenthe",
                          }}
                          onClick={() => handleChangeOnResource(row._id)}
                        >
                          {row.validationStatus ? "Suspendre" : "Publier"}
                        </Button>
                      </TableCell>

                      <TableCell align="left">
                        {type !== "users" && (
                          <Button
                            variant="bleuBtn"
                            startIcon={<PageviewIcon />}
                            onClick={(e) =>
                              handleModalOpening(row._id, "itemView")
                            }
                          >
                            Aperçu
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={displayedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <CustomDialog
        id={"itemView"}
        open={isModalOpen.itemView}
        hasNoConfirmation
        handleClose={() => setIsModalOpen({ ...isModalOpen, itemView: false })}
        title={data.filter((d) => d._id === targetItem)[0]?.title}
        children={
          type === "resource" ? (
            <Editor
              resource={data.filter((d) => d._id === targetItem).shift()}
            />
          ) : (
            <CommentView
              comment={data.filter((d) => d._id === targetItem).shift()}
            />
          )
        }
      />
      <Snackbar
        open={snackbar.open}
        severity={snackbar.severity}
        message={snackbar.message}
        onClick={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
}
