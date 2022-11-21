import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function SpanningTable({getTransactions}) {
    
  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }
      
  function createRow(ID, type, created_at, destination_account, value) {
    return { ID, type, created_at, destination_account, value};
  }

  function total(items) {
    return items.map(({ value }) => value).reduce((sum, i) => sum + i, 0);
  }

  const rows = (transactionsArray) => {
    let rows = [];

    for (let i = 0; i < transactionsArray.length; i++) {
      console.log(transactionsArray[i])
      let type;
      let account;
      
      if (transactionsArray[i].hasOwnProperty('creditedAccount')) {
        type = 'cashOut'
        account = 'creditedAccount';
      } else if (transactionsArray[i].hasOwnProperty('debitedAccount')) {
        type = 'cashIn'
        account = 'debitedAccount'
      }

      rows.push(createRow(transactionsArray[i].id, type, transactionsArray[i].createdAt, transactionsArray[i][account].id, transactionsArray[i].value))
    }

    return rows;
  }

  const rowsList = rows(getTransactions);

  // const rows = [
  //   createRow('10', "type, transactionsArray[i].createdAt", "transactionsArray[i][account].id", "transactionsArray[i].value", 10),
  //   createRow('20', "type, transactionsArray[i].createdAt", "transactionsArray[i][account].id", "transactionsArray[i].value", 20),
  //   createRow('30', "type, transactionsArray[i].createdAt", "transactionsArray[i][account].id", "transactionsArray[i].value", 30),
  //   createRow('40', "type, transactionsArray[i].createdAt", "transactionsArray[i][account].id", "transactionsArray[i].value", 40),
  // ]
      
  const invoiceTotal = total(rowsList);

  return (
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
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Created at</TableCell>
            <TableCell align="right">ID Destination Account</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsList.map((row) => (
            <TableRow key={row.ID}>
              <TableCell>{row.ID}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.created_at}</TableCell>
              <TableCell align="right">{row.destination_account}</TableCell>
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
  );
}
