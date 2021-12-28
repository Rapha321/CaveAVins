const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RegionSchema = new Schema({

  nom: {
    type: String,
    required: true,
  }

})

module.exports = Region = mongoose.model('Region', RegionSchema)