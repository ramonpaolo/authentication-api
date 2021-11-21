//---- Packages
import express from "express"
import cors from "cors"
import dotenv from "dotenv"

//---- Routes
import authentication from "./routes/authentication"

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use("/user", authentication)

app.listen(process.env.PORT || 3000, () => console.log("API Rest rodando na porta: ", process.env.PORT || 3000))