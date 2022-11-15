import express from 'express';
import "reflect-metadata";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return res.json("Hello World!")
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App rodando na porta ${PORT}`);
})