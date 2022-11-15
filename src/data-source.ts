import { DataSource } from "typeorm";

require('dotenv').config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    synchronize: false,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"] 
});

AppDataSource.initialize().then(() => {
    console.log("Data Source initialized");
}).catch((err) => {
    console.error("Error during Data Source initialization", err);
})