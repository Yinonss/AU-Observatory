const express = require('express')
const app = express()
const port = 5001

var RuleEngine = require('node-rules')

app.use(express.json())

var R = new RuleEngine()


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

/* Creating Rules */
var TargetNameRule = {
    "condition": function(R) {
        R.when(this.name === "");
    },
    "consequence": function(R) {
        this.result = false;
        this.reason = "target name is empty";
        R.stop();
    }
};

var RAAndDERule = {
    "condition": function(R) {
        R.when(this.ra === '' || this.dec === '');
    },
    "consequence": function(R) {
        this.result = false;
        this.reason = "Right Ascension or Declination are empty";
        R.stop();
    }
};

var StartAndEndRule = {
    "condition": function(R) {
        R.when(this.start === null  || this.end == null); //TO FIX
    },
    "consequence": function(R) {
        this.result = false;
        this.reason = "Please fill start-time and end-time of the plan";
        R.stop();
    },
    "condition": function(R) {
        R.when(this.start > this.end);
    },
    "consequence": function(R) {
        this.result = false;
        this.reason = "end-time is invalid";
        R.stop();
    }
};

var RAAndDERule = {
    "condition": function(R) {
        R.when(this.ra === '' || this.dec === '');
    },
    "consequence": function(R) {
        this.result = false;
        this.reason = "Right Ascension or Declination are empty";
        R.stop();
    }
};


/* Apply the rules */
R.register(TargetNameRule);
R.register(RAAndDERule);
R.register(StartAndEndRule);




// request rules for section 1
app.post('/rules/1', (req, res) => {
    let obj = req.body.target
    R.execute(obj, function (data) {
        if (data.result) {
            res.send({isValid: data.result})
        } else {
            res.send({isValid: data.result, reason: data.reason})
        }
    })
})

app.listen(port, () => {
    console.log(`Example rules listening at http://localhost:${port}`)
})
