import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";

//Teste de integração
describe("Testing the transaction routes", () => {
    let connection: DataSource;

    beforeAll(async () => {
        await AppDataSource.initialize()
        .then((res) => connection = res)
        .catch((err) => {console.error("Error during Data Source initialization", err)});
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test("Should return an error when trying to create a transaction with invalid data", async () => {
        // Create an user
        const username = "jose";
        const password = "12345678A";
        const userData = {username, password};
        await request(app).post("/api/create/").send(userData);
        
        // Login user
        const token = await (await request(app).post("/api/login/").send(userData)).body.token;
        
        // Create a transaction
        const response = await request(app).post("/api/transactions/").send({}).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                error: [
                    "usernameCashIn is a required field",
		            "value is a required field"
                ]
            })
        )
    });

    test("Must return a transaction", async () => {
        // Create an userCashIn
        const username = "silvana";
        const password = "12345678A";
        const userCashInData = {username, password};
        const userCashIn = await request(app).post("/api/create/").send(userCashInData);

        // Create an userCashOut
        const username2 = "josefina";
        const password2 = "12345678A";
        const userCashOutData = {username: username2, password: password2};
        const userCashOut = await request(app).post("/api/create/").send(userCashOutData);

        // Login userCashOut
        const token = await (await request(app).post("/api/login/").send(userCashOutData)).body.token;

        // Create a transaction
        const usernameCashIn = "silvana";
        const value = 10;

        const transactionData = {usernameCashIn, value};

        const response = await request(app).post("/api/transactions/").send(transactionData).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("value");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("debitedAccount");
        expect(response.body).toHaveProperty("creditedAccount");
        expect(response.body).toEqual(
            expect.objectContaining({
                id: response.body.id,
                value,
                createdAt: response.body.createdAt,
                debitedAccount: {
                    id: userCashOut.body.account.id,
                    user: {
                        id: userCashOut.body.id,
                        username: userCashOut.body.username
                    }
                },
                creditedAccount: {
                    id: userCashIn.body.account.id,
                    user: {
                        id: userCashIn.body.id,
                        username: userCashIn.body.username
                    }
                }
            })
        )
    });

    test("Should return an error if the user does not have enough balance", async () => {
        // Create an userCashIn
        const username = "jose";
        const password = "12345678A";
        const userCashInData = {username, password};
        await request(app).post("/api/create/").send(userCashInData);

        // Create an userCashOut
        const username2 = "maria";
        const password2 = "12345678A";
        const userCashOutData = {username: username2, password: password2};
        await request(app).post("/api/create/").send(userCashOutData);

        // Login userCashOut
        const token = await (await request(app).post("/api/login/").send(userCashOutData)).body.token;

        // Create a transaction
        const usernameCashIn = "jose";
        const value = 150;

        const transactionData = {usernameCashIn, value};

        const response = await request(app).post("/api/transactions/").send(transactionData).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
            status: "error",
            message: "You do not have enough balance"
        })
        
    });

    test("Should return an error if username cashIn is not found", async () => {
        // Create an userCashIn
        const username = "jose";
        const password = "12345678A";
        const userCashInData = {username, password};
        await request(app).post("/api/create/").send(userCashInData);

        // Create an userCashOut
        const username2 = "maria";
        const password2 = "12345678A";
        const userCashOutData = {username: username2, password: password2};
        await request(app).post("/api/create/").send(userCashOutData);

        // Login userCashOut
        const token = await (await request(app).post("/api/login/").send(userCashOutData)).body.token;

        // Create a transaction
        const usernameCashIn = "paulo";
        const value = 50;

        const transactionData = {usernameCashIn, value};

        const response = await request(app).post("/api/transactions/").send(transactionData).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
            status: "error",
            message: "User not found."
        })
        
    });

    test("Should return an error if the user tries to make a transfer to himself", async () => {
        // Create an userCashOut
        const username2 = "maria";
        const password2 = "12345678A";
        const userCashOutData = {username: username2, password: password2};
        await request(app).post("/api/create/").send(userCashOutData);

        // Login userCashOut
        const token = await (await request(app).post("/api/login/").send(userCashOutData)).body.token;

        // Create a transaction
        const usernameCashIn = "maria";
        const value = 50;

        const transactionData = {usernameCashIn, value};

        const response = await request(app).post("/api/transactions/").send(transactionData).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
            status: "error",
            message: "You cannot transfer to yourself."
        })
        
    });

    test("Should return an error when trying to filter a transaction with invalid data", async () => {
        // Create an user
        const username = "jose";
        const password = "12345678A";
        const userData = {username, password};
        await request(app).post("/api/create/").send(userData);
        
        // Login user
        const token = await (await request(app).post("/api/login/").send(userData)).body.token;
        
        // Create a transaction
        const response = await request(app).post("/api/transactions/filter/").send({}).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                error: [
                    "start_date is a required field",
		            "end_date is a required field"
                ]
            })
        )
    });

    test("Checks if the transaction is filtered by date without informing cashin or cashout", async () => {
        // Create an userCashIn
        const username = "miguel";
        const password = "12345678A";
        const userCashInData = {username, password};
        await request(app).post("/api/create/").send(userCashInData);

        // Create an userCashOut
        const username2 = "laura";
        const password2 = "12345678A";
        const userCashOutData = {username: username2, password: password2};
        await request(app).post("/api/create/").send(userCashOutData);

        // Login userCashOut
        const token = await (await request(app).post("/api/login/").send(userCashOutData)).body.token;

        // Create 5 transactions
        for (let i = 1; i <= 5; i++) {
            const usernameCashIn = "miguel";
            const value = 15 + i;
    
            const transactionData = {usernameCashIn, value};
    
            await request(app).post("/api/transactions/").send(transactionData).set("Authorization", `Bearer ${token}`);

        }
        
        //Filtered transaction
        const start_date = new Date().toISOString();
        const end_date = new Date().toISOString();

        const transactionFilterData = {start_date, end_date}

        const response = await request(app).post("/api/transactions/filter/").send(transactionFilterData).set("Authorization", `Bearer ${token}`);

        const {cashIn, cashOut} = response.body;

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("cashIn");
        expect(response.body).toHaveProperty("cashOut");
        expect(cashIn).toHaveLength(0);
        expect(cashOut).toHaveLength(5);
        
    });

    test("Checks if the transaction is filtered by date and by cashIn", async () => {
        // Create an userCashIn
        const username = "miguel";
        const password = "12345678A";
        const userCashInData = {username, password};
        await request(app).post("/api/create/").send(userCashInData);

        // Create an userCashOut
        const username2 = "laura";
        const password2 = "12345678A";
        const userCashOutData = {username: username2, password: password2};
        await request(app).post("/api/create/").send(userCashOutData);

        // Login userCashOut
        const token = await (await request(app).post("/api/login/").send(userCashInData)).body.token;

        // Create 5 transactions
        for (let i = 1; i <= 5; i++) {
            const usernameCashIn = "miguel";
            const value = 15 + i;
    
            const transactionData = {usernameCashIn, value};
    
            await request(app).post("/api/transactions/").send(transactionData).set("Authorization", `Bearer ${token}`);

        }
        
        //Filtered transaction
        const start_date = new Date().toISOString();
        const end_date = new Date().toISOString();

        const transactionFilterData = {start_date, end_date, cashIn: true}

        const response = await request(app).post("/api/transactions/filter/").send(transactionFilterData).set("Authorization", `Bearer ${token}`);

        const {cashIn} = response.body;

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("cashIn");
        expect(response.body).not.toHaveProperty("cashOut");
        expect(cashIn).toHaveLength(5);
        
    });

    test("Checks if the transaction is filtered by date and by cashOut", async () => {
        // Create an userCashIn
        const username = "miguel";
        const password = "12345678A";
        const userCashInData = {username, password};
        await request(app).post("/api/create/").send(userCashInData);

        // Create an userCashOut
        const username2 = "laura";
        const password2 = "12345678A";
        const userCashOutData = {username: username2, password: password2};
        await request(app).post("/api/create/").send(userCashOutData);

        // Login userCashOut
        const token = await (await request(app).post("/api/login/").send(userCashOutData)).body.token;

        // Create 5 transactions
        for (let i = 1; i <= 5; i++) {
            const usernameCashIn = "miguel";
            const value = 15 + i;
    
            const transactionData = {usernameCashIn, value, cashOut: true};
    
            await request(app).post("/api/transactions/").send(transactionData).set("Authorization", `Bearer ${token}`);

        }
        
        //Filtered transaction
        const start_date = new Date().toISOString();
        const end_date = new Date().toISOString();

        const transactionFilterData = {start_date, end_date}

        const response = await request(app).post("/api/transactions/filter/").send(transactionFilterData).set("Authorization", `Bearer ${token}`);

        const {cashOut} = response.body;

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("cashOut");
        expect(response.body).toHaveProperty("cashIn");
        expect(cashOut).toHaveLength(5);
        
    });



});