import { userSchema } from './../schemas/user.schema';
import { Router, Express } from "express";
import { UserController } from "../controllers/user.controller";
import { UserValidationMiddleware } from "../middlewares/userValidationMiddleware";

const router = Router();

export default (app: Express) => {
    router.post("/create", UserValidationMiddleware(userSchema), UserController.createUser)
    router.post("/login", UserController.login)

    app.use("/api/", router)
}