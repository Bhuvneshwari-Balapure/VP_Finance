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
  groupCode: String,
  salutation: String,
  groupName: String,
  gender: String,
  organisation: String,
  designation: String,
  mobileNo: Number,
  contactNo: Number,
  whatsappNo: Number,
  emailId: String,
  paName: String,
  paMobileNo: Number,
  annualIncome: String,
  grade: Number,
  group: String,
  mobile: Number,
  whatsapp: Number,
  pincode: Number,
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
  //
  preferredMeetingAddr: String,
  preferredMeetingArea: String,
  city: String,
  bestTime: String,
  adharNumber: String,
  panCardNumber: String,
  hobbies: String,
  nativePlace: String,
  socialLink: String,
  habits: String,
  leadSource: String,
  leadName: String,
  leadOccupation: String,
  leadOccupationType: String,
  leadPerson: String,
  callingPurpose: String,
  name: String,
  allocatedCRE: String,
  remark: String,

  // -----changes remove Fields----------
  familyHead: String,
  occupation: String,

  // ------------------
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

  education: {
    types: {
      type: String,
      enum: ["school", "college", "professional"],
    },
    // school-specific
    schoolName: String,
    schoolSubjects: String,
    // college-specific
    collegeName: String,
    collegeCourse: String,
    // professional-specific
    instituteName: String,
    professionalDegree: String,
  },

  leadInfo: {
    remark: String,
  },

  preferences: {},

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
