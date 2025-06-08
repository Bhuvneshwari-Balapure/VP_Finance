const mongoose = require("mongoose");

// Reuse sub-documents
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

const needsSchema = new mongoose.Schema({
  financialProducts: String,
  anyCorrection: String,
  anyUpdation: String,
  financialCalculation: Boolean,
  assesmentOfNeed: Boolean,
  portfolioManagement: Boolean,
  doorStepServices: Boolean,
  purchaseNewProducts: Boolean,
});

const financialInfoSchema = new mongoose.Schema({
  insuranceInvestment: [String],
  loans: [String],
  futurePriorities: [String],
});

const proposedPlanSchema = new mongoose.Schema({
  date: String,
  memberName: String,
  company: String,
  planName: String,
  upload: [String],
});

const customerDocSchema = new mongoose.Schema({
  submissionDate: String,
  memberName: String,
  documentNo: String,
  documentName: String,
  financialProducts: String,
  upload: [String],
});

const personalDetailsSchema = new mongoose.Schema({
  name: String,
  salutation: String,
  familyHead: String,
  gender: String,
  group: String,
  groupName: String,
  groupCode: String,
  occupation: String,
  organisation: String,
  designation: String,
  annualIncome: String,
  grade: Number,
  mobile: Number,
  contactNo: Number,
  whatsapp: Number,
  // mobileNo: Number,
  // whatsappNo: Number,
  pincode: Number,
  bestTime: String,
  email: String,
  dob: Date,
  dom: Date,
  preferredAddressType: { type: String, enum: ["resi", "office"] },
  resiAddr: String,
  resiLandmark: String,
  resiPincode: String,
  officeAddr: String,
  officeLandmark: String,
  officePincode: String,
  preferredMeetingAddr: String,
  preferredMeetingArea: String,
  city: String,

  leadSource: String,
  leadName: String,
  leadOccupation: String,
  occupationType: String,
  callingPurpose: String,
});

// Main Lead Schema
const TestShema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["suspect", "prospect", "client"],
    default: "suspect",
  },

  // COMMON FIELDS (used in all 3 stages)
  personalDetails: personalDetailsSchema, // 👈 add this
  // CLIENT FIRST FORM FIELDS
  contactInfo: {
    mobileNo: Number,
    whatsappNo: Number,
    emailId: String,
    paName: String,
    paMobileNo: Number,
  },

  leadInfo: {
    leadSource: String,
    leadName: String,
    leadOccupation: String,
    leadOccupationType: String,
    leadPerson: String,
    adharNumber: String,
    panCardNumber: String,
    allocatedCRE: String,
  },

  preferences: {
    hobbies: String,
    nativePlace: String,
    socialLink: String,
    habits: String,
  },

  education: {
    types: String,
    schoolName: String,
    schoolSubjects: String,
    collegeName: String,
    collegeCourse: String,
    instituteName: String,
    professionalDegree: String,
  },

  familyMembers: [familyMemberSchema],
  newFamilyMember: familyMemberSchema,

  financialInfo: financialInfoSchema,
  needs: needsSchema,
  proposedPlan: proposedPlanSchema,
  customerDoc: [customerDocSchema],

  //   taskDetails: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("testSchema", TestShema);
