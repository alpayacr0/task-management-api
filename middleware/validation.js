const validateTask = (req, res, next) => {
  const { title, description, status, priority, assignee } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res
      .status(400)
      .json({ error: "Title is required and must be a non-empty string." });
  }
  if (description && typeof description !== "string") {
    return res
      .status(400)
      .json({ error: "Description must be a string if provided." });
  }
  if (status && !["todo", "in-progress", "done"].includes(status)) {
    return res.status(400).json({
      error: "Status must be one of the following: todo, in-progress, done.",
    });
  }
  if (priority && !["low", "medium", "high"].includes(priority)) {
    return res.status(400).json({
      error: "Priority must be one of the following: low, medium, high.",
    });
  }
  if (assignee && typeof assignee !== "string") {
    return res
      .status(400)
      .json({ error: "Assignee must be a string if provided." });
  }
  next();
};

module.exports = validateTask;
