const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId


const plan = new Schema({
    title: {type: String, required: true},
    sets: {type: Number, required: false},
    autofocusPlan: {type: Number, required: false},
    alwaysSolve: {type: Boolean, required: false},
    limitTime: {type: String, required: false},
    quitTime: {type: String, required: false},
    shutdownTime: {type: String, required: false},
    systemShutdown: {type: Boolean, required: false},
    observations: []
}, {timestamps: {createdAt: 'created_at'}});  // add field when it create

module.exports = mongoose.model('Plan', plan)