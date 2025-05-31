const express = require("express");
const router = express.Router();
const { createClientForm } = require("../Controller/ClientFirstFormCtrl");

// POST: Create new client form
router.post("/", createClientForm);

module.exports = router;
