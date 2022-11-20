import { Router, Express } from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger_output.json';

const router = Router();

export default (app: Express) => {
    router.use('/docs', swaggerUi.serve);
    router.get('/docs', swaggerUi.setup(swaggerDocument));
    
    app.use("/api/", router)
}