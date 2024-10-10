import "reflect-metadata"
import app from "./app"
import { AppDataSource } from "./db"

const port = 4000;

async function main() {
    try {
        await AppDataSource.initialize()
        console.log("Database connected")
        app.listen(port)
        console.log("Server is listening on port", port)

    } catch (error) {
        console.error(error)
    }
}

main()