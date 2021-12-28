const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VinsSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  }

})

module.exports = Vins = mongoose.model('Vins', VinsSchema)