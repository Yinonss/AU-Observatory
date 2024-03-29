const express = require('express')
const app = express()
const port = 5001

var RuleEngine = require('node-rules')

app.use(express.json())

var R = new RuleEngine()
var R2 = new RuleEngine()


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

var StartAndEndUndefinedRule = {
    "condition": function(R) {
        R.when(this.start === '' || this.end === '');
    },
    "consequence": function(R) {
        this.result = false;
        this.reason = "Please fill start-time and end-time of the plan";
        R.stop();
    }
}

var StartAndEndRule = {
    "condition": function (R) {
        R.when(this.start > this.end);
    },
    "consequence": function (R) {
        this.result = false;
        this.reason = "end-time is invalid";
        R.stop();
    }
}
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

var POSANGRule = {
    "condition": function(R) {
        R.when(this.rotatorDegree < 0 || this.rotatorDegree > 360);
    },
    "consequence": function(R) {
        this.result = false;
        this.reason = "Rotator Degree is out of range."
        R.stop();
    }
};

var DitheringRule = {
    "condition": function(R) {
        R.when(this.dithering < 0);
    },
    "consequence": function(R) {
        this.result = false;
        this.reason = "Dithering must be positive."
        R.stop();
    }
};

var RepeatRule = {
    "condition": function(R) {
        R.when(this.repeat < 0 && this.repeat > 3);
    },
    "consequence": function(R) {
        this.result = false;
        this.reason = "Repeat should be 0-3."
        R.stop();
    }
};

var ImageSessionRule = {
    "condition": function(R) {
        R.when(this.filter === '' || this.exposureTime === '');
    },
    "consequence": function(R) {
        this.result = false;
        this.reason = "Pleas choose filter and duration"
        R.stop();
    }
};

var SetsRule = {  //TargetsBoard
    "condition": function(R2) {
        R2.when(this.sets === '');
    },
    "consequence": function(R2) {
        this.result = true;
        this.sets = 1; // If the user not initialize the number of sets- put 1.
        R2.stop();
    }
};

var WaitUntilRule = {  //TargetsBoard (sets)
    "condition": function(R2) {
        R2.when(this._waitUntil[0] < 0 || this._waitUntil[0] > this.sets);
    },
    "consequence": function(R2) {
        this.result = false;
        this.reason = "Invalid limit angle-sets value";
        R2.stop();
    },
};

var WaitUntilRule2 = {  //TargetsBoard (sets)
    "condition": function(R2) {
        R2.when(this._waitUntil[1] > 0);
    },
    "consequence": function(R2) {
        this.result = false;
        this.reason = "Invalid limit angle-degrees value";
        R2.stop();
    }
};

var  PlanTitleRule= {  //TargetsBoard
    "condition": function(R2) {
        R2.when(this.planName === '');
    },
    "consequence": function(R2) {
        this.result = false;
        this.reason = "Must have plan name"
        R2.stop();
    }
}

var  EmptyTargetsRule = {  //TargetsBoard
    "condition": function(R2) {
        R2.when(!this.observation.length);
    },
    "consequence": function(R2) {
        this.result = false;
        this.reason = "Must have at least 1 target"
        R2.stop();
    }
};

var AutoFocusRule = {  //TargetsBoard
    "condition": function(R2) {
        R2.when(this.autofocusPlan != '' && this.autofocusPlan < 6);
    },
    "consequence": function(R2) {
        this.result = false;
        this.reason = "PlanAutoFocus must be at least 6"
        R2.stop();
    }
};

var ShutdownRule = {  //TargetsBoard
    "condition": function(R2) {
        R2.when(this.shutdownTime !== '' && this._shutdown);
    },
    "consequence": function(R2) {
        this.result = false;
        this.reason = "Please choose one of the shutdown options"
        R2.stop();
    }
};

var SolveRule = {  //TargetsBoard
    "condition": function(R2) {
        if (this.alwaysSolve) {
            this.observation.map((target) => {
                R2.when(target.noSolve)
            })
        }
    },
    "consequence": function(R2) {
        this.result = false;
        this.reason = "Conflict in solve/not-solve. please choose one."
        R2.stop();
    }
};

/* Apply Rules */
R.register(TargetNameRule);
R.register(RAAndDERule);
R.register(StartAndEndUndefinedRule);
R.register(ImageSessionRule);
R.register(StartAndEndRule);
R.register(WaitUntilRule);
R.register(WaitUntilRule2);
R.register(POSANGRule);
R.register(RepeatRule);

/* Apply Rules2 */
R2.register(EmptyTargetsRule);
R2.register(PlanTitleRule);
R2.register(AutoFocusRule);
R2.register(ShutdownRule);
R2.register(DitheringRule);
//R2.register(SetsRule);
//R2.register(SolveRule);

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


// request rules for section 2
app.post('/rules/2', (req, res) => {
    let plan = req.body.targetsBoard
    R2.execute(plan, function (data) {
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
