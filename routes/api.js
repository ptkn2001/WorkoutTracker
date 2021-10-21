const router = require("express").Router();
const db = require("../models");
const path = require("path");

router.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

router.get('/exercise', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/exercise.html'))
);

router.get('/stats', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/stats.html'))
);


router.post("/api/workouts", ({ body }, res) => {
    //TODO: Create a new workout
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts", (req, res) => {
    //TODO: Get all the workouts
    db.Workout.find({})
        .sort({ day: 1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });

});

router.put("/api/workouts/:id", ({ body }, res) => {
    //TODO: Update the workout by id to add a new excercise

});

router.get("/api/workouts/:range", (req, res) => {
    //TODO:  Get the workouts in a range


});


module.exports = router;