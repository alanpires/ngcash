import { DataSource } from "typeorm";

require('dotenv').config();

const {
    POSTGRES_USER,
    POSTGRES_DB,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    POSTGRES_HOST
} = process.env;

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
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    username: POSTGRES_USER,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    synchronize: false,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migrations/**/*.ts"] 
});