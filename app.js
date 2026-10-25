const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const reports = require("./routes/reports");
const logger = require("./middleware/logger");

// middleware
app.use(express.json());
app.use(logger);

// routes
app.use("/tasks", tasks);
app.use("/reports", reports);

app.use((req, res) => {
  res.status(404).send("Route not found");
});

module.exports = app;
