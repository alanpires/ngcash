import { Router, Express } from "express";
import { UserController } from "../controllers/user.controller";
import { UserValidationMiddleware } from "../middlewares/userValidationMiddleware";

const router = Router();

export default (app: Express) => {
    router.post("/create", UserValidationMiddleware, UserController.createUser)

    app.use("/api/", router)
}