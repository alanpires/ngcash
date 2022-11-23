import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
// import Paper from '@mui/material/Paper';
import TransactionTable from '../TransactionTable/TransactionTable';
import DatePicker from '../DatePicker/DatePicker';
import Select from '../Select/Select';

const config = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const reqAccounts = async (token, setAccount) => axios
  .get('http://localhost:9000/api/accounts', config(token))
  .then((res) => {
    setAccount(res.data);
  });

const reqTransactions = async (token, setTransactions) => axios
  .get('http://localhost:9000/api/transactions', config(token))
  .then((res) => {
    setTransactions(res.data);
  });

// const reqTransactionsFilter = async (token, data, setFilterTransactions) => axios
//     .post('http://localhost:9000/api/transactions/filter', data, config(token))
//     .then((res) => {
//       setFilterTransactions(res.data);
//     });

const useStyles = makeStyles(() => ({
  saldo: {
    marginLeft: '1%',
  },
  filter: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '37em',
  },
}));

export default function Dashboard({ userToken }) {
  const [getTransactions, setTransactions] = useState([]);
  const [getAccount, setAccount] = useState({});
  // const [filterTransactions, setFilterTransactions] = useState({});
  const [filterDate, setFilterDate] = useState('');
  const [select, setSelect] = useState('');

  const classes = useStyles();

  useEffect(() => {
    reqAccounts(userToken, setAccount);
    reqTransactions(userToken, setTransactions);
    // reqTransactionsFilter(userToken, setFilterTransactions)
  }, [userToken, getTransactions, getAccount, filterDate]);

  const ccyFormat = (num) => `${num.toFixed(2)}`;

  console.log(filterDate);
  console.log(select);
  // console.log(filterTransactions);

  let invoiceTotal = 0;

  if (getAccount.balance) {
    invoiceTotal = getAccount.balance;
  }

  return (
    <div>
      <TableContainer>
        <h3 className={classes.saldo}>
          Saldo: R$
          {' '}
          {ccyFormat(invoiceTotal)}
        </h3>
        <div className={classes.filter}>
          <DatePicker setFilterDate={setFilterDate} />
          <Select setSelect={setSelect} />
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
      </TableContainer>
      <TransactionTable
        getTransactions={getTransactions}
        getAccount={getAccount}
        userToken={userToken}
        ccyFormat={ccyFormat}
        invoiceTotal={invoiceTotal}
      />
    </div>
  );
}
