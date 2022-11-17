import express from 'express';
import "express-async-errors";
import "reflect-metadata";
import { handleAppErrorMiddleware } from './middlewares/handleAppErrorMiddleware';
import AppRouters from "./routes"
import { registerSchema } from 'class-validator';

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return res.json("Hello World!")
})

AppRouters(app);

app.use(handleAppErrorMiddleware);

export default app;