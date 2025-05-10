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
      enum: [
        "Digital Platform",
        "Organization Data",
        "Administrator Referral",
        "Direct Approach",
        "Business Associates",
        "Customer Referral",
        "Internship Student",
      ],
      default: "",
    },
  },
  { timestamps: true }
);

const LeadSource = mongoose.model("LeadSource", leadSourceSchema);
module.exports = LeadSource;
