import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import FormTransference from '../FormTransference/FormTransference';

const ModalDialog = ({ open, handleClose, token }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <FormTransference handleClose={handleClose} token={token} />
    </Dialog>
  );
};

export default ModalDialog;