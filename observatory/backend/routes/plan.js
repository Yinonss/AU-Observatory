const router = require('express').Router()
const Plan = require('../Model/Plan')
const Obs = require('../Model/Observation')
const fs = require('fs');
//const rules = require('../Rules')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/*
    Get all the plans from the DB
 */
router.route('/').get(((req, res) => {
    Plan.find()
        .then(plan => res.json(plan))
        .catch(err => res.status(400).json('Error: ' + err))
}))

/*
    add a plan to the DB
 */
router.route('/add').post((req, res) => {
    if(!req.body || !req.body.observation || req.body.observation.length === 0) return
    let plan = new Plan();
    plan.title = req.body.title
    plan.sets = req.body.sets
    plan.autofocusPlan = req.body.autofocusPlan
    plan.alwaysSolve = req.body.alwaysSolve
    plan.limitTime = req.body.limitTime
    plan.quitTime = modifyLocalTime(req.body.quitTime)
    plan.shutdownTime = modifyLocalTime(req.body.shutdownTime)
    plan.systemShutdown = req.body.systemShutdown
    plan.observations = []
    req.body.observation.forEach((item,i) => {
        let name = item.name
        let ra = item.ra
        let dec = item.dec
        let exposures = item.exposures
        let exposureTime = item.exposureTime
        let filter = item.filter
        let bin = item.bin
        let start = item.start
        let end = item.end
        let repeat = item.repeat
        let calibrate = item.calibrate
        let autoGuide = item.autoGuide
        let autoFocus = item.autoFocus
        let stack = item.stack
        let stackAlign = item.stackAlign
        let pointing = item.pointing
        let noPointing = item.noPointing
        let noSolve = item.noSolve
        let waitFor = item.waitFor
        let _waitUntil = item._waitUntil
        let waitLimits = item.waitLimits
        let waitZenith = item.waitZenith
        let waitAirMass = item.waitAirMass
        let frameSize = item.frameSize
        let rotatorDegree = item.rotatorDegree
        let dithering = item.dithering
        let track = item.track
        let defocus = item.defocus
        let frameKind = item.frameKind
        let darkFrames = item.darkFrames
        let biasFrames = item.biasFrames
        //TODO: Change the flag to ENUM in order to differentiate kinds of frames.
            plan.observations[i]  = new Obs({
            name,
            ra,
            dec,
            exposures,
            exposureTime,
            filter,
                bin,
            start,
            end,
                repeat,
                calibrate,
                autoGuide,
                autoFocus,
                stack,
                stackAlign,
                pointing,
                noPointing,
                noSolve,
                waitFor,
                _waitUntil,
                waitLimits,
                waitZenith,
                waitAirMass,
                frameSize,
                rotatorDegree,
                dithering,
                track,
                defocus,
                frameKind,
                darkFrames,
                biasFrames
        })
    })
    plan.save((err, savedPlan) => {
        if(err){
            res.status(500).send({error : "DB error"})
        } else {
            res.json(savedPlan)
        }
    })


    const path = 'C:/Users/yinon/Documents/ACP Astronomy/Plans/' + plan.title + '.txt'  // path to save the file
    let acpScript = acpScriptGenerator(plan)
    fs.writeFile(path, acpScript, function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });
})

/*
    Delete plan by id
 */
router.route('/:id').delete(((req, res) => {
    Plan.findByIdAndDelete(req.params.id)
        .then(() => res.json('Deleted successfully'))
        .catch(err => res.status(400).json('Error: ' + err))
}))

/*
    Update plan by id
 */
