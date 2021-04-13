const express = require('express')
const app = express()
const port = 5000
// const bodyParser = require('body-parser')
 const mongoose = require('mongoose')
 const db = mongoose.connect('mongodb://localhost/database', {useNewUrlParser: true})

//const Observation = require('../src/Model/Observation')
const Plan = require('./Model/Plan')

app.use(express.json())

app.post('/plan', function (req, res){
    let plan = new Plan();
    plan.title = req.body.title
    plan.observations = req.body.observations
    plan.save(function (err, savedPlan){
        if(err){
            res.status(500).send({error : "DB error"})
        } else {
            res.status(200).send("savedPlan")
        }
    })
})

 app.get('api/plan', (req, res) => {
     res.send("hello world")
 })

app.get('/', (req, res) => {
    res.send("hello world")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
