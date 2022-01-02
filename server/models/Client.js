const { isEmail } = require('validator');

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: false,
  },
  typeCarte: {
    type: String,
    required: false,
  },
  numeroCarte: {
    type: String,
    required: false,
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