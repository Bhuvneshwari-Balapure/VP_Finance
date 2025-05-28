import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeadOccupationDetails } from "../../redux/feature/LeadOccupation/OccupationThunx";
import { fetchDetails } from "../../redux/feature/LeadSource/LeadThunx";
import { fetchOccupations } from "../../redux/feature/OccupationType/OccupationThunx";

function AddClient() {
  const [formData, setFormData] = useState({
    personalDetails: {
      grade: "",
      salutation: "",
      groupName: "",
      groupCode: "",
      residenceAddress: "",
      officeAddress: "",
      landMark: "",
      meetingAddress: "",
      bestTime: "",
      occupation: "",
      organisation: "",
      designation: "",
    },
    contactInfo: {
      mobileNo: "",
      whatsappNo: "",
      emailId: "",
      paName: "",
      paMobileNo: "",
    },
    leadInfo: {
      leadOccupation: "",
      leadOccupationType: "",
      leadSource: "",
      leadPerson: "",
      allocatedCRE: "",
    },
    preferences: {
      hobbies: "",
      nativePlace: "",
      socialLink: "",
      habits: "",
    },
    education: {
      type: "",
      schoolName: "",
      schoolSubjects: "",
      collegeName: "",
      collegeCourse: "",
      instituteName: "",
      professionalDegree: "",
    },
    familyMember: {
      title: "",
      name: "",
      relation: "",
      dobActual: "",
      dobRecord: "",
      marriageDate: "",
      occupation: "",
      annualIncome: "",
    },
    healthHistory: {
      submissionDate: "",
      memberName: "",
      relation: "",
      diseaseName: "",
      since: "",
      height: "",
      weight: "",
      remark: "",
    },
    financialInfo: {
      needs: {
        anyCorrection: "",
        anyUpdation: "",
        financialCalculation: false,
        assesmentOfNeed: false,
        portfolioManagement: false,
        doorStepServices: false,
        purchaseNewProducts: false,
      },
      investments: [],
      loans: [],
    },
    proposedPlan: {
      date: "",
      memberName: "",
      company: "",
      planName: "",
      upload: null,
    },
    customerDoc: {
      submissionDate: "",
      memberName: "",
      documentNo: "",
      documentName: "",
      upload: null,
      subject: "",
    },
    taskDetails: "",
  });

  const dispatch = useDispatch();
  const leadOccupation = useSelector((state) => state.leadOccupation.details);
  const occupationType = useSelector((state) => state.OccupationType.details);
  const leadSource = useSelector((state) => state.leadsource.leadsourceDetail);

  useEffect(() => {
    dispatch(fetchLeadOccupationDetails());
    dispatch(fetchDetails());
    dispatch(fetchOccupations());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]:
            type === "checkbox" ? checked : type === "file" ? files[0] : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "file" ? files[0] : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", JSON.stringify(formData, null, 2));
    alert("Form data has been logged to the console.");
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4">Client Registration Form</h2>
      <Form onSubmit={handleSubmit}>
        {/* Personal Details */}
        <h5 className="mt-4">Personal Details</h5>
        <Row className="mb-2">
          <Col>
            <Form.Control
              name="personalDetails.grade"
              placeholder="Grade"
              type="text"
              value={formData.personalDetails.grade}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Select
              name="personalDetails.salutation"
              value={formData.personalDetails.salutation}
              onChange={handleChange}
            >
              <option value="">Select Salutation</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="Dr">Dr</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              name="personalDetails.groupName"
              type="text"
              placeholder="Group Name"
              value={formData.personalDetails.groupName}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              name="personalDetails.groupCode"
              type="text"
              placeholder="Group Code"
              value={formData.personalDetails.groupCode}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Form.Control
              placeholder="Residence Address"
              type="text"
              name="personalDetails.residenceAddress"
              value={formData.personalDetails.residenceAddress}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              name="personalDetails.officeAddress"
              type="text"
              placeholder="Office Address"
              value={formData.personalDetails.officeAddress}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Form.Control
              type="text"
              placeholder="Land Mark"
              name="personalDetails.landMark"
              value={formData.personalDetails.landMark}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Meeting Address"
              name="personalDetails.meetingAddress"
              type="text"
              value={formData.personalDetails.meetingAddress}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Form.Control
              placeholder="Best Time"
              name="personalDetails.bestTime"
              type="date"
              value={formData.personalDetails.bestTime}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Occupation"
              name="personalDetails.occupation"
              type="text"
              value={formData.personalDetails.occupation}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Organisation"
              name="personalDetails.organisation"
              type="text"
              value={formData.personalDetails.organisation}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Form.Control
              placeholder="Designation"
              name="personalDetails.designation"
              type="text"
              value={formData.personalDetails.designation}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Mobile No"
              name="contactInfo.mobileNo"
              type="number"
              value={formData.contactInfo.mobileNo}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Whatsapp No"
              name="contactInfo.whatsappNo"
              type="number"
              value={formData.contactInfo.whatsappNo}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Form.Control
              placeholder="Email ID"
              type="email"
              name="contactInfo.emailId"
              value={formData.contactInfo.emailId}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="PA Name"
              name="contactInfo.paName"
              value={formData.contactInfo.paName}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="PA Mobile No"
              name="contactInfo.paMobileNo"
              type="number"
              value={formData.contactInfo.paMobileNo}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Form.Select
              name="leadInfo.leadOccupation"
              onChange={handleChange}
              value={formData.leadInfo.leadOccupation}
            >
              <option value="">Select Lead Occupation</option>
              {leadOccupation?.map((item, index) => (
                <option key={index} value={item.occupationName}>
                  {item.occupationName || "-"}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col>
            <Form.Select
              name="leadInfo.leadOccupationType"
              onChange={handleChange}
              value={formData.leadInfo.leadOccupationType}
            >
              <option value="">Select Occupation Type</option>
              {occupationType?.map((item, index) => (
                <option key={index} value={item.occupationType}>
                  {item.occupationType || "-"}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col>
            <Form.Select
              name="leadInfo.leadSource"
              onChange={handleChange}
              value={formData.leadInfo.leadSource}
            >
              <option value="">Select Lead Source</option>
              {leadSource?.map((item, index) => (
                <option key={index} value={item.sourceName}>
                  {item.sourceName || "-"}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Form.Control
              placeholder="Lead Person"
              name="leadInfo.leadPerson"
              type="text"
              value={formData.leadInfo.leadPerson}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Allocated CRE"
              name="leadInfo.allocatedCRE"
              type="text"
              value={formData.leadInfo.allocatedCRE}
              onChange={handleChange}
            />
          </Col>
        </Row>
        &nbsp; &nbsp;
        {/* Family Head Relationship Data */}
        <h5 className="mt-4">Family Head Relationship Data</h5>
        &nbsp; &nbsp;
        <Row className="mb-2">
          <Col>
            <Form.Control
              placeholder="Hobbies"
              name="preferences.hobbies"
              type="text"
              value={formData.preferences.hobbies}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Native Place"
              name="preferences.nativePlace"
              type="text"
              value={formData.preferences.nativePlace}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Social Link"
              name="preferences.socialLink"
              type="text"
              value={formData.preferences.socialLink}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Habits"
              name="preferences.habits"
              type="text"
              value={formData.preferences.habits}
              onChange={handleChange}
            />
          </Col>
        </Row>
        &nbsp; &nbsp;
        {/* Education Section */}
        <h6 className="mt-3">Education</h6>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Select
              name="education.type"
              value={formData.education.type}
              onChange={handleChange}
            >
              <option value="">Select Education Type</option>
              <option value="school">School</option>
              <option value="college">College</option>
              <option value="professional">Professional Degree</option>
            </Form.Select>
          </Col>
        </Row>
        &nbsp; &nbsp;
        {formData.education.type === "school" && (
          <Row className="mb-2">
            <Col>
              <Form.Control
                name="education.schoolName"
                type="text"
                placeholder="School Name"
                value={formData.education.schoolName}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Control
                name="education.schoolSubjects"
                type="text"
                placeholder="Subjects Pursuing in School"
                value={formData.education.schoolSubjects}
                onChange={handleChange}
              />
            </Col>
          </Row>
        )}
        {formData.education.type === "college" && (
          <Row className="mb-2">
            <Col>
              <Form.Control
                name="education.collegeName"
                type="text"
                placeholder="College Name"
                value={formData.education.collegeName}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Control
                name="education.collegeCourse"
                type="text"
                placeholder="Course or Degree Name"
                value={formData.education.collegeCourse}
                onChange={handleChange}
              />
            </Col>
          </Row>
        )}
        {formData.education.type === "professional" && (
          <Row className="mb-2">
            <Col>
              <Form.Control
                name="education.instituteName"
                type="text"
                placeholder="Institute Name"
                value={formData.education.instituteName}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Control
                name="education.professionalDegree"
                type="text"
                placeholder="Degree Name"
                value={formData.education.professionalDegree}
                onChange={handleChange}
              />
            </Col>
          </Row>
        )}
        &nbsp; &nbsp;
        {/* Family Members */}
        <h5 className="mt-4">Family Member Details</h5>
        <Row className="mb-3">
          <Col>
            <Form.Control
              placeholder="Mr/Mrs"
              name="familyMember.title"
              type="text"
              value={formData.familyMember.title}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Name"
              name="familyMember.name"
              type="text"
              value={formData.familyMember.name}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Relation"
              name="familyMember.relation"
              type="text"
              value={formData.familyMember.relation}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="DOB (Actual)"
              name="familyMember.dobActual"
              type="date"
              value={formData.familyMember.dobActual}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Control
              placeholder="DOB (Record)"
              name="familyMember.dobRecord"
              type="date"
              value={formData.familyMember.dobRecord}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Marriage Date"
              name="familyMember.marriageDate"
              type="date"
              value={formData.familyMember.marriageDate}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Occupation"
              name="familyMember.occupation"
              type="text"
              value={formData.familyMember.occupation}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Annual Income"
              name="familyMember.annualIncome"
              type="number"
              value={formData.familyMember.annualIncome}
              onChange={handleChange}
            />
          </Col>
        </Row>
        &nbsp; &nbsp;
        {/* Health History */}
        <h5 className="mt-4">Health History</h5>
        <Row className="mb-3">
          <Col>
            <Form.Control
              placeholder="Submission Date"
              name="healthHistory.submissionDate"
              type="date"
              value={formData.healthHistory.submissionDate}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Member Name"
              name="healthHistory.memberName"
              type="text"
              value={formData.healthHistory.memberName}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Relation"
              name="healthHistory.relation"
              type="text"
              value={formData.healthHistory.relation}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Form.Control
              placeholder="Disease Name"
              name="healthHistory.diseaseName"
              type="text"
              value={formData.healthHistory.diseaseName}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Since"
              name="healthHistory.since"
              type="date"
              value={formData.healthHistory.since}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Height"
              name="healthHistory.height"
              type="text"
              value={formData.healthHistory.height}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Weight"
              name="healthHistory.weight"
              type="text"
              value={formData.healthHistory.weight}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Remark"
              name="healthHistory.remark"
              type="text"
              value={formData.healthHistory.remark}
              onChange={handleChange}
            />
          </Col>
        </Row>
        &nbsp; &nbsp;
        {/* Financial Details */}
        <h5 className="mt-4">Financial Details</h5>
        <div className="row">
          {/* Investment Section */}
          <div className="col-md-6">
            <h6 className="text-warning fw-bold">Investment</h6>
            {[
              "Deposits",
              "Mutual Fund",
              "Stock Market",
              "Gold",
              "Property",
              "Other Investment",
              "Child Higher Education",
              "Child Professional Education",
              "Child Marriage",
              "Property Investment",
            ].map((item) => (
              <Form.Check
                key={item}
                type="checkbox"
                label={item}
                value={item}
                checked={formData.financialInfo.investments.includes(item)}
                onChange={(e) => handleChange(e, "investments")}
              />
            ))}
          </div>
          &nbsp; &nbsp;
          {/* Loan & Liability Section */}
          <div className="col-md-6">
            <h6 className="text-warning fw-bold">Loan & Liability</h6>
            {[
              "Business Loan",
              "Home Loan",
              "Vehicle Loan",
              "Personal Loan",
              "Gold Loan",
              "Other Loan",
              "Purchase House",
              "Purchase Car",
              "Business Fund Creation",
              "Business Expansion",
            ].map((item) => (
              <Form.Check
                key={item}
                type="checkbox"
                label={item}
                value={item}
                checked={formData.financialInfo.loans.includes(item)}
                onChange={(e) => handleChange(e, "loans")}
              />
            ))}
          </div>
        </div>
        &nbsp; &nbsp;
        {/* Needs */}
        <h5 className="mt-4">Have You Any Need</h5>
        <Row className="mb-3">
          <Col>
            <Form.Control
              placeholder="Any Correction"
              name="financialInfo.needs.anyCorrection"
              value={formData.financialInfo.needs.anyCorrection}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Any Updation"
              name="financialInfo.needs.anyUpdation"
              value={formData.financialInfo.needs.anyUpdation}
              onChange={handleChange}
            />
          </Col>
        </Row>
        &nbsp; &nbsp;
        <Row className="mb-2">
          <Col md={12}>
            <Form.Check
              inline
              type="checkbox"
              label="Financial Calculation"
              name="financialInfo.needs.financialCalculation"
              checked={formData.financialInfo.needs.financialCalculation}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Assessment of Need"
              name="financialInfo.needs.assesmentOfNeed"
              checked={formData.financialInfo.needs.assesmentOfNeed}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Portfolio Management"
              name="financialInfo.needs.portfolioManagement"
              checked={formData.financialInfo.needs.portfolioManagement}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Door Step Services"
              name="financialInfo.needs.doorStepServices"
              checked={formData.financialInfo.needs.doorStepServices}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Purchase New Products"
              name="financialInfo.needs.purchaseNewProducts"
              checked={formData.financialInfo.needs.purchaseNewProducts}
              onChange={handleChange}
            />
          </Col>
        </Row>
        &nbsp; &nbsp;
        {/* Proposed Financial Plan */}
        <h5 className="mt-4">Proposed Financial Plan</h5>
        <Row>
          <Col>
            <Form.Control
              placeholder="Date"
              name="proposedPlan.date"
              type="date"
              value={formData.proposedPlan.date}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Member Name"
              name="proposedPlan.memberName"
              type="text"
              value={formData.proposedPlan.memberName}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Financial Company"
              name="proposedPlan.company"
              type="text"
              value={formData.proposedPlan.company}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Plan Name"
              name="proposedPlan.planName"
              type="text"
              value={formData.proposedPlan.planName}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Upload"
              type="file"
              name="proposedPlan.upload"
              onChange={handleChange}
            />
          </Col>
        </Row>
        &nbsp; &nbsp;
        {/* Customer Documents */}
        <h5 className="mt-4">Customer Documents</h5>
        <Row className="mb-3">
          <Col>
            <Form.Control
              placeholder="Submission Date"
              name="customerDoc.submissionDate"
              type="date"
              value={formData.customerDoc.submissionDate}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Add Subject"
              name="subject"
              type="text"
              value={formData.subject || ""}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Member Name"
              name="customerDoc.memberName"
              type="text"
              value={formData.customerDoc.memberName}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Form.Control
              placeholder="Document No"
              name="customerDoc.documentNo"
              type="text"
              value={formData.customerDoc.documentNo}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Document Name"
              name="customerDoc.documentName"
              type="text"
              value={formData.customerDoc.documentName}
              onChange={handleChange}
            />
          </Col>
          &nbsp; &nbsp;
          <Col>
            <Form.Control
              placeholder="Upload"
              type="file"
              name="customerDoc.upload"
              onChange={handleChange}
            />
          </Col>
        </Row>
        &nbsp; &nbsp;
        {/* Task Details */}
        <h5 className="mt-4">Task Details</h5>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Task Details"
          name="taskDetails"
          value={formData.taskDetails}
          onChange={handleChange}
        />
        &nbsp; &nbsp;
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default AddClient;
