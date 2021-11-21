//---- Database Config
import sequelize from "./database";

//---- Models
import UserModal from "../models/userModel";

(async () => {
    UserModal
    await sequelize.sync()
})()