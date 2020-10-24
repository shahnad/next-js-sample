import React, { useState } from "react";
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
import TablePaginations from "./Pagination";
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
  titlewidth: {
    width: "8rem",
  },
});

function CategoryList(props) {
  const classes = useStyles();
  const { data, total } = props;

  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setselected] = useState(-1);
  const [open, setOpen] = React.useState({
    windowOpen: false,
    PropsPass: false,
  });

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
  const handleDelete = (item, i) => {
    if (i === selected) {
      let data = {
        open: true,
        message: "Are you sure",
      };
      setOpen({
        ...open,
        windowOpen: true,
        PropsPass: true,
      });
      // setTimeout(() => {
      //   setOpen({
      //     ...open,
      //     windowOpen: false,
      //   });
      // }, 1000);
    }
  };
  return (
    <Layout {...props}>
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
            {data &&
              data.map((row, i) => (
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
        count={100}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Layout>
  );
}

export async function getStaticProps({ rowsPerPage }) {
  const res = await fetch(
    `http://localhost:3100/category?filter=%7B%7D&range=0&range=4&sort=id&sort=ASC`
  );
  const json = await res.json();

  return {
    props: json, // will be passed to the page component as props
  };
}

export default CategoryList;
