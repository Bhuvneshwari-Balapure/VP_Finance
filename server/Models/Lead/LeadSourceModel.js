const mongoose = require("mongoose");

const leadSourceSchema = new mongoose.Schema(
  {
    leadName: {
      type: String,
      required: true,
    },
    leadType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const LeadSource = mongoose.model("LeadSource", leadSourceSchema);
module.exports = LeadSource;
