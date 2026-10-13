const express = require("express");
const app = express();
const tasks = require("./routes/tasks");

// middleware
app.use(express.json());

// routes
app.use("/tasks", tasks);

app.use((req, res) => {
  res.status(404).send("Route not found");
});

module.exports = app;
