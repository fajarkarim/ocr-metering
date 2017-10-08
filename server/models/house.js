var mongoose = require('mongoose')

var Schema = mongoose.Schema

var houseSchema = new Schema({
  house: String,
  image: String,
  water_meter: Number
})

var House = mongoose.model('House', houseSchema)

module.exports = House
