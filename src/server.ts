import app from "./app";
import { AppDataSource } from "./data-source";

const PORT = 3000;

(async () => {
    await AppDataSource.initialize().then(() => {
        console.log("Data Source initialized");
    }).catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

    app.listen(PORT, () => {
        console.log(`Running at http://localhost:${PORT}`);
    });
})();