const express = require("express");
const router = express.Router();
const { readFile } = require("../utils/file");

// get report of tasks by completion status
router.get("/completed", (req, res) => {
  const tasks = readFile();
  const completedTasks = tasks.tasks.filter((task) => task.status === "done");
  res.json(completedTasks);
});

// pending tasks report
router.get("/pending", (req, res) => {
  const tasks = readFile();
  const pendingTasks = tasks.tasks.filter(
    (task) => task.status === "todo" || task.status === "in-progress",
  );
  res.json(pendingTasks);
});

// general report of tasks summary
router.get("/summary", (req, res) => {
  const tasks = readFile();
  const totalTasks = tasks.tasks.length;
  const completedTasks = tasks.tasks.filter(
    (task) => task.status === "done",
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  res.json({
    totalTasks,
    completedTasks,
    pendingTasks,
  });
});

module.exports = router;
