import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";

jest.mock("uuid", () => {
    return {
        v4: jest.fn(() => "mockUUID")
    }
})

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
        const password = "12345678A";

        const userData = {username, password};

        const response = await request(app).post("/api/create/").send(userData)

        expect(response.status).toBe(201);
        expect(response.body).not.toHaveProperty("password");
        expect(response.body).toEqual(
            expect.objectContaining({
                id: "mockUUID",
                username,
                account: {
                    id: "mockUUID",
                    balance: 100
                }
            })
        );
    });

    test("It should fail to create the user without any information in the request body", async () => {
        const response = await request(app).post("/api/create/").send({})

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
            error: [
                "username is a required field",
		        "password is a required field"
            ]
        })
    });

    test("Must fail to create user enter a username with less than three characters", async () => {
        const username = "jo";
        const password = "12345678A";

        const userData = {username, password};
        
        const response = await request(app).post("/api/create/").send(userData);

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
            error: [
                "username must contain at least three characters"
            ]
        })
    });

    test("Must fail when creating user enter a password with less than eight characters and without a capital letter", async () => {
        const username = "jose";
        const password = "1234";

        const userData = {username, password};
        
        const response = await request(app).post("/api/create/").send(userData);

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
            error: [
                "password must contain at least eight characters",
                "password must contain at least one uppercase letter"
            ]
        })
    });

    test("Should fail when creating user enter a password with less than eight characters, without a capital letter and without a number", async () => {
        const username = "jose";
        const password = "abcd";

        const userData = {username, password};
        
        const response = await request(app).post("/api/create/").send(userData);

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
            error: [
                "password must contain at least eight characters",
                "password must contain at least one number",
                "password must contain at least one uppercase letter",
            ]
        })
    });

    test("Should fail when trying to create an already existing user", async () => {
        const username = "jose";
        const password = "abcdefgH1";

        const userData = {username, password};
        
        await request(app).post("/api/create/").send(userData);

        const response = await request(app).post("/api/create/").send(userData);

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
                status: "error",
                message: "User already exists"
        })
    });

});