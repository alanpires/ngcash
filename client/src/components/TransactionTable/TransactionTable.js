import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TransferenceCreate from '../TransferenceCreate/TransferenceCreate'
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function TransactionTable({getTransactions, getAccount, userToken}) {
  const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const ccyFormat = (num) => {
    return `${num.toFixed(2)}`;
  }
        
  const createRow = (ID, created_at, destination_account,  type, value) => {
    return { ID,  created_at, destination_account, type, value};
  }

  const rows = (transactionsArray) => {
    let rows = [];
  
    for (let i = 0; i < transactionsArray.length; i++) {
      let type;
      let account;
        
      if (transactionsArray[i].hasOwnProperty('creditedAccount')) {
        type = 'cashOut'
        account = 'creditedAccount';
      } else if (transactionsArray[i].hasOwnProperty('debitedAccount')) {
        type = 'cashIn'
        account = 'debitedAccount'
      }
  
      rows.push(createRow(transactionsArray[i].id, transactionsArray[i].createdAt, transactionsArray[i][account].id, type, transactionsArray[i].value))
    }
  
    return rows
  }

  const rowsList = rows(getTransactions);

  console.log(rowsList)

  let invoiceTotal = 0;

  if (getAccount.balance) {
    invoiceTotal = getAccount.balance
  }

  return (
    <div>
      
<TableContainer component={Paper}>
      <h2>Saldo: R$ {ccyFormat(invoiceTotal)}</h2>
      <TransferenceCreate userToken={userToken}/>
      <div>
      <Stack component="form" noValidate spacing={3}>
      <TextField
        id="date"
        label="Filter"
        type="date"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Stack>
      </div>
        
      
    <Table sx={{ minWidth: 700 }} aria-label="spanning table">
    <TableHead>
      <TableRow>
        <TableCell align="center" colSpan={5}>
          Transações
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>ID Transaction</TableCell>
        <TableCell align="right">Created at</TableCell>
        <TableCell align="right">ID Destination Account</TableCell>
        <TableCell align="right">Type</TableCell>
        <TableCell align="right">Value</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rowsList.map((row) => (
        <TableRow key={row.ID}>
          <TableCell>{row.ID}</TableCell>
          <TableCell align="right">{row.created_at}</TableCell>
          <TableCell align="right">{row.destination_account}</TableCell>
          <TableCell align="right">{row.type}</TableCell>
          <TableCell align="right">{row.value}</TableCell>
        </TableRow>
      ))}
      <TableRow>
        <TableCell colSpan={4}>Saldo atual</TableCell>
        <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
  </TableContainer>
    </div>
    
  );
}