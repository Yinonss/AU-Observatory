const mongoose = require('mongoose')
const Schema = mongoose.Schema

var observation = new Schema({
    name : String,
    ra : Number,
    dec : Number,
    exposures : Number,
    exposure_time : Number,
    filter : String,
    start : Date,
    end : Date,
    priority : Number
})

module.exports = mongoose.model('Observation', observation)