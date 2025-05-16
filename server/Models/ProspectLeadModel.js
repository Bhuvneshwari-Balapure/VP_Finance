// models/prospectLead.model.js

const mongoose = require("mongoose");

const ProspectLeadSchema = new mongoose.Schema(
  {
    group_code: String,
    salutation: String,
    name: String,
    gender: String,
    comp_name: String,
    designation: String,
    annual_income: String,
    grade: String,
    mobile: String,
    contact_no: String,
    whatsapp_no: String,
    pa_name: String,
    pa_relation: String,
    pa_mobile: String,
    email: String,
    dob_record: Date,
    dom: Date,
    resi_addr: String,
    resi_landmark: String,
    resi_pincode: String,
    office_addr: String,
    office_landmark: String,
    office_pincode: String,
    pref_meet_addr: String,
    pref_area: String,
    meeting_time: String,
    city: String,
    aadhar_no: String,
    pan_no: String,
    lead_source: String,
    lead_name: String,
    lead_occupation: String,
    lead_occupation_type: String,
    calling_purpose: String,
    call_name: String,
    remark: String,
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("ProspectLead", ProspectLeadSchema);
