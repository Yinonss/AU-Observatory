const mongoose = require('mongoose')
const Schema = mongoose.Schema

const observation = new Schema({
    id: {type: String, required: false},
    name: {type: String, required: false},
    ra: {type: Number, required: false},
    dec: {type: Number, required: false},
    exposures: [{type: Number}],
    exposureTime: [{type: Number}],
    filter: [{type: String}],
    bin: [{type: String}],
    start: {type: String, required: false},
    end: {type: String, required: false},
    repeat: {type: Number, required: false},
    calibrate: {type: Boolean, required: false, default: false},
    autoGuide: {type: Boolean, required: false, default: false},
    autoFocus: {type: Boolean, required: false, default: false},
    stack: {type: Boolean, required: false, default: false},
    stackAlign: {type: Boolean, required: false, default: false},
    pointing: {type: Boolean, required: false, default: false},
    noPointing: {type: Boolean, required: false, default: false},
    noSolve: {type: Boolean, required: false, default: false},
    waitFor: {type: Number, required: false},
    _waitUntil: [{type: Number, required: false}],
    waitLimits: {type: Number, required: false},
    waitZenith: [{type: Number, required: false}],
    waitAirMass: [{type: Number, required: false}],
    frameSize: {type: Number, required:  false},
    rotatorDegree: {type: Number, required: false},
    dithering: {type: Number, required: false},
    track: {type: Boolean, required: false},
    defocus: {type: Number, required: false},
    frameKind: {type: String, enum: ['IMAGE', 'DARK', 'BIAS'] , default: 'IMAGE' , required: true},
    darkFrames: {type: Number},
    biasFrames: {type: Number}
});

module.exports = mongoose.model('Observation', observation)