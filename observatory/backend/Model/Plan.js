const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

var plan = new Schema({
    title : String,
    observations : [{type : ObjectId, ref: 'Observation'}]
})

module.exports = mongoose.model('Plan', plan)