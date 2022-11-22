import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ModalDialog from '../ModalDialog/ModalDialog';

async function newTransference(data, token) {
    return fetch('http://localhost:9000/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(data => data.json())
    .catch((err) => console.error(err))
}

export default function BasicModal({userToken}) {
  const [usernameCashIn, setUsernameCashIn] = React.useState();
  const [value, setValue] = React.useState();
  const [open, setOpen] = React.useState(false);

  // function to handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    console.log('criou nova transação')
    e.preventDefault();
    await newTransference({
        usernameCashIn,
        value
    }, userToken);
}

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        NOVA TRANSFERÊNCIA
      </Button>
      <ModalDialog open={open} handleClose={handleClose} userToken={userToken}/>
    </div>
  );
}