import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Layout from "../components/Layout";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useRouter } from "next/router";
import AlertDialog from "../common/dialogue";
import CommonSnackbars from "../common/snackbar";
import TablePagination from "@material-ui/core/TablePagination";
import api from "../api/api";
import CommonCreateButton from "../common/create-searchbar";

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
  titlewidth: {
    width: "8rem",
  },
});
let timeout = 0;
function CategoryList(props) {
  const classes = useStyles();
  const { data, total } = props;
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setselected] = useState(-1);
  const [category, setcategory] = useState(data);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [open, setOpen] = React.useState({
    message: "",
    isopen: false,
    id: "",
  });
  const [alert, setalert] = useState({
    isopen: false,
    message: "",
    type: "",
  });
  const [formvalue, setformvalue] = useState({
    search: "",
  });

  const handleSearchFormChange = (event) => {
    if (timeout) clearTimeout(timeout);
    setformvalue({ ...formvalue, [event.target.name]: event.target.value });
    timeout = setTimeout(() => {
      apiHandle(page, rowsPerPage, event.target.value);
    }, 300);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    apiHandle(newPage, rowsPerPage, formvalue.search);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    apiHandle(page, event.target.value, formvalue.search);
  };

  const handleClick = (event, i) => {
    setselected(i);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditItem = (item, i) => {
    router.push(
      { pathname: "/user-management/edit-users", query: { pid: item.id } },
      `/user/${item.id}`
    );
  };

  const deleteResponce = async (res, id) => {
    if (res === "agreed") {
      const res = await api.delete(`category/${id}`);
      if (res.status === 200) {
        apiHandle(page, rowsPerPage, formvalue.search);
        setOpen({ ...open, isopen: false, message: ``, id: "" });
        setalert({
          ...alert,
          isopen: true,
          message: "Deleted Successfully !",
          type: "success",
        });
      } else {
        setalert({
          ...alert,
          isopen: true,
          message: "Something Error happened. please Try again !",
          type: "error",
        });
      }
    } else {
      setOpen({ ...open, isopen: false, message: "", id: "" });
      setalert({
        ...alert,
        isopen: true,
        message: "Cancelled Successfully !",
        type: "info",
      });
    }
  };

  const handleDelete = (item, i) => {
    if (i === selected) {
      setOpen({
        ...open,
        isopen: true,
        message: `Are You Sure want to delete ${item.category}`,
        id: item.id,
      });
    }
  };

  const apiHandle = async (page, setRowsPerPage, search) => {
    const res = await fetch(
      `http://localhost:3100/category?search=${search}&page=${page}&limit=${setRowsPerPage}`
    );
    const json = await res.json();
    setcategory([...json.data]);
  };

  const alertResponce = (cb) => {
    setalert({ ...alert, isopen: false, type: "", message: "" });
  };

  return (
    <Layout {...props}>
      <CommonCreateButton
        formvalue={formvalue}
        handleSearchFormChange={handleSearchFormChange}
      />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {category &&
              category.map((row, i) => (
                <TableRow key={row.id}>
                  <TableCell className={classes.titlewidth}>
                    {row.category}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <>
                      <IconButton onClick={(e) => handleClick(e, i)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={i === selected && Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => handleEditItem(row, i)}>
                          Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(row, i)}>
                          Delete
                        </MenuItem>
                      </Menu>
                    </>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[4, 10, 25, 50]}
        count={total}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {open.isopen && (
        <AlertDialog
          isOpen={open.isopen}
          message={open.message}
          id={open.id}
          deleteResponce={deleteResponce}
        />
      )}

      {alert.isopen && (
        <CommonSnackbars alertResponce={alertResponce} alert={alert} />
      )}
    </Layout>
  );
}

export async function getStaticProps({ rowsPerPage }) {
  const res = await fetch(`http://localhost:3100/category`);
  const json = await res.json();

  return {
    props: json,
  };
}

export default CategoryList;
