//---- Packages
import express from "express"

//---- Controllers
import userController from "../controllers/userController"

const app = express()

app.post("/register", userController.register)

app.post("/login", userController.login)

app.get("/verifyAccount", userController.verifyAccount)


export default app