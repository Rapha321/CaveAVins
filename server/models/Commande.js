const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommandeSchema = new Schema({
  date: {
    type: Date,
  },
  clientID: {
    type: String,
  },
  item: Array,
  status: {
    type: String,
  }

})

module.exports = Commande = mongoose.model('Commande', CommandeSchema)