import express from 'express';
import "express-async-errors";
import "reflect-metadata";
import { handleAppErrorMiddleware } from './middlewares/handleAppErrorMiddleware';
import AppRouters from "./routes"

const app = express();

app.use(express.json());

AppRouters(app);

app.use(handleAppErrorMiddleware);

export default app;