const router = require("express").Router();
const db = require("../models");
const path = require("path");
const winston = require('winston');

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
    db.Workout.create(body)
        .then(dbWorkout => {
            winston.log('info', '/api/workouts POST result', {
                result: dbWorkout
            });
            res.json(dbWorkout);
        })
        .catch(err => {
            winston.log('error', '/api/workouts POST error', {
                error: err
            });
            res.status(400).json(err);
        });
});

router.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([{
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }])
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", (req, res) => {
    if (!req.body.name) {
        res.json({ message: "exercise data incomplete." });
        return;
    }

    db.Workout.findOneAndUpdate({ _id: req.params.id }, {
            $push: { exercises: req.body }
        })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            winston.log('error', '/api/workouts/:id PUT error', {
                error: err
            });
            res.status(400).json(err);
        });

});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([{
                $addFields: {
                    totalDuration: { $sum: "$exercises.duration" }
                }
            },
            { $sort: { day: -1 } },
            { $limit: 7 }
        ])
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


module.exports = router;