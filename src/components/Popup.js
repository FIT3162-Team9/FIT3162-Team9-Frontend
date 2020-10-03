import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Popup(props) {
  
  const prop = props.props
  return (
    <div>
      <Dialog
        open={prop.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={prop.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Data Unavailable"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            We currently only support the following LGAs in Victoria:
            <ul>
              <li>Mildura Shire</li>
              <li>Glenelg</li>
              <li>Greater Bendigo</li>
              <li>Ballarat North</li>
              <li>Wellington</li>
              <li>Horsham</li>
              <li>Banyule</li>
              <li>Brimbank</li>
            </ul>
            The time ranges also start at 1st January 2009, except for Horsham which starts at 1st January 2013.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={prop.handleClose} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}