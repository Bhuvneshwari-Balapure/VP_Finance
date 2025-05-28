const mongoose = require("mongoose");

const ProspectLeadSchema = new mongoose.Schema(
  {
    salutation: { type: String },
    familyHead: { type: String },
    gender: { type: String },
    organisation: { type: String },
    designation: { type: String },
    annualIncome: { type: String }, // storing as string since form uses select with string values
    grade: { type: Number },
    mobile: { type: Number },
    contactNo: { type: Number },
    whatsapp: { type: Number },
    email: { type: String },
    dob: { type: Date },
    dom: { type: Date },
    preferredAddressType: { type: String, enum: ["resi", "office"] },
    resiAddr: { type: String },
    resiLandmark: { type: String },
    resiPincode: { type: String },
    officeAddr: { type: String },
    officeLandmark: { type: String },
    officePincode: { type: String },
    preferredMeetingAddr: { type: String },
    preferredMeetingArea: { type: String },
    city: { type: String },
    leadSource: { type: String }, // added leadSource
    leadName: { type: String }, // added leadName
    leadOccupation: { type: String }, // added leadOccupation
    occupationType: { type: String }, // calling purpose / occupation type
    callingPurpose: { type: String }, // added callingPurpose (you might want to map this correctly)
    name: { type: String },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("ProspectLead", ProspectLeadSchema);
