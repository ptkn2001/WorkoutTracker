const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            required: "Enter type of exercise"
        },
        name: {
            type: String,
            required: "Enter name of exercise"
        },
        duration: {
            type: Number,
            required: "Enter duration of exercise"
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        },
        distance: {
            type: Number
        }
    }]
});

const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;