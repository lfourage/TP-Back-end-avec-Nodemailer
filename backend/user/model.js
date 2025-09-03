import Joi from "joi";

export const RegisterModel = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.base": "Le prénom doit être une chaîne de caractères",
    "string.empty": "Le prénom est requis",
    "string.min": "Le prénom doit contenir au moins 2 caractères",
    "any.required": "Le prénom est requis",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Adresse e-mail invalide",
    "any.required": "L’email est requis",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Le mot de passe doit contenir au moins 6 caractères",
    "any.required": "Le mot de passe est requis",
  }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Les mots de passe doivent être identiques",
    "any.required": "La confirmation du mot de passe est requise",
  }),
});
