import { AppError } from './../../../errors/appError';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import { createUserService } from '../../../services/user/user.service';
import * as bcrypt from "bcryptjs";

jest.mock("uuid", () => {
    return {
        v4: jest.fn(() => "mockUUID")
    }
})

//Teste unitário
describe("Create an user", () => {
    let connection: DataSource;

    beforeEach(async () => {
        await AppDataSource.initialize()
        .then((res) => connection = res)
        .catch((err) => {console.error("Error during Data Source initialization", err)});
    });

    afterEach(async () => {
        await connection.destroy();
    });

    test("Should insert the information of the new user in the database", async () => {
        const username = "jose";
        const password = "1234";

        const userData = {username, password};

        const newUser = await createUserService(userData);

        expect(newUser).toEqual(
            expect.objectContaining({
                id: "mockUUID",
                username,
                account: {
                    balance: 100,
                    id: "mockUUID"
                }
            })
        )
    });

    test("Checks if an exception is thrown when a user already exists in the database", async () => {
        // Create an user
        const username = "jose";
        const password = "1234";
        const userData = {username, password};
        await createUserService(userData)

        // Testando se eu chamar a função novamente com os mesmos dados, obtenho um erro
        await expect(createUserService(userData)).rejects.toBeInstanceOf(AppError);
        await expect(createUserService(userData)).rejects.toThrow(/^User already exists$/);
    });

    test("Checks if the password has been hashed", async () => {
        // Create an user
        const username = "jose";
        const password = "1234";
        const userData = {username, password};
        const user = await createUserService(userData);

        expect(true).toBe(bcrypt.compareSync(password, user.password));
    });

});