import React, { useState } from "react";
import { UseWorkoutsContext } from "../hooks/UseWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = UseWorkoutsContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");

  const [error, setError] = useState(null);
  const [emptyFeilds, setEmptyFeilds] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch("http://localhost:3000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFeilds(json.emptyFeilds);
    }

    if (response.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      setEmptyFeilds([]);
      console.log("New Workout Added");
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>

        <label>Exercise title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFeilds.includes("title") ? "error" : ""}
        />

        <label>Load (in kg):</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFeilds.includes("load") ? "error" : ""}
        />

        <label>Reps:</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFeilds.includes("reps") ? "error" : ""}
        />

        <button>Add Workout</button>

        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default WorkoutForm;
