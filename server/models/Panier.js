const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PanierSchema = new Schema({

  quantity: {
    type: Number,
    required: true,
  },
  item: {
    type: String,
    required: true,
  }

})

module.exports = Panier = mongoose.model('Panier', PanierSchema)