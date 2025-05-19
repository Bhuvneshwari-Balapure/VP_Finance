const OfficeDiary = require("../Models/OfficeDiaryModel");
const fs = require("fs");
const path = require("path");

// CREATE
exports.createDiary = async (req, res) => {
  try {
    const { name, particulars } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!req.files || !req.files.diaryPdf || req.files.diaryPdf.length === 0) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    const pdfFile = req.files.diaryPdf[0];

    const newEntry = new OfficeDiary({
      name,
      particulars: particulars || "",
      pdfPath: `/public/Images/${pdfFile.filename}`,
    });

    await newEntry.save();
    res
      .status(201)
      .json({ message: "Office Diary saved successfully", data: newEntry });
  } catch (error) {
    console.error("Error saving diary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// READ ALL
exports.getAllDiaries = async (req, res) => {
  try {
    const diaries = await OfficeDiary.find().sort({ createdAt: -1 });
    res.status(200).json(diaries);
  } catch (error) {
    console.error("Error fetching diaries:", error);
    res.status(500).json({ message: "Failed to retrieve data" });
  }
};

// READ ONE
exports.getDiaryById = async (req, res) => {
  try {
    const diary = await OfficeDiary.findById(req.params.id);
    if (!diary) return res.status(404).json({ message: "Diary not found" });
    res.status(200).json(diary);
  } catch (error) {
    res.status(500).json({ message: "Failed to get diary" });
  }
};

// UPDATE
exports.updateDiary = async (req, res) => {
  try {
    const { name, particulars } = req.body;
    const existingDiary = await OfficeDiary.findById(req.params.id);

    if (!existingDiary) {
      return res.status(404).json({ message: "Diary not found" });
    }

    // Handle new file upload
    if (req.files && req.files.diaryPdf && req.files.diaryPdf.length > 0) {
      const newPdf = req.files.diaryPdf[0];

      // Remove old file
      const oldPath = path.join(__dirname, "..", existingDiary.pdfPath);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      existingDiary.pdfPath = `/public/Images/${newPdf.filename}`;
    }

    existingDiary.name = name || existingDiary.name;
    existingDiary.particulars = particulars || existingDiary.particulars;

    await existingDiary.save();
    res
      .status(200)
      .json({ message: "Diary updated successfully", data: existingDiary });
  } catch (error) {
    console.error("Error updating diary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE
exports.deleteDiary = async (req, res) => {
  try {
    const diary = await OfficeDiary.findById(req.params.id);
    if (!diary) return res.status(404).json({ message: "Diary not found" });

    // Remove associated file
    const filePath = path.join(__dirname, "..", diary.pdfPath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await diary.deleteOne();
    res
      .status(200)
      .json({ message: "Diary deleted successfully", id: req.params.id });
  } catch (error) {
    console.error("Error deleting diary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
