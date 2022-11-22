import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import FormTransference from '../FormTransference/FormTransference';

const ModalDialog = ({ open, handleClose, userToken }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <FormTransference handleClose={handleClose} userToken={userToken} />
    </Dialog>
  );
};

export default ModalDialog;