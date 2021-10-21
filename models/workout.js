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
            type: Number,
            required: "Enter weight of exercise"
        },
        reps: {
            type: Number,
            required: "Enter number of reps"
        },
        sets: {
            type: Number,
            required: "Enter number of sets"
        }
    }]
});

const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;