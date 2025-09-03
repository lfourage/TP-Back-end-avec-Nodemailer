import { JSONFilePreset } from "lowdb/node";
import { RegisterModel } from "./model.js";

const db = await JSONFilePreset('db.json', { users: [] });

class UserController {
  async createUser(req, res) {

    try {
        const {error, value } = RegisterModel.validate(req.body);

        if (error)
            throw error;

        await db.update(({users}) => users.push(value));

        res.status(200).send(db.data.users[db.data.users.length - 1]);
    }
    catch(e) {
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
