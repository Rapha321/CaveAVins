const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommandeSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }

})

module.exports = Commande = mongoose.model('Commande', CommandeSchema)