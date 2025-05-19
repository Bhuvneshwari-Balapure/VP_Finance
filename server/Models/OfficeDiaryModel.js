const mongoose = require("mongoose");

const officeDiarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  particulars: {
    type: String,
    default: "",
  },
  pdfPath: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("OfficeDiary", officeDiarySchema);
