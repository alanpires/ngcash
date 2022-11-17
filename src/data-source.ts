import { DataSource } from "typeorm";

require('dotenv').config();

export const AppDataSource = 
    process.env.NODE_ENV === "test"
    ? new DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: ["src/entities/**/*.ts"],
        synchronize: true
    })
    : new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    synchronize: false,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migrations/**/*.ts"] 
});