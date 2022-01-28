const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RegionSchema = new Schema({

  nomRegion: {
    type: String,
    required: true
  },
  imgRegion: {
    type: String,
  },
  descrRegion: {
    type: String,
    required: true
  },

})

module.exports = Region = mongoose.model('Region', RegionSchema)


