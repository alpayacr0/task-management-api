const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const logger = require("./middleware/logger");

// middleware
app.use(express.json());
app.use(logger);

// routes
app.use("/tasks", tasks);

app.use((req, res) => {
  res.status(404).send("Route not found");
});

module.exports = app;
