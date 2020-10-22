import { useState } from "react";
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
const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

function UsersList(props) {
  const classes = useStyles();
  const { userdata } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setselected] = useState(-1);

  const handleClick = (event, i) => {
    setselected(i);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              userdata.map((row, i) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.company.name}</TableCell>
                  <TableCell>{row.phone}</TableCell>

                  <TableCell>
                    <div>
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
                        <MenuItem onClick={handleClose}>Edit</MenuItem>
                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                      </Menu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
UsersList.getInitialProps = async (ctx) => {
 

  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const json = await res.json();
  return {
    
    userdata: json,
  };
};
export default UsersList;
