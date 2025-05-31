import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeadOccupationDetails } from "../../../redux/feature/LeadOccupation/OccupationThunx";
import { fetchDetails } from "../../../redux/feature/LeadSource/LeadThunx";
import { fetchOccupations } from "../../../redux/feature/OccupationType/OccupationThunx";
import {
  createClientFirstForm,
  fetchByidClientFirstForm,
  updateClientFirstForm,
} from "../../../redux/feature/ClientRedux/ClientThunx";

// const ClientFirstFrom = () => {
const ClientFirstFrom = ({ onDataChange }) => {
  const dispatch = useDispatch();
  const leadOccupation = useSelector((state) => state.leadOccupation.details);
  const occupationType = useSelector((state) => state.OccupationType.details);
  const leadSource = useSelector((state) => state.leadsource.leadsourceDetail);

  const [StoreData, setStoreData] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);

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
      adharNumber: "",
      panCardNumber: "",
      allocatedCRE: "",
    },
    preferences: {
      hobbies: "",
      nativePlace: "",
      socialLink: "",
      habits: "",
    },
    education: {
      types: "",
      schoolName: "",
      schoolSubjects: "",
      collegeName: "",
      collegeCourse: "",
      instituteName: "",
      professionalDegree: "",
    },
    newFamilyMember: {
      title: "",
      name: "",
      relation: "",
      dobActual: "",
      dobRecord: "",
      marriageDate: "",
      occupation: "",
      annualIncome: "",
      includeHealth: false,
      healthHistory: {
        submissionDate: "",
        diseaseName: "",
        since: "",
        height: "",
        weight: "",
        remark: "",
      },
    },
    familyMembers: [],
    financialInfo: {
      insuranceInvestment: [],
      loans: [],
      futurePriorities: [],
    },
  });

  useEffect(() => {
    dispatch(fetchLeadOccupationDetails());
    dispatch(fetchDetails());
    dispatch(fetchOccupations());
  }, [dispatch]);

  const handleCheckboxChange = (e, group) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedGroup = checked
        ? [...prev.financialInfo[group], value]
        : prev.financialInfo[group].filter((v) => v !== value);

      return {
        ...prev,
        financialInfo: {
          ...prev.financialInfo,
          [group]: updatedGroup,
        },
      };
    });
  };

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

  const handleFamilyMemberChange = (e) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split(".");

    if (keys.length === 2) {
      setFormData((prev) => ({
        ...prev,
        newFamilyMember: {
          ...prev.newFamilyMember,
          [keys[1]]: type === "checkbox" ? checked : value,
        },
      }));
    } else if (keys.length === 3) {
      setFormData((prev) => ({
        ...prev,
        newFamilyMember: {
          ...prev.newFamilyMember,
          [keys[1]]: {
            ...prev.newFamilyMember[keys[1]],
            [keys[2]]: value,
          },
        },
      }));
    }
  };

  // add familyMember
  const addFamilyMember = () => {
    setFormData((prev) => ({
      ...prev,
      familyMembers: [...prev.familyMembers, prev.newFamilyMember],
      newFamilyMember: {
        title: "",
        name: "",
        relation: "",
        dobActual: "",
        dobRecord: "",
        marriageDate: "",
        occupation: "",
        annualIncome: "",
        includeHealth: false,
        healthHistory: {
          submissionDate: "",
          diseaseName: "",
          since: "",
          height: "",
          weight: "",
          remark: "",
        },
      },
    }));
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log("Form Data Submitted:", JSON.stringify(formData, null, 2));
  //   onDataChange(formData); // Notify parent component with the updated data
  //   dispatch(createClientFirstForm(formData));
  //   // alert("Form data has been logged to the console.");
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await dispatch(createClientFirstForm(formData)).unwrap();

  //     if (res.status === 200) {
  //       onDataChange(formData); // Pass the form data
  //     } else {
  //       console.error("First form submission failed:", res);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting first form:", error);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await dispatch(createClientFirstForm(formData)).unwrap();

  //     setStoreData(res);
  //     if (res && res._id) {
  //       onDataChange(formData);
  //     } else {
  //       console.error("Form submission failed:", res);
  //       alert("Form submission failed. Please try again.");
  //     }
  //   } catch (err) {
  //     console.error("First form submission failed:", err);
  //     alert("Something went wrong while submitting the first form.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData._id) {
        // UPDATE case
        const updatedRes = await dispatch(
          updateClientFirstForm({ id: formData._id, formData })
        ).unwrap();
        alert("Form updated successfully.");
        setStoreData(updatedRes);
        onDataChange(updatedRes);
      } else {
        // CREATE case
        const res = await dispatch(createClientFirstForm(formData)).unwrap();
        if (res && res._id) {
          setStoreData(res);
          onDataChange(res);
          alert("Form saved successfully.");
        } else {
          console.error("Form submission failed:", res);
          alert("Form submission failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("Form submission/update failed:", err);
      alert("Something went wrong while saving or updating the form.");
    }
  };

  console.log(StoreData);

  useEffect(() => {
    if (StoreData) {
      const init = async () => {
        try {
          const res = await dispatch(
            fetchByidClientFirstForm({ id: StoreData._id })
          ).unwrap();
          setFormData(res);
          setFetchedData(res);

          console.log(res, "asjdhakjshdjkahdkjahdhja");
          if (res) {
            setFormData(res);
          }
        } catch (error) {
          alert("Error fetching client data: " + error.message);
        }
      };
      init();
    }
  }, [StoreData]);

  return (
    <div className="container mt-4">
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
            <Form.Floating>
              <Form.Control
                id="bestTime"
                name="personalDetails.bestTime"
                type="time"
                value={formData.personalDetails.bestTime}
                onChange={handleChange}
                placeholder="Best Time"
              />
              <label htmlFor="bestTime">Best Time</label>
            </Form.Floating>
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
              placeholder="Adhar Number"
              name="leadInfo.adharNumber"
              type="Number"
              value={formData.leadInfo.adharNumber}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="PAN Card Number"
              name="leadInfo.panCardNumber"
              type="Number"
              value={formData.leadInfo.panCardNumber}
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
              name="education.types"
              value={formData.education.types}
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
        {formData.education.types === "school" && (
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
        {formData.education.types === "college" && (
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
        {formData.education.types === "professional" && (
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
        {/* Family Members Section */}
        <h5 className="mt-4">Add Family Details</h5>
        <Row className="mb-3">
          <Col>
            <Form.Control
              placeholder="Mr/Mrs"
              name="newFamilyMember.title"
              value={formData.newFamilyMember?.title}
              onChange={handleFamilyMemberChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Name"
              name="newFamilyMember.name"
              value={formData.newFamilyMember?.name}
              onChange={handleFamilyMemberChange}
            />
          </Col>
          <Col>
            <Form.Select
              name="newFamilyMember.relation"
              value={formData.newFamilyMember?.relation}
              onChange={handleFamilyMemberChange}
            >
              <option value="">Select Relation</option>
              {[
                "Mother",
                "Father",
                "Brother",
                "Sister",
                "Sister-in-law",
                "Brother-in-law",
                "Wife",
                "Husband",
                "Son",
                "Daughter",
                "Other",
              ].map((rel) => (
                <option key={rel} value={rel}>
                  {rel}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Group controlId="dobActual" className="d-flex">
              <Form.Label>DOB (Actual)</Form.Label>
              <Form.Control
                name="newFamilyMember.dobActual"
                type="date"
                value={formData.newFamilyMember?.dobActual}
                onChange={handleFamilyMemberChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="dobRecord" className="d-flex">
              <Form.Label>DOB (Record)</Form.Label>
              <Form.Control
                name="newFamilyMember.dobRecord"
                type="date"
                value={formData.newFamilyMember?.dobRecord}
                onChange={handleFamilyMemberChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="marriageDate" className="d-flex">
              <Form.Label>Marriage Date</Form.Label>
              <Form.Control
                name="newFamilyMember.marriageDate"
                type="date"
                value={formData.newFamilyMember?.marriageDate}
                onChange={handleFamilyMemberChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Control
              placeholder="Occupation"
              name="newFamilyMember.occupation"
              value={formData.newFamilyMember?.occupation}
              onChange={handleFamilyMemberChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Annual Income"
              name="newFamilyMember.annualIncome"
              type="number"
              value={formData.newFamilyMember?.annualIncome}
              onChange={handleFamilyMemberChange}
            />
          </Col>
        </Row>
        <Form.Check
          label="Add Health Details"
          type="checkbox"
          name="newFamilyMember.includeHealth"
          checked={formData.newFamilyMember?.includeHealth}
          onChange={handleFamilyMemberChange}
        />
        {formData.newFamilyMember?.includeHealth && (
          <>
            <h5 className="mt-3">Health History</h5>
            <Row className="mb-2">
              <Col>
                <Form.Group
                  controlId="healthHistorySubmissionDate"
                  className="d-flex"
                >
                  <Form.Label>Submission Date</Form.Label>
                  <Form.Control
                    placeholder="Submission Date"
                    name="newFamilyMember.healthHistory.submissionDate"
                    type="date"
                    value={
                      formData.newFamilyMember?.healthHistory.submissionDate
                    }
                    onChange={handleFamilyMemberChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Control
                  placeholder="Disease Name"
                  name="newFamilyMember.healthHistory.diseaseName"
                  value={formData.newFamilyMember?.healthHistory.diseaseName}
                  onChange={handleFamilyMemberChange}
                />
              </Col>
              <Col>
                <Form.Group controlId="healthHistorySince" className="d-flex">
                  <Form.Label>Since (Date)</Form.Label>
                  <Form.Control
                    name="newFamilyMember.healthHistory.since"
                    type="date"
                    value={formData.newFamilyMember?.healthHistory.since}
                    onChange={handleFamilyMemberChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Form.Control
                  placeholder="Height"
                  name="newFamilyMember.healthHistory.height"
                  value={formData.newFamilyMember?.healthHistory.height}
                  onChange={handleFamilyMemberChange}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Weight"
                  name="newFamilyMember.healthHistory.weight"
                  value={formData.newFamilyMember?.healthHistory.weight}
                  onChange={handleFamilyMemberChange}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Remark"
                  name="newFamilyMember.healthHistory.remark"
                  value={formData.newFamilyMember?.healthHistory.remark}
                  onChange={handleFamilyMemberChange}
                />
              </Col>
            </Row>
          </>
        )}
        <div className="w-100 d-flex justify-content-end">
          <Button variant="primary" className="mt-3" onClick={addFamilyMember}>
            Add Family Member
          </Button>
        </div>
        {/* Display added family members */}
        {formData.familyMembers.length > 0 && (
          <div className="mt-4">
            <h5>Added Family Members</h5>
            <ul>
              {formData.familyMembers.map((member, index) => (
                <li key={index}>
                  {member.title} {member.name} ({member.relation})
                  {member.includeHealth && (
                    <span> - Health details included</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}{" "}
        &nbsp; &nbsp;
        {/* Financial Details */}
        <h5 className="mt-4">Financial Details</h5>
        <div className="row">
          {/* Insurance & Investment */}
          <div className="col-md-4">
            <h6 className="text-warning fw-bold">Insurance & Investment</h6>
            {[
              "LIC",
              "Pvt. Life Insurance",
              "Health Insurance",
              "Vehicle Insurance",
              "Other Insurance",
              "Bank Deposit",
              "Postal Deposit",
              "Mutual Fund",
              "Stock Market",
              "Property",
            ].map((item) => (
              <Form.Check
                key={item}
                type="checkbox"
                label={item}
                value={item}
                checked={formData.financialInfo.insuranceInvestment.includes(
                  item
                )}
                onChange={(e) => handleCheckboxChange(e, "insuranceInvestment")}
              />
            ))}
          </div>

          {/* Loan & Liabilities */}
          <div className="col-md-4">
            <h6 className="text-warning fw-bold">Loan & Liabilities</h6>
            {[
              "Home Loan",
              "Vehicle Loan",
              "Business Loan",
              "Personal Loan",
              "Monthly Expenses",
            ].map((item) => (
              <Form.Check
                key={item}
                type="checkbox"
                label={item}
                value={item}
                checked={formData.financialInfo.loans.includes(item)}
                onChange={(e) => handleCheckboxChange(e, "loans")}
              />
            ))}
          </div>

          {/* Future Priority */}
          <div className="col-md-4">
            <h6 className="text-warning fw-bold">Future Priority</h6>
            {[
              "Life Insurance",
              "Health Insurance",
              "Child Higher Education",
              "Child Professional Education",
              "Child Marriage",
              "Purchase House",
              "Purchase Car",
              "Retirement Fund",
              "Business Expansion",
              "World Tour",
            ].map((item) => (
              <Form.Check
                key={item}
                type="checkbox"
                label={item}
                value={item}
                checked={formData.financialInfo.futurePriorities.includes(item)}
                onChange={(e) => handleCheckboxChange(e, "futurePriorities")}
              />
            ))}
          </div>
        </div>
        &nbsp; &nbsp;
        {/* Submit upper details only */}
        <div className="w-100 d-flex justify-content-center">
          <Button
            className="mt-4"
            type="submit"
            style={{
              width: "200px",
              backgroundColor: "#0d6efd",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            {formData._id ? "Update" : "Save"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ClientFirstFrom;
