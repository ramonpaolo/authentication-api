//---- Packages
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//---- Models
import UserModal from "../models/userModel";

class User {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await UserModal.findOne({
      where: {
        email,
      },
    });

    if (user == null)
      return res.status(401).json({
        result: "error",
        error: {
          name: "user-not-exists",
          message: "User not exists",
        },
      });

    var usersJson: Object = user?.toJSON() as Object;

    const hashPassword = await bcrypt.compare(
      password,
      Object.values(usersJson)[3]
    );

    if (!hashPassword)
      return res.status(401).json({
        result: "error",
        error: {
          name: "user-not-exists",
          message: "User not exists",
        },
      });

    const token = jwt.sign(
      {
        user,
        email,
      },
      process.env.jwt_key!,
      { expiresIn: "10d" }
    );

    return res.status(200).json({ result: "ok", token });
  }

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userExists = await UserModal.findOne({
      where: {
        email,
      },
    });
    if (userExists != null)
      return res.status(203).send({ result: "user-exists" });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await UserModal.create({
      name,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      {
        name,
        email,
      },
      process.env.jwt_key!,
      { expiresIn: "10d" }
    );
    return res.status(200).json({ result: "ok", token });
  }

  async verifyAccount(req: Request, res: Response) {
    const token = req.headers.authorization!.split(" ")[1];

    jwt.verify(token, process.env.jwt_key!, (err: any, decoded: any) => {
      if (err != null) return res.sendStatus(401);
      //console.log(decoded)
      return res.status(200).json({ result: "ok" });
    });
  }
}

export default new User();
