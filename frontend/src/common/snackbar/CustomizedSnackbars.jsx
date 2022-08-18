import React from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import { setSnackBarOpen, setSnackbarMessage, setSnackBarSeverity } from './snackbarSlice'
import { useDispatch, useSelector } from 'react-redux';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbars = () => {
  // open = true, false
  const dispatch = useDispatch()
  const { open, snackbarMessage, snackbarSeverity } = useSelector(state => state.snackbar)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setSnackBarOpen(false));
    dispatch(setSnackbarMessage(''));
    dispatch(setSnackBarSeverity('info'))
  };

  return (<>
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
    {/* <Alert severity="error">This is an error message!</Alert>
    <Alert severity="warning">This is a warning message!</Alert>
    <Alert severity="info">This is an information message!</Alert>
    <Alert severity="success">This is a success message!</Alert> */}
  </>
  );
}

export default CustomizedSnackbars 