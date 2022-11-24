import { Transaction } from './../../../entities/transaction.entity';
import {
  createTransactionService,
  filterTransactionService,
} from '../../../services/transaction/transaction.service';
import { createUserService } from '../../../services/user/user.service';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../../data-source';

describe('Filter a transaction', () => {
  let connection: DataSource;

  beforeEach(async () => {
    await AppDataSource.initialize()
      .then(res => (connection = res))
      .catch(err => {
        console.error('Error during Data Source initialization', err);
      });
  });

  afterEach(async () => {
    await connection.destroy();
  });

  test('Checks if the transaction is filtered by date without informing cashin or cashout', async () => {
    // Create an userCashOut
    const username = 'jose';
    const password = '1234';

    const userCashOutData = { username, password };
    const userCashOut = await createUserService(userCashOutData);

    // Create another userCashIn
    const username2 = 'carla';
    const password2 = '1234';

    const userCashInData = { username: username2, password: password2 };
    const userCashIn = await createUserService(userCashInData);

    // Create 5 transactions from userCashOut to userCashIn
    for (let i = 1; i <= 5; i++) {
      const value = 10 + i;

      (await createTransactionService(
        userCashOut.account.id,
        userCashOut.username,
        userCashIn.username,
        value,
      )) as Transaction;
    }

    const start_date = new Date().toISOString();
    const end_date = new Date().toISOString();

    // Filter transactions by date and whitout cashIn and cashOut parameter
    const filteredTransactions: any = await filterTransactionService(
      userCashIn.account.id,
      start_date,
      end_date,
    );

    expect(filteredTransactions).toHaveProperty('cashIn');
    expect(filteredTransactions).toHaveProperty('cashOut');
    expect(filteredTransactions.cashIn).toHaveLength(5);
    expect(filteredTransactions.cashOut).toHaveLength(0);
  });

  test('Checks if the transaction is filtered by date and by cashIn', async () => {
    // Create an userCashOut
    const username = 'jose';
    const password = '1234';

    const userCashOutData = { username, password };
    const userCashOut = await createUserService(userCashOutData);

    // Create another userCashIn
    const username2 = 'carla';
    const password2 = '1234';

    const userCashInData = { username: username2, password: password2 };
    const userCashIn = await createUserService(userCashInData);

    // Create 5 transactions from userCashOut to userCashIn
    for (let i = 1; i <= 5; i++) {
      const value = 10 + i;

      (await createTransactionService(
        userCashOut.account.id,
        userCashOut.username,
        userCashIn.username,
        value,
      )) as Transaction;
    }

    const start_date = new Date().toISOString();
    const end_date = new Date().toISOString();

    // Filter transactions by date with cashIn parameter and without cashOut parameter
    const filteredTransactions: any = await filterTransactionService(
      userCashIn.account.id,
      start_date,
      end_date,
      true,
    );
    const { cashIn } = filteredTransactions;

    expect(filteredTransactions).toHaveProperty('cashIn');
    expect(filteredTransactions).not.toHaveProperty('cashOut');
    expect(cashIn).toHaveLength(5);
  });

  test('Checks if the transaction is filtered by date and by cashOut', async () => {
    // Create an userCashOut
    const username = 'jose';
    const password = '1234';

    const userCashOutData = { username, password };
    const userCashOut = await createUserService(userCashOutData);

    // Create another userCashIn
    const username2 = 'carla';
    const password2 = '1234';

    const userCashInData = { username: username2, password: password2 };
    const userCashIn = await createUserService(userCashInData);

    // Create 5 transactions from userCashOut to userCashIn
    for (let i = 1; i <= 5; i++) {
      const value = 10 + i;

      (await createTransactionService(
        userCashOut.account.id,
        userCashOut.username,
        userCashIn.username,
        value,
      )) as Transaction;
    }

    const start_date = new Date().toISOString();
    const end_date = new Date().toISOString();

    // Filter transactions by date with cashOut parameter and without cashIn parameter
    // CashOut from userCashOut
    const filteredTransactions: any = await filterTransactionService(
      userCashOut.account.id,
      start_date,
      end_date,
      undefined,
      true,
    );
    const { cashOut } = filteredTransactions;

    expect(filteredTransactions).toHaveProperty('cashOut');
    expect(filteredTransactions).not.toHaveProperty('cashIn');
    expect(cashOut).toHaveLength(5);
  });

  test('Checks if the transaction is filtered by date, by cashOut and by cashIn', async () => {
    // Create an userCashOut
    const username = 'jose';
    const password = '1234';

    const userCashOutData = { username, password };
    const userCashOut = await createUserService(userCashOutData);

    // Create another userCashIn
    const username2 = 'carla';
    const password2 = '1234';

    const userCashInData = { username: username2, password: password2 };
    const userCashIn = await createUserService(userCashInData);

    // Create 5 transactions from userCashOut to userCashIn
    for (let i = 1; i <= 5; i++) {
      const value = 10 + i;

      (await createTransactionService(
        userCashOut.account.id,
        userCashOut.username,
        userCashIn.username,
        value,
      )) as Transaction;
    }

    const start_date = new Date().toISOString();
    const end_date = new Date().toISOString();

    // Filter transactions by date with cashOut parameter and without cashIn parameter
    // CashOut from userCashOut
    const filteredTransactions: any = await filterTransactionService(
      userCashOut.account.id,
      start_date,
      end_date,
      true,
      true,
    );

    expect(filteredTransactions).toHaveProperty('cashIn');
    expect(filteredTransactions).toHaveProperty('cashOut');
    expect(filteredTransactions.cashIn).toHaveLength(0);
    expect(filteredTransactions.cashOut).toHaveLength(5);
  });
});
