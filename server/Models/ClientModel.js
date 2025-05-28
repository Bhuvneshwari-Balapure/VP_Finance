const mongoose = require("mongoose");

// Main Customer Schema
const ClientSchema = new mongoose.Schema({
  personalDetails: {
    grade: String,
    salutation: { type: String, enum: ["Mr", "Mrs", "Miss", "Dr"] },
    groupName: String,
    groupCode: String,
    residenceAddress: String,
    officeAddress: String,
    landMark: String,
    meetingAddress: String,
    bestTime: Date,
    occupation: String,
    organisation: String,
    designation: String,
  },
  contactInfo: {
    mobileNo: String,
    whatsappNo: String,
    emailId: String,
    paName: String,
    paMobileNo: String,
  },
  leadInfo: {
    leadOccupation: String,
    leadOccupationType: String,
    leadSource: String,
    leadPerson: String,
    allocatedCRE: String,
  },
  preferences: {
    hobbies: String,
    nativePlace: String,
    socialLink: String,
    habits: String,
  },
  education: {
    type: { type: String, enum: ["school", "college", "professional"] },
    schoolName: String,
    schoolSubjects: String,
    collegeName: String,
    collegeCourse: String,
    instituteName: String,
    professionalDegree: String,
  },
  familyMember: {
    title: String,
    name: String,
    relation: String,
    dobActual: Date,
    dobRecord: Date,
    marriageDate: Date,
    occupation: String,
    annualIncome: Number,
  },
  healthHistory: {
    submissionDate: Date,
    memberName: String,
    relation: String,
    diseaseName: String,
    since: Date,
    height: String,
    weight: String,
    remark: String,
  },
  financialInfo: {
    needs: {
      anyCorrection: String,
      anyUpdation: String,
      financialCalculation: Boolean,
      assesmentOfNeed: Boolean,
      portfolioManagement: Boolean,
      doorStepServices: Boolean,
      purchaseNewProducts: Boolean,
    },
    investments: [String],
    loans: [String],
  },
  proposedPlan: {
    date: Date,
    memberName: String,
    company: String,
    planName: String,
    upload: String,
  },
  customerDoc: {
    submissionDate: Date,
    memberName: String,
    documentNo: String,
    documentName: String,
    upload: String,
  },
  taskDetails: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create the model
const Client = mongoose.model("CLient", ClientSchema);

module.exports = Client;
