import * as fetch from 'node-fetch'
import axios from "axios";

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.get('/getTarget/:name', (req, res) => {
    const a = require('http://simbad.u-strasbg.fr/simbad/sim-nameresolver?Ident=M31&data=J,M(U,B,V),S,I&output=json')
    res.send(a)
})

// app.get('http://simbad.u-strasbg.fr/simbad/sim-nameresolver?Ident=:name&data=J,M(U,B,V),S,I&output=json', (req, res) => {
//     res.send(req.params.name)
// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

