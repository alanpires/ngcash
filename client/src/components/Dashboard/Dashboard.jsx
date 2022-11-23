import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TransactionTable from '../TransactionTable/TransactionTable';
import DatePicker from '../DatePicker/DatePicker';
import Select from '../Select/Select';
import TransactionFilterTable from '../TransactionFilterTable/TransactionFilterTable';

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

async function reqTransactionsFilter(token, data) {
  return fetch('http://localhost:9000/api/transactions/filter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json());
}

const useStyles = makeStyles(() => ({
  saldo: {
    marginLeft: '1%',
  },
  filter: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function Dashboard({ userToken }) {
  const [getTransactions, setTransactions] = useState([]);
  const [getAccount, setAccount] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [select, setSelect] = useState('');
  const [transactionsFilter, setTransactionsFilter] = useState({});
  const [data, setData] = useState({});
  const [click, setClick] = useState(true);

  const classes = useStyles();

  let filteredData;

  if (select === 'cashIn') {
    filteredData = {
      start_date: startDate, end_date: endDate, cashIn: true, cashOut: undefined,
    };
  } else if (select === 'cashOut') {
    filteredData = {
      start_date: startDate, end_date: endDate, cashIn: undefined, cashOut: true,
    };
  } else if (select === 'both' || select === '') {
    filteredData = {
      start_date: startDate, end_date: endDate, cashIn: true, cashOut: true,
    };
  }

  useEffect(() => {
    reqAccounts(userToken, setAccount);
    reqTransactions(userToken, setTransactions);
    reqTransactionsFilter(userToken, filteredData);
  }, [userToken]);

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await reqTransactionsFilter(userToken, filteredData);
    setData(res);
    setClick(false);
    setTransactionsFilter(res);
  };

  const ccyFormat = (num) => `${num.toFixed(2)}`;

  let invoiceTotal = 0;

  if (getAccount.balance) {
    invoiceTotal = getAccount.balance;
  }

  const startDateLabel = 'Start Date';
  const endDateLabel = 'End Date';

  return (
    <div>
      <TableContainer component={Paper}>
        <h3 className={classes.saldo}>
          Saldo: R$
          {' '}
          {ccyFormat(invoiceTotal)}
        </h3>
        <div className={classes.filter}>
          <DatePicker setDate={setStartDate} label={startDateLabel} />
          <DatePicker setDate={setEndDate} label={endDateLabel} />
          <Select setSelect={setSelect} select={select} />
          <Button
            variant="contained"
            color="primary"
            value="Register"
            type="submit"
            onClick={handleClick}
          >
            Filtrar
          </Button>
          <Button
            variant="contained"
            color="grey"
            value="Register"
            type="submit"
            onClick={() => setClick(true)}
          >
            Limpar filtro
          </Button>

        </div>
        {click
          ? (
            <TransactionTable
              getTransactions={getTransactions}
              ccyFormat={ccyFormat}
              invoiceTotal={invoiceTotal}
            />
          )
          : (
            <TransactionFilterTable
              userToken={userToken}
              ccyFormat={ccyFormat}
              invoiceTotal={invoiceTotal}
              data={data}
              transactionsFilter={transactionsFilter}
            />
          )}
      </TableContainer>
    </div>
  );
}
