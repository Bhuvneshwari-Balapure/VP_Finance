const mongoose = require("mongoose");

const leadOccupationSchema = new mongoose.Schema(
  {
    leadName: {
      type: String,
      required: true,
    },
    leadOccupation: {
      type: String,
      required: true,
      enum: [
        "Businessman",
        "Private Service",
        "Government Service",
        "Retiered Person",
        "Agreeculturist",
        "Housewife",
        "Student",
        "Not Specified",
      ],
    },
  },
  { timestamps: true }
);

const LeadOccupation = mongoose.model("LeadOccupation", leadOccupationSchema);
module.exports = LeadOccupation;
