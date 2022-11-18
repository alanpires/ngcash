import { Router, Express } from "express";
import { SessionController } from '../controllers/session.controller';

const router = Router();

export default (app: Express) => {
    router.post("/login", SessionController.login)

    app.use("/api/", router)
}