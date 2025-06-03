// const mongoose = require("mongoose");

// // Main Customer Schema
// const ClientSchema = new mongoose.Schema({
//   personalDetails: {
//     grade: String,
//     salutation: { type: String, enum: ["Mr", "Mrs", "Miss", "Dr"] },
//     groupName: String,
//     groupCode: String,
//     residenceAddress: String,
//     officeAddress: String,
//     landMark: String,
//     meetingAddress: String,
//     bestTime: Date,
//     occupation: String,
//     organisation: String,
//     designation: String,
//   },
//   contactInfo: {
//     mobileNo: String,
//     whatsappNo: String,
//     emailId: String,
//     paName: String,
//     paMobileNo: String,
//   },
//   leadInfo: {
//     leadOccupation: String,
//     leadOccupationType: String,
//     leadSource: String,
//     leadPerson: String,
//     allocatedCRE: String,
//   },
//   preferences: {
//     hobbies: String,
//     nativePlace: String,
//     socialLink: String,
//     habits: String,
//   },
//   education: {
//     type: { type: String, enum: ["school", "college", "professional"] },
//     schoolName: String,
//     schoolSubjects: String,
//     collegeName: String,
//     collegeCourse: String,
//     instituteName: String,
//     professionalDegree: String,
//   },
//   familyMember: {
//     title: String,
//     name: String,
//     relation: String,
//     dobActual: Date,
//     dobRecord: Date,
//     marriageDate: Date,
//     occupation: String,
//     annualIncome: Number,
//   },
//   healthHistory: {
//     submissionDate: Date,
//     memberName: String,
//     relation: String,
//     diseaseName: String,
//     since: Date,
//     height: String,
//     weight: String,
//     remark: String,
//   },
//   financialInfo: {
//     needs: {
//       anyCorrection: String,
//       anyUpdation: String,
//       financialCalculation: Boolean,
//       assesmentOfNeed: Boolean,
//       portfolioManagement: Boolean,
//       doorStepServices: Boolean,
//       purchaseNewProducts: Boolean,
//     },
//     investments: [String],
//     loans: [String],
//   },
//   proposedPlan: {
//     date: Date,
//     memberName: String,
//     company: String,
//     planName: String,
//     upload: String,
//   },
//   customerDoc: {
//     submissionDate: Date,
//     memberName: String,
//     documentNo: String,
//     documentName: String,
//     upload: String,
//   },
//   taskDetails: String,
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// // Create the model
// const Client = mongoose.model("CLient", ClientSchema);

// module.exports = Client;

// const mongoose = require("mongoose");

// const needsSchema = new mongoose.Schema({
//   anyCorrection: String,
//   anyUpdation: String,
//   financialCalculation: Boolean,
//   assesmentOfNeed: Boolean,
//   portfolioManagement: Boolean,
//   doorStepServices: Boolean,
//   purchaseNewProducts: Boolean,
// });

// const proposedPlanSchema = new mongoose.Schema({
//   date: String,
//   memberName: String,
//   company: String,
//   planName: String,
//   upload: String, // file path or URL
// });

// const addClientFormSchema = new mongoose.Schema({
//   clientFirstFormId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "ClientfirstForm",
//     // required: true,
//   },
//   financialInfo: {
//     needs: needsSchema,
//     insuranceInvestment: [String],
//     loans: [String],
//     futurePriorities: [String],
//   },
//   proposedPlan: proposedPlanSchema,
//   customerDoc: customerDocSchema,
//   taskDetails: String,
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("AddClientForm", addClientFormSchema);
const mongoose = require("mongoose");

// Personal Details Schema
const personalDetailsSchema = new mongoose.Schema({
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
});

// Proposed Financial Plan Schema
const proposedPlanSchema = new mongoose.Schema({
  date: String,
  memberName: String,
  company: String,
  planName: String,
  upload: String, // file path or URL
});

// Customer Document Schema
const customerDocSchema = new mongoose.Schema({
  submissionDate: String,
  memberName: String,
  documentNo: String,
  documentName: String,
  financialProducts: String,
  upload: String,
});

// Contact Info Schema
const contactInfoSchema = new mongoose.Schema({
  mobileNo: String,
  whatsappNo: String,
  emailId: String,
  paName: String,
  paMobileNo: String,
});
// Needs Schema
const needsSchema = new mongoose.Schema({
  anyCorrection: String,
  anyUpdation: String,
  financialCalculation: Boolean,
  assesmentOfNeed: Boolean,
  portfolioManagement: Boolean,
  doorStepServices: Boolean,
  purchaseNewProducts: Boolean,
});

// Lead Info Schema
const leadInfoSchema = new mongoose.Schema({
  leadOccupation: String,
  leadOccupationType: String,
  leadSource: String,
  leadPerson: String,
  adharNumber: String,
  panCardNumber: String,
  allocatedCRE: String,
});

// Preferences Schema
const preferencesSchema = new mongoose.Schema({
  hobbies: String,
  nativePlace: String,
  socialLink: String,
  habits: String,
});
// Education Schema
const educationSchema = new mongoose.Schema({
  type: String,
  schoolName: String,
  schoolSubjects: String,
  collegeName: String,
  collegeCourse: String,
  instituteName: String,
  professionalDegree: String,
});

// Health History Schema
const healthHistorySchema = new mongoose.Schema({
  submissionDate: String,
  diseaseName: String,
  since: String,
  height: String,
  weight: String,
  remark: String,
});

// Family Member Schema
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

// Main AddClientForm Schema
const addClientFormSchema = new mongoose.Schema({
  clientFirstFormId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClientfirstForm",
  },
  personalDetails: personalDetailsSchema,
  contactInfo: contactInfoSchema,
  leadInfo: leadInfoSchema,
  preferences: preferencesSchema,
  education: educationSchema,
  newFamilyMember: familyMemberSchema,
  familyMembers: [familyMemberSchema],
  financialInfo: {
    needs: needsSchema,
    insuranceInvestment: [String],
    loans: [String],
    futurePriorities: [String],
  },
  proposedPlan: proposedPlanSchema,
  customerDoc: [customerDocSchema],
  taskDetails: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AddClientForm", addClientFormSchema);
