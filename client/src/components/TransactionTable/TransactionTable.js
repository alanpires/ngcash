import React, {useEffect, useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import FilterDate from '../FilterDate/FilterDate'
import Select from '../Select/Select'
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  saldo: {
    marginLeft: '1%',
  },
  filter: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '37em'
  }
}));



const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };
}

const filterTransactions = async (token, data, setFilterTransactions) => {
  return axios.post("http://localhost:9000/api/transactions/filter", data, config(token))
  .then((res) => {
    setFilterTransactions(res.data)
});
}

const allTransactions = async (token, data, setAllTransactions) => {
  return axios.get("http://localhost:9000/api/transactions", data, config(token))
  .then((res) => {
    setAllTransactions(res.data)
});
}

export default function TransactionTable({getTransactions, getAccount, userToken}) {
  const [filterDate, setFilterDate] = useState("")
  const [select, setSelect] = useState("")
  const [filterTransactions, setFilterTransactions] = useState({})
  const [allTransactions, setAllTransactions] = useState({})

  useEffect(() => {
    filterTransactions(userToken, {filterDate, select, setFilterTransactions})
    allTransactions(userToken, filterDate, setAllTransactions)
  }, [filterTransactions, userToken, filterDate, select, allTransactions])

  const classes = useStyles();

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

  let invoiceTotal = 0;

  if (getAccount.balance) {
    invoiceTotal = getAccount.balance
  }


  return (
    <div>
    <TableContainer component={Paper}>
    <h3 className={classes.saldo}>Saldo: R$ {ccyFormat(invoiceTotal)}</h3>
    <div className={classes.filter}>
      <FilterDate setFilterDate={setFilterDate}/>
      <Select setSelect={setSelect}/>
      <Button
        variant="contained"
        color="primary"
        value="Register"
        type="submit"
        onClick={() => console.log('clicked')}
        >
        Filtrar
      </Button>
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