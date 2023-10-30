const Workout = require("../model/workoutModel");
const mongoose = require("mongoose");

// get all workout
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;

  const workout = await Workout.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(workout);
};

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await Workout.findOne({ _id: id });

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// post a new workout
const postWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFeilds = [];

  if (!title) {
    emptyFeilds.push("title");
  }

  if (!load) {
    emptyFeilds.push("load");
  }

  if (!reps) {
    emptyFeilds.push("reps");
  }

  if (emptyFeilds.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill out all the feilds", emptyFeilds });
  }

  try {
    const user_id = req.user._id;

    const workout = await Workout.create({ title, reps, load, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

module.exports = {
  postWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
