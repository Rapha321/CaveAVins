const { isEmail } = require('validator');

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientSchema = new Schema({
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
  adresse: {
    type: String,
  },
  appartment: {
    type: String,
  },
  ville: {
    type: String,
  },
  province: {
    type: String,
  },
  codePostal: {
    type: String,
  },
  typeCarte: {
    type: String,
  },
  numeroCarte: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Veuillez saisir un adresse email'],
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Veuillez saisir un mot de passe']
  },
})

module.exports = Client = mongoose.model('Client', ClientSchema)