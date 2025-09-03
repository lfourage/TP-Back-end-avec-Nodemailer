import { JSONFilePreset } from "lowdb/node";
import { RegisterModel } from "./model.js";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";

const db = await JSONFilePreset("db.json", { users: [] });

class UserController {
  async createUser(req, res) {
    try {
      const { error, value } = RegisterModel.validate(req.body);

      if (error) throw error;

      const hash = await argon2.hash(value.password);
      const newUser = {
        id: uuidv4(),
        name: value.name,
        email: value.email,
        password: hash,
        status: "pending",
      };

      await db.update(({ users }) => users.push(newUser));

      res.status(200).send(db.data.users[db.data.users.length - 1]);
    } catch (e) {
      console.log(e);
      res.status(500).send("error");
    }
  }

  async verifyEmail(req, res) {}

  async loginUser(req, res) {}

  async requestPasswordReset(req, res) {}
  async resetPassword(req, res) {}

  logoutUser(req, res) {}
}

export default UserController;
