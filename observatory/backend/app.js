const express = require('express')
const app = express()
const port = 5000
// const bodyParser = require('body-parser')
 const mongoose = require('mongoose')
 const db = mongoose.connect('mongodb://localhost/database', {useNewUrlParser: true})

const Observation = require('./Model/Observation')
const Plan = require('./Model/Plan')

app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/plan', function (req, res){
    if(!req.body || !req.body.observation || req.body.observation.length === 0) return
    let plan = new Plan();
    plan.title = req.body.title
    req.body.observation.forEach((item,i) => {
        const name = item.name
        const ra = item.ra
        const dec = item.dec
        const exposures = item.exposures
        const exposure_time = item.exposure_time
        const filter = item.filter
        const start = item.start
        const end = item.end
        const priority = item.priority
        plan.observations[i] = {name, ra, dec , exposures, exposure_time, filter, start, end, priority};
    })
    plan.save((err, savedPlan) => {
        if(err){
            res.status(500).send({error : "DB error"})
        } else {
            res.json(savedPlan)
        }
    })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
