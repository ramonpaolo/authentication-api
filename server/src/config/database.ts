//---- Packages
import { Sequelize } from "sequelize";
import path from "path"

const sequelize = new Sequelize({dialect: "sqlite", host: path.join(__dirname, "..", "database", "database.sqlite")})

export default sequelize