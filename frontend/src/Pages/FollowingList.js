import * as React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, Button, List} from "@mui/material"
import Anotheruser from "./Anotheruser";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>{props.following.length} following</Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Following"}
        </DialogTitle>
        <DialogContent>
        <List sx={{ pt: 0 }}>
        {props.following.map((id) => (
          <Anotheruser id={id}  connectiontype="following"/>
        ))}
      </List>
       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
