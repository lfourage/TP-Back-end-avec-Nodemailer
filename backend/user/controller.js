import { JSONFilePreset } from "lowdb/node";
import { RegisterModel } from "./model.js";
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';





const db = await JSONFilePreset('db.json', { users: [] });
const CLIENT_URL='http://localhost:5173'
console.log('TEST TOKEN:', crypto.randomBytes(8).toString('hex'));

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
