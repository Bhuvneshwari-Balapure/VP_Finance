// models/LeadSchema.js (new file for schema)

const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema(
  {
    salutation: { type: String },
    familyHead: { type: String },
    gender: { type: String },
    organisation: { type: String },
    designation: { type: String },
    annualIncome: { type: String },
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
    leadSource: { type: String },
    leadName: { type: String },
    leadOccupation: { type: String },
    occupationType: { type: String },
    callingPurpose: { type: String },
    name: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = LeadSchema;
