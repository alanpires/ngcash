import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function TransactionTable({
  getTransactions, ccyFormat, invoiceTotal,
}) {

  const createRow = (ID, createdAt, destinationAccount, type, value) => {
    const date = new Date(createdAt).toLocaleDateString()
    return ({ID, createdAt: date, destinationAccount, type, value})
  }

  const rows = (transactionsArray) => {
    const rowsList = [];

    for (let i = 0; i < transactionsArray.length; i += 1) {
      let type;
      let account;

      if (Object.prototype.hasOwnProperty.call(transactionsArray[i], 'creditedAccount')) {
        type = 'cashOut';
        account = 'creditedAccount';
      } else if (Object.prototype.hasOwnProperty.call(transactionsArray[i], 'debitedAccount')) {
        type = 'cashIn';
        account = 'debitedAccount';
      }

      rowsList.push(
        createRow(
          transactionsArray[i].id,
          transactionsArray[i].createdAt,
          transactionsArray[i][account].id,
          type,
          transactionsArray[i].value,
        ),
      );
    }

    return rowsList;
  };



  const rowsList = rows(getTransactions);


  return (
    <div>
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
              <TableCell align="right">{row.createdAt}</TableCell>
              <TableCell align="right">{row.destinationAccount}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              {row.type === 'cashIn' ? (<TableCell align="right" style={{ color: "green" }}>{row.value}</TableCell>) : (<TableCell align="right" style={{ color: "red" }}>{row.value}</TableCell>)}
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4} style={{ fontWeight: "bold" }}>Saldo atual</TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

  );
}
