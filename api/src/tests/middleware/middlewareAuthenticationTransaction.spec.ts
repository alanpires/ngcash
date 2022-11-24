import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";

//Teste de integração
describe("Testing the middleware authentication with the transaction routes", () => {
    let connection: DataSource;

    beforeAll(async () => {
        await AppDataSource.initialize()
        .then((res) => connection = res)
        .catch((err) => {console.error("Error during Data Source initialization", err)});
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test("Must fail if user does not enter a valid token", async () => {
        // Create an user
        const username = "jose";
        const password = "12345678A";

        const userData = {username, password};

        await request(app).post("/create/").send(userData);

        // Login user
        await (await request(app).post("/login/").send(userData)).body.token;

        const usernameCashIn = "maria";
        const value = 10;

        const transactionData = {usernameCashIn, value}

        // Create a new transaction
        const response = await request(app).post("/transactions/").send(transactionData).set("Authorization", `Bearer ${"token"}`);

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
            detail: "Invalid token"
        })
    });

    test("Must fail if user does not provide any tokens", async () => {
        // Create an user
        const username = "jose";
        const password = "12345678A";

        const userData = {username, password};

        await request(app).post("/create/").send(userData);

        // Login user
        await (await request(app).post("/login/").send(userData)).body.token;

        const usernameCashIn = "maria";
        const value = 10;

        const transactionData = {usernameCashIn, value};

        // Create a new transaction
        const response = await request(app).post("/transactions/").send(transactionData).set("Authorization", `Bearer`);

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
            detail: "Token cannot be blank"
        })
    });

    test("It should fail if the user doesn't enable the authentication field", async () => {
        // Create an user
        const username = "jose";
        const password = "12345678A";

        const userData = {username, password};

        await request(app).post("/create/").send(userData);

        // Login user
        await (await request(app).post("/login/").send(userData)).body.token;

        const usernameCashIn = "maria";
        const value = 10;

        const transactionData = {usernameCashIn, value}

        // Create a new transaction
        const response = await request(app).post("/transactions/").send(transactionData);

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
            detail: "Authentication credentials were not provided"
        })
    });

    test("Must fail if user does not enter a valid token", async () => {
        // Create an user
        const username = "jose";
        const password = "12345678A";

        const userData = {username, password};

        await request(app).post("/create/").send(userData);

        // Login user
        await (await request(app).post("/login/").send(userData)).body.token;

        const start_date = "2022-11-16";
        const end_date = "2022-11-18";

        const transactionFilterData = {start_date, end_date};

        // Filter transactions
        const response = await request(app).post("/transactions/filter/").send(transactionFilterData).set("Authorization", `Bearer ${"token"}`);

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
            detail: "Invalid token"
        })
    });

    test("Must fail if user does not provide any tokens", async () => {
        // Create an user
        const username = "jose";
        const password = "12345678A";

        const userData = {username, password};

        await request(app).post("/create/").send(userData);

        // Login user
        await (await request(app).post("/login/").send(userData)).body.token;

        const start_date = "2022-11-16";
        const end_date = "2022-11-18";

        const transactionFilterData = {start_date, end_date};

        // Filter transactions
        const response = await request(app).post("/transactions/filter/").send(transactionFilterData).set("Authorization", `Bearer`);

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
            detail: "Token cannot be blank"
        })
    });

    test("It should fail if the user doesn't enable the authentication field", async () => {
        // Create an user
        const username = "jose";
        const password = "12345678A";

        const userData = {username, password};

        await request(app).post("/create/").send(userData);

        // Login user
        await (await request(app).post("/login/").send(userData)).body.token;

        const start_date = "2022-11-16";
        const end_date = "2022-11-18";

        const transactionFilterData = {start_date, end_date};

        // Filter transactions
        const response = await request(app).post("/transactions/filter/").send(transactionFilterData);

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
            detail: "Authentication credentials were not provided"
        })
    });

});