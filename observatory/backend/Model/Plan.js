const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const plan = new Schema({
    title: {type: String, required: true},
    observations: [{type: ObjectId, ref: 'Observation'}]
    //timestamp: true  // add field when it create
});

module.exports = mongoose.model('Plan', plan)