const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const officeDiaryCtrl = require("../Controller/OfficeDiaryCtrl");

const uploadFields = upload.fields([{ name: "diaryPdf", maxCount: 1 }]);

// CREATE
router.post("/", uploadFields, officeDiaryCtrl.createDiary);

// READ ALL
router.get("/", officeDiaryCtrl.getAllDiaries);

// READ ONE
router.get("/:id", officeDiaryCtrl.getDiaryById);

// UPDATE
router.put("/update/:id", uploadFields, officeDiaryCtrl.updateDiary);

// DELETE
router.delete("/delete/:id", officeDiaryCtrl.deleteDiary);

module.exports = router;
