const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const compositeTaskController = require("../../Controller/CompositeTask/compositeCtrl");
const upload = require("../../config/multer");

const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "downloadFormUrl", maxCount: 1 },
  { name: "sampleFormUrl", maxCount: 1 },
]);

// Create a new task
router.post("/", uploadFields, compositeTaskController.createTask);

// Get all tasks
router.get("/", compositeTaskController.getAllTasks);

// Get a task by ID
router.get("/:id", compositeTaskController.getTaskById);

// Update a task by ID
// router.put("/:id", compositeTaskController.updateTask);
router.put("/:id", uploadFields, compositeTaskController.updateTask);

// Delete a task by ID
router.delete("/delete/:id", compositeTaskController.deleteTask);

module.exports = router;
