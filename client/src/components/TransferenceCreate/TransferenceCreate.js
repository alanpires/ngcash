import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
  const [open, setOpen] = React.useState(false);
  const [usernameCashIn, setUsernameCashIn] = React.useState();
  const [value, setValue] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <Button onClick={handleOpen}>NOVA TRANSFERÊNCIA</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Nova Transferência
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Digite o nome do usuário que irá receber o dinheiro e o valor.
          </Typography>
          <div>
        <TextField
          required
          id="filled-required"
          label="Username"
          variant="filled"
          onChange={(e) => setUsernameCashIn(e.target.value)}
        />
        <TextField
          required
          id="filled-number"
          label="Value"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <Button 
        sx={{ mt: 1 /* margin top */ }}
        onClick={handleSubmit}
        type="submit"
        >Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}