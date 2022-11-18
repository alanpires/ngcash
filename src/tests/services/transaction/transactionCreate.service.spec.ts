import { Transaction } from './../../../entities/transaction.entity';
import { AppError } from './../../../errors/appError';
import { createUserService } from '../../../services/user/user.service';
import { createTransactionService } from '../../../services/transaction/transaction.service';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../../data-source';


describe("Create a transaction", () => {
    let connection: DataSource;

    beforeEach(async () => {
        await AppDataSource.initialize()
        .then((res) => connection = res)
        .catch((err) => {console.error("Error during Data Source initialization", err)})
    });

    afterEach(async () => {
        await connection.destroy();
    });

    test("Checks if an exception is raised when the username that will receive the money is invalid", async () => {
        //Create an user
        const username = "joao";
        const password = "1234";

        const userCashOutData = {username, password};
        const userCashOut = await createUserService(userCashOutData);

        // The user jose does not exist
        const usernameCashIn = "jose"
        const value=50

        await expect(createTransactionService(userCashOut.account.id, userCashOut.username, usernameCashIn, value)).rejects.toBeInstanceOf(AppError);
        await expect(createTransactionService(userCashOut.account.id, userCashOut.username, usernameCashIn, value)).rejects.toThrow(/^User not found.$/);
    });

    test("Checks if an exception is thrown when the user does not have enough balance", async () => {
        //Create an user, the initial balance is 100
        const username = "joao";
        const password = "1234";

        const userCashOutData = {username, password};
        const userCashOut = await createUserService(userCashOutData);

        //Create another user
        const username2 = "jose";
        const password2 = "1234";

        const userCashInData = {username: username2, password: password2};
        const userCashIn = await createUserService(userCashInData);

        //Data of the user who will receive the money
        const value=150

        await expect(createTransactionService(userCashOut.account.id, userCashOut.username, userCashIn.username, value)).rejects.toBeInstanceOf(AppError);
        await expect(createTransactionService(userCashOut.account.id, userCashOut.username, userCashIn.username, value)).rejects.toThrow(/^You do not have enough balance$/);
    });

    test("Checks if an exception is thrown when the user tries to perform a transfer to himself", async () => {
        //Create an user
        const username = "joao";
        const password = "1234";

        const userCashOutData = {username, password};
        const userCashOut = await createUserService(userCashOutData);

        const value=50

        await expect(createTransactionService(userCashOut.account.id, userCashOut.username, userCashOut.username, value)).rejects.toBeInstanceOf(AppError);
        await expect(createTransactionService(userCashOut.account.id, userCashOut.username, userCashOut.username, value)).rejects.toThrow(/^You cannot transfer to yourself.$/);
    });

    test("Checks if a transaction was successful", async () => {
        //Create an user
        const username = "joao";
        const password = "1234";

        const userCashOutData = {username, password};
        const userCashOut = await createUserService(userCashOutData);

        //Create another user
        const username2 = "jose";
        const password2 = "1234";

        const userCashInData = {username: username2, password: password2};
        const userCashIn = await createUserService(userCashInData);

        const value=50

        const transaction = await createTransactionService(userCashOut.account.id, userCashOut.username, userCashIn.username, value) as Transaction;
        
        expect(transaction).toBeInstanceOf(Transaction);
        expect(transaction).toEqual(
            expect.objectContaining({
                id: transaction.id,
                value: 50,
                createdAt: transaction.createdAt,
                debitedAccount: {
                    id: userCashOut.account.id,
                    user: {
                        id: userCashOut.id,
                        username: userCashOut.username
                    }
                },
                creditedAccount: {
                    id: userCashIn.account.id,
                    user: {
                        id: userCashIn.id,
                        username: userCashIn.username
                    }
                }
            })
        )

    })
})