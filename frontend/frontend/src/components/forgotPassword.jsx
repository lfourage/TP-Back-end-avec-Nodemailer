import { useState } from "react";
import axiosInstance from "../api/axios.instance";
 import { useNavigate } from "react-router-dom"; 
import '../styles/forgotPassword.css'
export default function ForgotPassword(){
    const [email, setEmail] = useState('');
    const [message, setMessage] =useState('');
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const res = await axiosInstance.post('/forgot-password',{email});
            setMessage(res.data.message|| "Un lien de réinitialisation a été envoyé à votre adresse email")
        } catch(error){
            console.error("Erreur lors de l'envoi du lien:", error);
            setMessage("Une erreur s'est produite. Vouillez réessayer.")
        }
    }
return (
    <div className="login-container-wrapper">
<form className="login-container" onSubmit={handleSubmit}>
      <h1>Mot de passe oublié</h1>
      {message && <p style={{ color: '#52796f', fontSize: '14px' }}>{message}</p>}
      <input
        type="email"
        placeholder="Votre adresse e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className="bouttons-rows">
        <button type="submit">Envoyer le lien</button>
        
      </div>
      <p>Si l'email existe, un lien vous serait envoyé</p>
    </form>
    </div>
  );





}