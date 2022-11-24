import express from 'express';
import "express-async-errors";
import "reflect-metadata";
import { handleAppErrorMiddleware } from './middlewares/handleAppErrorMiddleware';
import AppRouters from "./routes"
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

AppRouters(app);

app.use(handleAppErrorMiddleware);

export default app;