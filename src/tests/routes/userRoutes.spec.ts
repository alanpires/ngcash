import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";

//Teste de integração
describe("Testing the user routes", () => {
    let connection: DataSource;

    beforeAll(async () => {
        await AppDataSource.initialize()
        .then((res) => connection = res)
        .catch((err) => {console.error("Error during Data Source initialization", err)});
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test("Should be able to create a new user", async () => {
        const username = "jose";
        const password = "1234";

        const userData = {username, password};

        const response = await request(app).post("/api/accounts").send(userData);

        // expect(response.status).toBe(201);
        // expect(response.body).toEqual(
        //     expect.objectContaining({
        //         id: 1,
        //         username
        //     })
        // )
    })
});