const mongoose = require("mongoose");

const healthHistorySchema = new mongoose.Schema({
  submissionDate: String,
  diseaseName: String,
  since: String,
  height: String,
  weight: String,
  remark: String,
});

const familyMemberSchema = new mongoose.Schema({
  title: String,
  name: String,
  relation: String,
  dobActual: String,
  dobRecord: String,
  marriageDate: String,
  occupation: String,
  annualIncome: String,
  includeHealth: Boolean,
  healthHistory: healthHistorySchema,
});

const financialInfoSchema = new mongoose.Schema({
  insuranceInvestment: [String],
  loans: [String],
  futurePriorities: [String],
});

const clientFirstFormSchema = new mongoose.Schema({
  prospectId: { type: mongoose.Schema.Types.ObjectId, ref: "ProspectLead" },

  personalDetails: {
    grade: String,
    salutation: String,
    groupName: String,
    groupCode: String,
    residenceAddress: String,
    officeAddress: String,
    landMark: String,
    meetingAddress: String,
    bestTime: String,
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
    adharNumber: Number,
    panCardNumber: Number,
    allocatedCRE: String,
  },
  preferences: {
    hobbies: String,
    nativePlace: String,
    socialLink: String,
    habits: String,
  },
  education: {
    // type: String,
    types: String, // school, college, professional
    schoolName: String,
    schoolSubjects: String,
    collegeName: String,
    collegeCourse: String,
    instituteName: String,
    professionalDegree: String,
  },
  familyMembers: [familyMemberSchema],
  financialInfo: financialInfoSchema,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ClientfirstForm", clientFirstFormSchema);