router.route('update/:id').post(((req, res) => {
    Plan.findById(req.params.id)
        .then((plans) => {
            plans.observations = req.body.observations
            plans.save()
                .then(() => res.json('Updated successfully'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
}))



//TODO : We need to check if date format is acceptable for Windows OS.
function acpScriptGenerator(plan) {
    let script = ';=========================================================\n' +
        '; Ariel University Observatory Planner - ACP Script \n' +
        ';=========================================================\n';





    if (plan.sets != null) {
        script += '#SETS '+ plan.sets + '\n';
    }
    if (plan.autofocusPlan != null) {
        script += '#AFINTERVAL ' + plan.autofocusPlan + '\n';
    }
    if (plan.alwaysSolve) {
        script += '#ALWAYSSOLVE \n';
    }
    if (plan.limitTime != '') {
         script += '#MINSETTIME ' + plan.limitTime + '\n';
     }
     if (plan.quitTime != '// undefined' && plan.quitTime != '//' ) {
               script += '#QUITAT ' + plan.quitTime +'\n';
           }
           if (plan.shutdownTime != '// undefined' && plan.shutdownTime != '//' ) {
               script += '#SHUTDOWNAT ' + plan.shutdownTime + '\n'
           }

    for(let j = 0; j < plan.observations.length; j++) {

        if (plan.observations[j].frameKind == 'IMAGE') {
            if (plan.observations[j].frameSize != null) {
                script += '#SUBFRAME ' + plan.observations[j].frameSize + '\n'
            }
            if (plan.observations[j].rotatorDegree != null) {
                script += '#POSANG ' + plan.observations[j].rotatorDegree + '\n'
            }
            if (plan.observations[j].dithering != null) {
                script += '#DITHER ' + plan.observations[j].dithering + '\n'
            }
            if (plan.observations[j].track) {
                script += '#TRACKON \n'
            }
            if (plan.observations[j].defocus != null) {
                script += '#DEFOCUS ' + plan.observations[j].defocus + '\n'
            }

            if (plan.observations[j].repeat != 1 && plan.observations[j].repeat != null) {
                script += '#REPEAT ' + plan.observations[j].repeat + '\n';
            }
            if (plan.observations[j].calibrate) {
                script += '#CALIBRATE \n';
            }
            if (plan.observations[j].autoGuide) {
                script += '#AUTOGUIDE \n';
            }
            if (plan.observations[j].autoFocus) {
                script += '#AUTOFOCUS \n';
            }
            if (plan.observations[j].stack) {
                script += '#STACK\n';
            }
            if (plan.observations[j].stackAlign) {
                script += '#STACKALIGN\n';
            }
            if (plan.observations[j].pointing) {
                script += '#POINTING\n';
            }
            if (plan.observations[j].noPointing) {
                script += '#NOPOINTING\n';
            }
            if (plan.observations[j].noSolve) {
                script += '#NOSOLVE\n';
            }
            if (plan.observations[j].waitFor != null) {
                script += '#WAITFOR ' + plan.observations[j].waitFor + '\n';
            }
            if (plan.observations[j]._waitUntil[1] != null) {
                script += '#WAITUNTIL ' + plan.observations[j]._waitUntil + '\n';
            }
            if (plan.observations[j].waitAirMass[1] != null) {
                script += '#WAITAIRMASS ' + plan.observations[j].waitAirMass + '\n';
            }
            if (plan.observations[j].waitZenith[1] != null) {
                script += '#WAITZENDIST ' + plan.observations[j].waitZenith + '\n';
            }

            /* if (plan.observations[j].waitLimits != null) {
                 script += '#WAITINLIMITS ' + plan.observations[j].waitLimits +'\n';
             }*/
             if(plan.observations[j].start != null && plan.observations[j].start != '') {
                script += '#WAITUNTIL  ' + 1 + ', '+ modifyLocalTime(plan.observations[j].start);
             }
            if(plan.observations[j].filter != '') {
                script += '\n#FILTER ';
            
                for (let i = 0; i < plan.observations[j].filter.length; i++) {
                    //TODO: When Clear filter is chosen it is appear as null - need to be fixed.
                    console.log('in filter')
                    let filter = plan.observations[j].filter[i];
                    if (filter == '') filter = 'Clear'
                    if (i != plan.observations[j].filter.length - 1) {
                        script += filter + ',';
                    } else {
                        script += filter ;
                    }
                }
            }
            if (plan.observations[j].bin != '') {
                console.log('in binning')
                script += '\n#BINNING '
                for (let i = 0; i < plan.observations[j].bin.length; i++) {
                    if (i != plan.observations[j].filter.length - 1) {
                        script += plan.observations[j].bin[i] + ',';
                    } else {
                        script += plan.observations[j].bin[i];
                    }
                }
            }
            if (plan.observations[j].exposures != '') {
                console.log('in exposures')
                script +=  '\n#COUNT ';
                for (let i = 0; i < plan.observations[j].exposures.length; i++) {
                    if (i != plan.observations[j].exposures.length - 1) {
                        script += plan.observations[j].exposures[i] + ',';
                    } else {
                        script += plan.observations[j].exposures[i];
                    }
                }
             }
            if (plan.observations[j].exposureTime != '') {
                console.log('in exposureTime')
                script += '\n#INTERVAL  ';
                for (let i = 0; i < plan.observations[j].exposureTime.length; i++) {
                    if (i != plan.observations[j].exposureTime.length - 1) {
                        script += plan.observations[j].exposureTime[i] + ',';
                    } else {
                        script += plan.observations[j].exposureTime[i];
                        }
                    }
            }
            if (plan.observations[j].track) {
                script += ' \n#TRACKOFF \n'
            }
            script += '\n' + plan.observations[j].name + '  '+plan.observations[j].ra+'    '+plan.observations[j].dec;
            if (j < plan.observations.length - 1) {
                script = script + '\n;=========================================================\n;=========================================================\n';
            }

        }

        else if (plan.observations[j].frameKind == 'DARK') {
            script += '#SETS ' + plan.observations[j].darkFrames + '\n';
            script += '#DARK \n';
            script = script + '\n;=========================================================\n;=========================================================\n';
        }
        else if (plan.observations[j].frameKind == 'BIAS') {
            script += '#SETS ' + plan.observations[j].biasFrames + '\n';
            script += '#BIAS \n';
            script = script + '\n;=========================================================\n;=========================================================\n';
        }

    }
    if (plan.systemShutdown) {
        script += '#SHUTDOWN \n';
    }

    return script;
}


function modifyLocalTime(timeExpression) {
    timeExpression = timeExpression.replace('-', ' ');
    timeExpression = timeExpression.replace('-', ' ');
    timeExpression= timeExpression.replace('T', ' ');
    let timeExpressionList = timeExpression.split(" ")
    let hour = timeExpressionList[3]
    timeExpressionList = timeExpressionList.splice(0,3);
    let temp = timeExpressionList[0];
    timeExpressionList[0] = timeExpressionList[2]
    timeExpressionList[2] = temp
    let ans = timeExpressionList.join();
    for (let i = 0; i < ans.length; i++) {
        if(ans.charAt(i) === ',') {
            ans = ans.replaceAt(i, '/');
        }
    }
    if(hour == null || hour == ''){
        return ans;
    }
    else {
        return ans + ' ' + hour;
    }

}

String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }

    return this.substring(0, index) + replacement + this.substring(index + 1);
}


module.exports = router