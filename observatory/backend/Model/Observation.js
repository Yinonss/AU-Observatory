const mongoose = require('mongoose')
const Schema = mongoose.Schema

const observation = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    ra: {type: Number, required: true},
    dec: {type: Number, required: true},
    exposures: [{type: Number}],
    exposureTime: [{type: Number}],
    filter: [{type: String}],
    bin: [{type: String}],
    start: {type: Date, required: true},
    end: {type: Date, required: true},
});

module.exports = mongoose.model('Observation', observation)