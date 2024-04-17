import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({title,text,OnAgree,open,setOpen}:{
    title:string;
    text:string
    OnAgree:()=>void;
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;

}) {

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const agreedAndClose = () => {
    OnAgree();
    handleClose();
  }

  return (
    <React.Fragment>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='bg-white'
      >
        <DialogTitle id="alert-dialog-title">
            {title} 
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={handleClose}>Cancel</Button>
          <Button color='error' onClick={agreedAndClose} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}