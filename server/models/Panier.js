const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PanierSchema = new Schema({

  clientID: {
    type: String
  },

  vinsID: {
    type: String
  },
  quantity: {
    type: Number
  }

})

module.exports = Panier = mongoose.model('Panier', PanierSchema)