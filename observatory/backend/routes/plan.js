const router = require('express').Router()
const Plan = require('../Model/Plan')
const Obs = require('../Model/Observation')
const fs = require('fs');

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
    plan.observations = []
    req.body.observation.forEach((item,i) => {
        let name = item.name
        let ra = item.ra
        let dec = item.dec
        let exposures = item.exposures
        let exposure_time = item.exposure_time
        let filter = item.filter
        let start = item.start
        let end = item.end
        let priority = item.priority
            plan.observations[i]  = new Obs({
            name,
            ra,
            dec,
            exposures,
            exposure_time,
            filter,
            start,
            end,
            priority
        })
    })
    plan.save((err, savedPlan) => {
        if(err){
            res.status(500).send({error : "DB error"})
        } else {
            res.json(savedPlan)
        }
    })

    // path to save the file
    // TODO make a string for the file
    const path = 'C:/Users/Maor/WebstormProjects/AU-Observatory/observatory/backend/Files/' + plan.title + '.txt'
    fs.writeFile(path, 'Learn Node FS module', function (err) {
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

module.exports = router
