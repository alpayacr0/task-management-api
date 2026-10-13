const express = require("express");
const router = express.Router();

// get all tasks
router.get("/", (req, res) => {
  res.send("Get all tasks");
});

// create a new task
router.post("/", (req, res) => {
  res.send("Create a new task");
});

// get a single task
router.get("/:id", (req, res) => {
  res.send(`Get a single task with id ${req.params.id}`);
});

module.exports = router;
