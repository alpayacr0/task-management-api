const express = require("express");
const router = express.Router();
const { readFile, writeFile } = require("../utils/file");
const validateTask = require("../middleware/validation");
const validateTaskUpdate = require("../middleware/validateUpdate");

// get all tasks
router.get("/", (req, res) => {
  const tasks = readFile();
  res.json(tasks.tasks);
});

// create a new task
router.post("/", validateTask, (req, res) => {
  const tasks = readFile();

  const newTask = {
    id: tasks.lastId + 1,
    title: req.body.title.trim(),
    description: req.body.description || "",
    status: req.body.status || "todo",
    priority: req.body.priority || "medium",
    assignee: req.body.assignee || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.tasks.push(newTask);
  tasks.lastId = newTask.id;

  if (!writeFile(tasks)) {
    return res.status(500).json({ error: "Failed to save the task." });
  }
  res.status(201).json(newTask);
});

// get a single task
router.get("/:id", (req, res) => {
  const tasks = readFile();
  const task = tasks.tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
});

router.patch("/:id", validateTaskUpdate, (req, res) => {
  const tasks = readFile();
  const taskIndex = tasks.tasks.findIndex(
    (t) => t.id === parseInt(req.params.id),
  );
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const updatedTask = {
    ...tasks.tasks[taskIndex],
    title: req.body.title
      ? req.body.title.trim()
      : tasks.tasks[taskIndex].title,
    description:
      req.body.description !== undefined
        ? req.body.description
        : tasks.tasks[taskIndex].description,
    status: req.body.status || tasks.tasks[taskIndex].status,
    priority: req.body.priority || tasks.tasks[taskIndex].priority,
    assignee:
      req.body.assignee !== undefined
        ? req.body.assignee
        : tasks.tasks[taskIndex].assignee,
    updatedAt: new Date().toISOString(),
  };

  tasks.tasks[taskIndex] = updatedTask;

  if (!writeFile(tasks)) {
    return res.status(500).json({ error: "Failed to update the task." });
  }
  res.json(updatedTask);
});

router.delete("/:id", (req, res) => {
  const tasks = readFile();
  const taskIndex = tasks.tasks.findIndex(
    (t) => t.id === parseInt(req.params.id),
  );
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.tasks.splice(taskIndex, 1);

  if (!writeFile(tasks)) {
    return res.status(500).json({ error: "Failed to delete the task." });
  }
  res.status(204).end();
});

module.exports = router;
