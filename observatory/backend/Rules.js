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
        R.when(typeof this.start === 'undefined' || typeof this.end === 'undefined'); //TODO:: FIX
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

var SetsRule = {  //TargetsBoard
    "condition": function(R) {
        R.when(this.sets === '');
    },
    "consequence": function(R) {
        this.result = true;
        this.sets = 1; // If the user not initialize the number of sets- put 1.
        R.stop();
    }
};

var WaitUntilRule = {  //TargetsBoard (sets)
    "condition": function(R) {
        R.when(this._waitUntil[0] === '' || this._waitUntil[0] < 0 || this._waitUntil[0] > this.sets);
    },
    "consequence": function(R) {
        this.result = false;
        this.reason = "Invalid limit angle-sets value";
        R.stop();
    },
    "condition": function(R) {
        R.when(this._waitUntil[1] === '' || this._waitUntil[1] > 0);
    },
    "consequence": function(R) {
        this.result = false;
        this.reason = "Invalid limit angle-degrees value";
        R.stop();
    }
};

var AutoFocusRule = {  //TargetsBoard
    "condition": function(R) {
        R.when(this.autofocusPlan === '' || this.autofocusPlan < 6);
    },
    "consequence": function(R) {
        this.result = false;
        this.result = "PlanAutoFocus must be at least 6"
        R.stop();
    }
};

var ShutdownRule = {  //TargetsBoard
    "condition": function(R) {
        R.when(typeof this.shutdownTime === 'undefined' && !this._shutdown);
    },
    "consequence": function(R) {
        this.result = false;
        this.result = "Fill shutdown option"
        R.stop();
    },
    "condition": function(R) {
        R.when(typeof this.shutdownTime !== 'undefined' && this._shutdown);
    },
    "consequence": function(R) {
        this.result = false;
        this.result = "Please choose one of the shutdown options"
        R.stop();
    }
};

var POSANGRule = {
    "condition": function(R) {
        R.when(this.rotatorDegree === '' || this.rotatorDegree < 0 || this.rotatorDegree > 360);
    },
    "consequence": function(R) {
        this.result = false;
        this.result = "Rotator Degree is out of range."
        R.stop();
    }
};

var DitheringRule = {  //TargetsBoard
    "condition": function(R) {
        R.when(this.dithering < 0);
    },
    "consequence": function(R) {
        this.result = false;
        this.result = "Dithering must be positive."
        R.stop();
    }
};

var SolveRule = {  //TargetsBoard
    "condition": function(R) {
        R.when(this.alwaysSolve && this.noSolve);
    },
    "consequence": function(R) {
        this.result = false;
        this.result = "Conflict in solve/not-solve. please choose one."
        R.stop();
    }
};



/* Apply the rules */
R.register(TargetNameRule);
R.register(RAAndDERule);
R.register(StartAndEndRule);
R.register(WaitUntilRule);
R.register(SetsRule);
R.register(AutoFocusRule);
R.register(ShutdownRule);
R.register(POSANGRule);
R.register(DitheringRule);

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
