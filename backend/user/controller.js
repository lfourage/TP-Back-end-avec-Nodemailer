import { JSONFilePreset } from "lowdb/node";
import { RegisterModel } from "./model.js";
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "../mail/mail.js";

const db = await JSONFilePreset('db.json', { users: [], tokens: [] });

class UserController {
  async createUser(req, res) {
    try {
      const { error, value } = RegisterModel.validate(req.body);

      if (error) throw error;

      const userAlreadyExists = db.data.users.find(
        (u) => u.email === value.email
      );
      if (userAlreadyExists)
        return res.status(400).json({ error: "Email deja utilise" });

      const hash = await argon2.hash(value.password);
      const newUser = {
        id: uuidv4(),
        name: value.name,
        email: value.email,
        password: hash,
        status: "pending",
      };
      const newToken = {
        token: uuidv4(),
        userId: newUser.id,
        expiresAt: Date.now() + 15 * 60 * 1000,
      };

      await db.update(({ users, tokens }) => {
        users.push(newUser);
        tokens.push(newToken);
      });

      await sendVerificationEmail(newUser.email, newToken.token);
      res.status(200).send(db.data.users[db.data.users.length - 1]);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  }

  async verifyEmail(req, res) {
    const token = req.query.token;
    const record = db.data.tokens.find((t) => t.token === token);

    if (!record || record.expiresAt < Date.now()) {
      return res.status(400).json("Token invalide ou expire");
    }

    const user = db.data.users.find((u) => u.id === record.userId);
    if (!user) {
      return res.status(400).json("Utilisateur non trouve");
    }

    user.verified = true;

    db.data.tokens = db.data.tokens.filter((t) => t.token !== token);

    await db.write();

    res.json("Verification d'email validee");
  }

  async loginUser(req, res) {}

  async requestPasswordReset(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Veuillez fournir un email' });
  }

  try {
    await db.read(); // important : charger les données actuelles

    const user = db.data.users.find(u => u.email === email);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    
    const resetToken = crypto.randomBytes(32).toString('hex');

    
    user.resetToken = resetToken;

    await db.write(); 

    const resetUrl = `${CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: 'Réinitialisation de votre mot de passe',
      html: `Bonjour ${user.firstname},<br><br>
        Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe : 
        <a href="${resetUrl}">Réinitialiser mon mot de passe</a><br><br>
        Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.`,
    });

    res.json({ message: 'Email de réinitialisation envoyé avec succès' });

  } catch (error) {
    console.error('Erreur demande reset password :', error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }


}
async resetPassword(req, res) {}

  logoutUser(req, res) {}


}
  

export default UserController;
