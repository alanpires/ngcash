import React, {useEffect, useState} from 'react';
import TransactionTable from '../TransactionTable/TransactionTable'

import axios from "axios";

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };
}

const reqAccounts = async (token, setAccount) => {
  return axios.get("http://localhost:9000/api/accounts", config(token))
  .then((res) => {
    setAccount(res.data)
});
}

const reqTransactions = async (token, setTransactions) => {
  return axios.get("http://localhost:9000/api/transactions", config(token))
  .then((res) => {
    setTransactions(res.data)
});
}


export default function Dashboard({userToken}) {
    const [getTransactions, setTransactions] = useState([]);
    const [getAccount, setAccount] = useState({});

    useEffect(() => {     
      reqAccounts(userToken, setAccount);
      reqTransactions(userToken, setTransactions);
    }, [userToken]);

    return(
      <div>
        <TransactionTable getTransactions={getTransactions} getAccount={getAccount} userToken={userToken}></TransactionTable>
      </div>
      
    )
}