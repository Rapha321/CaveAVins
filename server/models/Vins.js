const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VinsSchema = new Schema({

  regionID: {
    type: String,
    required: true,
  },
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
  },
  descrVins: {
    type: String
  },
  imgVins: {
    type: String
  }

})

module.exports = Vins = mongoose.model('Vins', VinsSchema)


