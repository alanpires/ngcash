import { findAccountService } from "../../../services/account.service";
import { createUserService } from "../../../services/user.service";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";

//Teste unitário
describe("Find an account", () => {
    let connection: DataSource;

    beforeEach(async () => {
        await AppDataSource.initialize()
        .then((res) => connection = res)
        .catch((err) => {console.error("Error during Data Source initialization", err)})
    });

    afterEach(async () => {
        await connection.destroy();
    });

    test("Search for an account in the database", async () => {
        // Create an user
        const userData = {
            username: "jose", 
            password: "1234"};

        await createUserService(userData);

        //
    })
})