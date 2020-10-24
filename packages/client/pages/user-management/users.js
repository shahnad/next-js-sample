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

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

function UsersList(props) {
  const classes = useStyles();
  const { userdata } = props;
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setselected] = useState(-1);
  const [open, setOpen] = React.useState({
    windowOpen: false,
    PropsPass: false,
  });

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
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userdata &&
              userdata.slice(0, 6).map((row, i) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.company.name}</TableCell>
                  <TableCell>{row.phone}</TableCell>
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
      {open.windowOpen && <AlertDialog open={open.PropsPass} />}
    </Layout>
  );
}
UsersList.getInitialProps = async (ctx) => {
  const res = await fetch(`${process.env.customKey}users`);
  const json = await res.json();
  return {
    userdata: json,
  };
};
export default UsersList;
