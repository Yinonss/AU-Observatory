const express = require('express')
const app = express()
const port = 5000
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = mongoose.connect('mongodb://localhost/database', {useNewUrlParser: true})


app.use(express.json())

const plan = require('./routes/plan')
app.use('/plan', plan)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
