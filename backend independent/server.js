require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const workoutRouter = require("./routes/workoutRouter");
const userRouter = require("./routes/userRouter");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api/workouts", workoutRouter);
app.use("/api/user", userRouter);

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to the database and server started at port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
