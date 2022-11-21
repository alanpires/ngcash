import React, {useEffect, useState} from 'react';
import TransactionTable from '../TransactionTable/TransactionTable'

import axios from "axios";

export default function Dashboard({userToken}) {
    const [getTransactions, setTransactions] = useState([]);
    // const [account, setAccount] = useState([]);

    useEffect(() => {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      axios
        .get("http://localhost:9000/api/transactions", config)
        .then((res) => {
					setTransactions(res.data);
      });

     

      // axios
      // .get("http://localhost:9000/api/accounts", config)
      // .then((res) => {
      //   setAccount(res.data)
      // })
    }, [userToken]);

    return(
      <TransactionTable getTransactions={getTransactions}></TransactionTable>
    )
}