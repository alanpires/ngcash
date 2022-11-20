import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";

//Teste de integração
describe("Testing the middleware authentication with the account routes", () => {
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

        await request(app).post("/api/create/").send(userData);

        // Login user
        await (await request(app).post("/api/login/").send(userData)).body.token;

        // List accounts
        const response = await request(app).get("/api/accounts/").set("Authorization", `Bearer ${"token"}`);

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

        await request(app).post("/api/create/").send(userData);

        // Login user
        await (await request(app).post("/api/login/").send(userData)).body.token;

        // List accounts
        const response = await request(app).get("/api/accounts/").set("Authorization", `Bearer`);

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

        await request(app).post("/api/create/").send(userData);

        // Login user
        await (await request(app).post("/api/login/").send(userData)).body.token;

        // List accounts
        const response = await request(app).get("/api/accounts/");

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
            detail: "Authentication credentials were not provided"
        })
    });





});