import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Sidebar from './Sidebar';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer'
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: 680,
    overflow: 'scroll'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  }
}));

function TransitionsModal() {
  const classes = useStyles();
  const [ { mobileMenu }, dispatch] = useStateValue()

  const handleClose = () => {
    dispatch({
      type: actionTypes.SET_MENU,
      mobileMenu: false
    })
  };


  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={mobileMenu}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={mobileMenu}>
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <div className={classes.paper}>
                <div className={classes.header}>
                  <div>
                    <strong>WhatsApp</strong>
                  </div>
                  <div>
                    <IconButton onClick={handleClose}>
                      <CancelPresentationIcon style={{ color: 'black'}} fontSize="large" />
                    </IconButton>
                  </div>
                </div>
                <Sidebar modalView />
              </div>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
}

export default TransitionsModal;