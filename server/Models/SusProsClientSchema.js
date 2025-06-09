const mongoose = require("mongoose");

// Reuse sub-documents
const healthHistorySchema = new mongoose.Schema({
  submissionDate: Date,
  diseaseName: String,
  since: Date,
  height: String,
  weight: String,
  remark: String,
});

const familyMemberSchema = new mongoose.Schema({
  title: String,
  name: String,
  relation: String,
  dobActual: Date,
  dobRecord: Date,
  marriageDate: Date,
  occupation: String,
  annualIncome: Number,
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
  date: Date,
  memberName: String,
  financialProduct: String,
  company: String,
  planName: String,
  upload: [String],
});

const customerDocSchema = new mongoose.Schema({
  createdDate: Date,
  memberName: String,
  documentNo: String,
  documentName: String,
  financialProducts: String,
  remark: String,
  upload: [String],
});

const personalDetailsSchema = new mongoose.Schema({
  salutation: String,
  familyHead: String,
  gender: String,
  group: String,
  groupName: String,
  groupCode: String,
  occupation: String,
  organisation: String,
  designation: String,
  annualIncome: Number,
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
  name: String,
  allocatedCRE: String,
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

  education: {
    types: String, // e.g., "MBA", "12th", etc.
    instituteName: String, // e.g., "XYZ Institute"
  },

  leadInfo: {
    leadSource: String,
    leadName: String,
    leadOccupation: String,
    leadOccupationType: String,
    leadPerson: String,

    adharNumber: String,
    panCardNumber: String,
    remark: String,
  },

  preferences: {
    hobbies: String,
    nativePlace: String,
    socialLink: String,
    habits: String,
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
