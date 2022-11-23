import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TransactionTable({
  getTransactions, ccyFormat, invoiceTotal,
}) {
  console.log(getTransactions);

  const createRow = (ID, createdAt, destinationAccount, type, value) => ({
    ID, createdAt, destinationAccount, type, value,
  });

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
      <TableContainer component={Paper}>
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
