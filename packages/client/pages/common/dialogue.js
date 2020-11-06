import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog(props) {
  const { message, deleteResponce, isOpen, id } = props;
  const [open, setOpen] = React.useState(isOpen);

  const handleClose = (cb, id) => {
    if (cb === "agree") {
      deleteResponce("agreed", id);
    } else {
      deleteResponce("disagreed", id);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{message} ?</DialogTitle>
  
        <DialogActions>
          <Button onClick={() => handleClose("disagree", id)} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => handleClose("agree", id)}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
