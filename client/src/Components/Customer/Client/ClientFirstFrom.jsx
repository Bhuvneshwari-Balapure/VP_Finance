import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails } from "../../../redux/feature/LeadSource/LeadThunx";
import { fetchOccupations } from "../../../redux/feature/OccupationType/OccupationThunx";
import { fetchLeadOccupationDetails } from "../../../redux/feature/LeadOccupation/OccupationThunx";
import {
  createClientFirstForm,
  fetchByidClientFirstForm,
  updateClientFirstForm,
} from "../../../redux/feature/ClientRedux/ClientThunx";
import { FaPlus } from "react-icons/fa";

// const ClientFirstFrom = () => {
const ClientFirstFrom = ({ isEdit, onDataChange }) => {
  const dispatch = useDispatch();
  const [StoreData, setStoreData] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const [formData, setFormData] = useState({
    personalDetails: {
      groupCode: "",
      salutation: "",
      // familyHead: "",
      groupName: "",
      gender: "",
      organisation: "",
      designation: "",
      mobileNo: "",
      contactNo: "",
      whatsappNo: "",
      emailId: "",
      paName: "",
      paMobileNo: "",
      annualIncome: 0,
      grade: "",

      // Address Info
      preferredAddressType: "resi",
      resiAddr: "",
      resiLandmark: "",
      resiPincode: "",
      officeAddr: "",
      officeLandmark: "",
      officePincode: "",
      //
      preferredMeetingAddr: "",
      preferredMeetingArea: "",
      city: "",
      bestTime: "",
      adharNumber: "",
      panCardNumber: "",
      hobbies: "",
      nativePlace: "",
      socialLink: "",
      habits: "",
      leadSource: "",
      leadName: "",
      leadOccupation: "",
      leadOccupationType: "",
      leadPerson: "",
      callingPurpose: "",
      name: "",
      allocatedCRE: "",
      remark: "",
    },

    education: {
      types: "", // "school" | "college" | "professional"
      // ↓ conditional fields (kept empty by default)
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
    familyMembers: [
      {
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
    ],
    financialInfo: {
      insuranceInvestment: [],
      loans: [],
      futurePriorities: [],
    },
    needs: {
      financialProducts: "",
      anyCorrection: "",
      anyUpdation: "",
      financialCalculation: false,
      assesmentOfNeed: false,
      portfolioManagement: false,
      doorStepServices: false,
      purchaseNewProducts: false,
    },
  });
  console.log(isEdit, "lfkjdslkfd");
  useEffect(() => {
    if (isEdit && Object.keys(isEdit).length) {
      setFormData(isEdit); // set form fields from edit data
    }
  }, [isEdit]);
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
  // ✅ NEW — keeps meeting address + area separate
  const handleRadioChange = (e) => {
    const value = e.target.value; // "resi" or "office"

    setFormData((prev) => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        preferredAddressType: value, // ✔ just set the radio choice
        // preferredMeetingAddr, preferredMeetingArea stay as-is
      },
    }));
  };

  // const handleChange = (e) => {
  //   const { name, value, type, checked, files } = e.target;
  //   if (name.includes(".")) {
  //     const [section, field] = name.split(".");
  //     setFormData((prev) => ({
  //       ...prev,
  //       [section]: {
  //         ...prev[section],
  //         [field]:
  //           type === "checkbox" ? checked : type === "file" ? files[0] : value,
  //       },
  //     }));
  //   } else {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: type === "file" ? files[0] : value,
  //     }));
  //   }
  // };
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name.includes(".")) {
      const [section, field] = name.split(".");

      setFormData((prev) => {
        const newVal =
          type === "checkbox" ? checked : type === "file" ? files[0] : value;

        const updatedSection = { ...prev[section], [field]: newVal };

        // ── annualIncome → grade mapping ────────────────────────────────
        if (section === "personalDetails" && field === "annualIncome") {
          let grade = "";
          if (newVal === "25 lakh to 1 Cr.") grade = 1;
          else if (newVal === "5 to 25 lakh") grade = 2;
          else if (newVal === "2.5 to 5 lakh") grade = 3;

          updatedSection.grade = grade;
        }
        // ────────────────────────────────────────────────────────────────

        return { ...prev, [section]: updatedSection };
      });
    } else {
      // non-nested fields
      setFormData((prev) => ({
        ...prev,
        [name]: type === "file" ? files[0] : value,
      }));
    }
  };

  const handleFamilyMemberChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split(".");

    setFormData((prev) => {
      const members = [...prev.familyMembers];

      if (keys.length === 1) {
        members[index][keys[0]] = type === "checkbox" ? checked : value;
      } else if (keys.length === 2) {
        members[index][keys[0]][keys[1]] = value;
      }

      return {
        ...prev,
        familyMembers: members,
      };
    });
  };

  useEffect(() => {
    if (StoreData) {
      const init = async () => {
        try {
          const res = await dispatch(
            fetchByidClientFirstForm({ id: StoreData._id })
          ).unwrap();
          setFormData(res);
          setFetchedData(res);
          console.log(fetchedData);

          // console.log(res, "asjdhakjshdjkahdkjahdhja");
          if (res) {
            setFormData(res);
          }
        } catch (error) {
          console.log(error, "Error in client first form");
          // alert("Error fetching client data: " + error.message);
        }
      };
      init();
    }
  }, [StoreData]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData?._id) {
        // UPDATE
        const updatedRes = await dispatch(
          updateClientFirstForm({ id: formData?._id, formData })
        ).unwrap();
        alert("Form updated successfully.");
        setStoreData(updatedRes);
        // setIsUpdated(true); // ✅ hide button after update
        onDataChange(updatedRes);
      } else {
        // CREATE
        const res = await dispatch(createClientFirstForm(formData)).unwrap();
        if (res && res._id) {
          alert("Form saved successfully.");
          setStoreData(res);
          setIsUpdated(false);
          onDataChange(res);
        } else {
          alert("Form submission failed. Please try again.");
        }
      }
    } catch (err) {
      alert("Something went wrong while saving or updating the form.");
      console.log(err, "error in first form");
    }
  };
  const removeFamilyMember = (index) => {
    setFormData((prev) => {
      const updated = [...prev.familyMembers];
      updated.splice(index, 1);
      return { ...prev, familyMembers: updated };
    });
  };

  // --------------------------lead cource and lead occupation -----------------------------
  const leadOccupations = useSelector((state) => state.leadOccupation.details);

  const leadSources = useSelector((state) => state.leadsource.leadsourceDetail);

  useEffect(() => {
    const init = async () => {
      try {
        await dispatch(fetchLeadOccupationDetails()).unwrap();
        await dispatch(fetchDetails()).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, []);

  return (
    <div className="container mt-4">
      <Form onSubmit={handleSubmit}>
        <h5 className="mt-4">Personal Details</h5>
        <Row className="mb-2">
          <Col xs={6} sm={3} md={2}>
            <Form.Group controlId="groupCode">
              <Form.Label>Group Code</Form.Label>
              <Form.Control
                name="personalDetails.groupCode"
                type="text"
                placeholder="Group Code"
                value={formData?.personalDetails?.groupCode}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col xs={6} sm={3} md={2}>
            <Form.Group controlId="salutation">
              <Form.Label>Salutation</Form.Label>
              <Form.Select
                name="personalDetails.salutation"
                value={formData?.personalDetails?.salutation}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Ms.</option>
                <option>Mast.</option>
                <option>Shri.</option>
                <option>Smt.</option>
                <option>Kum.</option>
                <option>Kr.</option>
                <option>Dr.</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={5}>
            <Form.Group controlId="groupName">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                name="personalDetails.groupName"
                type="text"
                placeholder="Group Name"
                value={formData?.personalDetails?.groupName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col xs={6} sm={3} md={3}>
            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="personalDetails.gender"
                value={formData?.personalDetails?.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        {/* , organisation, Designation */}
        <Row className="mb-2">
          <Col xs={6} sm={6} md={4}>
            <Form.Group controlId="organisation">
              <Form.Label>Organisation</Form.Label>
              <Form.Control
                name="personalDetails.organisation"
                type="text"
                placeholder="Organisation"
                value={formData?.personalDetails?.organisation}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col xs={6} sm={6} md={4}>
            <Form.Group controlId="designation">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                name="personalDetails.designation"
                type="text"
                placeholder="Designation"
                value={formData?.personalDetails?.designation}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        {/* Mobile, Contact No, Whatsapp, Email */}
        <Row className="mb-2">
          <Col xs={12} sm={6} md={2}>
            <Form.Group controlId="mobileNo">
              <Form.Label>Mobile No.</Form.Label>
              <Form.Control
                name="personalDetails.mobileNo"
                type="text"
                placeholder="Mobile No."
                value={formData?.personalDetails?.mobileNo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={2}>
            <Form.Group controlId="contactNo">
              <Form.Label>Contact No.</Form.Label>
              <Form.Control
                name="personalDetails.contactNo"
                type="text"
                placeholder="Contact No."
                value={formData?.personalDetails?.contactNo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={2}>
            <Form.Group controlId="whatsappNo">
              <Form.Label>WhatsApp No.</Form.Label>
              <Form.Control
                name="personalDetails.whatsappNo"
                type="text"
                placeholder="WhatsApp No."
                value={formData?.personalDetails?.whatsappNo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={6}>
            <Form.Group controlId="emailId">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="personalDetails.emailId"
                type="email"
                placeholder="Email"
                value={formData?.personalDetails?.emailId}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        {/* Pa name , mobile , annualIncome , grade */}
        <Row className="mb-2">
          <Col xs={12} sm={6} md={5}>
            <Form.Group controlId="paName">
              <Form.Label>PA Name</Form.Label>
              <Form.Control
                name="personalDetails.paName"
                type="text"
                placeholder="PA Name"
                value={formData?.personalDetails?.paName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={3}>
            <Form.Group controlId="paMobileNo">
              <Form.Label>PA Mobile No.</Form.Label>
              <Form.Control
                name="personalDetails.paMobileNo"
                type="number"
                placeholder="PA Mobile Number"
                value={formData?.personalDetails?.paMobileNo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={3}>
            <Form.Group controlId="personalDetails.annualIncome">
              <Form.Label>Annual Income</Form.Label>
              <Form.Select
                name="personalDetails.annualIncome"
                value={formData?.personalDetails?.annualIncome}
                onChange={handleChange}
              >
                <option value="">Choose</option>
                <option value="25 lakh to 1 Cr.">25 lakh to 1 Cr.</option>
                <option value="5 to 25 lakh">5 to 25 lakh</option>
                <option value="2.5 to 5 lakh">2.5 to 5 lakh</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={1}>
            <Form.Group controlId="personalDetails.grade">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                name="personalDetails.grade"
                type="text"
                value={formData?.personalDetails?.grade}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
        {/* Resi & Office Address */}
        <Row className="mb-3">
          <Col md={2} className="pt-4">
            <Form.Check
              type="radio"
              value="resi"
              name="personalDetails.preferredAddressType"
              checked={
                formData?.personalDetails?.preferredAddressType === "resi"
              }
              onChange={handleRadioChange}
              label="Select"
            />
          </Col>
          <Col md={3}>
            <Form.Label>Resi. Address</Form.Label>
            <Form.Control
              name="personalDetails.resiAddr"
              value={formData?.personalDetails?.resiAddr}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Label>Landmark</Form.Label>
            <Form.Control
              name="personalDetails.resiLandmark"
              value={formData?.personalDetails?.resiLandmark}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Label>Pin Code</Form.Label>
            <Form.Control
              name="personalDetails.resiPincode"
              value={formData?.personalDetails?.resiPincode}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={2} className="pt-4">
            <Form.Check
              type="radio"
              value="office"
              name="personalDetails.preferredAddressType"
              checked={
                formData?.personalDetails?.preferredAddressType === "office"
              }
              onChange={handleRadioChange}
              label="Select"
            />
          </Col>
          <Col md={3}>
            <Form.Label>Off. Address</Form.Label>
            <Form.Control
              name="personalDetails.officeAddr"
              value={formData?.personalDetails?.officeAddr}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Label>Landmark</Form.Label>
            <Form.Control
              name="personalDetails.officeLandmark"
              value={formData?.personalDetails?.officeLandmark}
              onChange={handleChange}
            />
          </Col>
          <Col md={2}>
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              name="personalDetails.officePincode"
              value={formData?.personalDetails?.officePincode}
              onChange={handleChange}
            />
          </Col>
        </Row>
        {/* Meeting Address */}
        <Row className="mb-2">
          <Col md={4}>
            <Form.Label className="text-primary fw-bold">
              Preferred Meeting Address
            </Form.Label>
            <Form.Control
              name="personalDetails.preferredMeetingAddr"
              value={formData?.personalDetails?.preferredMeetingAddr}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Label className="text-primary fw-bold">Area</Form.Label>
            <Form.Control
              name="personalDetails.preferredMeetingArea"
              value={formData?.personalDetails?.preferredMeetingArea}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Label>City</Form.Label>
            <Form.Control
              name="personalDetails.city"
              value={formData?.personalDetails?.city}
              onChange={handleChange}
            />
          </Col>

          <Col>
            <Form.Label>Best Time</Form.Label>
            <Form.Select
              id="bestTime"
              name="personalDetails.bestTime"
              value={formData?.personalDetails?.bestTime}
              onChange={handleChange}
            >
              <option value="">-- Select Time --</option>
              <option value="10 AM to 2 PM">10 AM to 2 PM</option>
              <option value="2 PM to 7 PM">2 PM to 7 PM</option>
            </Form.Select>
          </Col>
        </Row>
        {/*Adhar card Pan Card */}
        <Row className="mb-3">
          {/* Aadhar Number */}
          <Col md={4}>
            <Form.Label>Aadhar Number</Form.Label>
            <Form.Control
              placeholder="Enter Aadhar Number"
              name="personalDetails.adharNumber"
              type="number"
              value={formData?.personalDetails?.adharNumber}
              onChange={handleChange}
            />
          </Col>

          {/* PAN Card Number */}
          <Col md={4}>
            <Form.Label>PAN Card Number</Form.Label>
            <Form.Control
              placeholder="Enter PAN Number"
              name="personalDetails.panCardNumber"
              type="text"
              value={formData?.personalDetails?.panCardNumber}
              onChange={handleChange}
            />
          </Col>
        </Row>
        {/* Education Type Dropdown */}
        <Row className="mb-3">
          <Col md={4}>
            <Form.Label>Education Type</Form.Label>
            <Form.Select
              name="education.types"
              value={formData?.education?.types}
              onChange={handleChange}
            >
              <option value="">Select Education Type</option>
              <option value="school">School</option>
              <option value="college">College</option>
              <option value="professional">Professional Degree</option>
            </Form.Select>
          </Col>

          {/* Conditionally render School fields */}
          {formData?.education?.types === "school" && (
            <>
              <Col md={4}>
                <Form.Label>School Name</Form.Label>
                <Form.Control
                  name="education.schoolName"
                  type="text"
                  placeholder="Enter School Name"
                  value={formData?.education?.schoolName}
                  onChange={handleChange}
                />
              </Col>
              <Col md={4}>
                <Form.Label>Subjects</Form.Label>
                <Form.Control
                  name="education.schoolSubjects"
                  type="text"
                  placeholder="Enter Subjects"
                  value={formData?.education?.schoolSubjects}
                  onChange={handleChange}
                />
              </Col>
            </>
          )}

          {/* Conditionally render College fields */}
          {formData?.education?.types === "college" && (
            <>
              <Col md={4}>
                <Form.Label>College Name</Form.Label>
                <Form.Control
                  name="education.collegeName"
                  type="text"
                  placeholder="Enter College Name"
                  value={formData?.education?.collegeName}
                  onChange={handleChange}
                />
              </Col>
              <Col md={4}>
                <Form.Label>Course/Degree</Form.Label>
                <Form.Control
                  name="education.collegeCourse"
                  type="text"
                  placeholder="Enter Course"
                  value={formData?.education?.collegeCourse}
                  onChange={handleChange}
                />
              </Col>
            </>
          )}

          {/* Conditionally render Professional fields */}
          {formData?.education?.types === "professional" && (
            <>
              <Col md={4}>
                <Form.Label>Institute Name</Form.Label>
                <Form.Control
                  name="education.instituteName"
                  type="text"
                  placeholder="Enter Institute Name"
                  value={formData?.education?.instituteName}
                  onChange={handleChange}
                />
              </Col>
              <Col md={4}>
                <Form.Label>Degree</Form.Label>
                <Form.Control
                  name="education.professionalDegree"
                  type="text"
                  placeholder="Enter Degree Name"
                  value={formData?.education?.professionalDegree}
                  onChange={handleChange}
                />
              </Col>
            </>
          )}
        </Row>
        {/* Preferences: Hobbies, Native Place, Social Link, Habits */}
        <Row className="mb-2">
          <Col>
            <Form.Control
              placeholder="Native Place"
              name="personalDetails.nativePlace"
              type="text"
              value={formData?.personalDetails?.nativePlace}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Hobbies"
              name="personalDetails.hobbies"
              type="text"
              value={formData?.personalDetails?.hobbies}
              onChange={handleChange}
            />
          </Col>

          <Col>
            <Form.Control
              placeholder="Social Link"
              name="personalDetails.socialLink"
              type="text"
              value={formData?.personalDetails?.socialLink}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Habits"
              name="personalDetails.habits"
              type="text"
              value={formData?.personalDetails?.habits}
              onChange={handleChange}
            />
          </Col>
        </Row>
        {/* Lead Info */}
        <Row className="mb-2">
          <Col>
            <Form.Select
              name="personalDetails.leadSource"
              value={formData?.personalDetails?.leadSource}
              onChange={handleChange}
            >
              <option value="">Select Lead Source</option>
              {leadSources.map((source) => (
                <option key={source._id} value={source.leadName}>
                  {source.leadName}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              name="personalDetails.leadName"
              placeholder="Lead Name"
              value={formData?.personalDetails?.leadName}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Select
              name="personalDetails.leadOccupation"
              value={formData?.personalDetails?.leadOccupation}
              onChange={handleChange}
            >
              <option value="">Select Lead Occupation</option>
              {leadOccupations.map((occupation) => (
                <option key={occupation._id} value={occupation.leadName}>
                  {occupation.leadName}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              name="personalDetails.leadOccupationType"
              placeholder="Occupation Type"
              value={formData?.personalDetails?.leadOccupationType}
              onChange={handleChange}
            />
          </Col>
        </Row>
        {/* Calling Purpose, Name */}
        <Row className="mb-2">
          <Col>
            <Form.Select
              name="personalDetails.callingPurpose"
              value={formData?.personalDetails?.callingPurpose}
              onChange={handleChange}
            >
              <option value="">Select Purpose</option>
              <option value="Servicing">Servicing</option>
              <option value="Sales">Sales</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select
              name="personalDetails.name"
              value={formData?.personalDetails?.name}
              onChange={handleChange}
            >
              <option value="">Select Name</option>
              <option value="LIC">LIC</option>
              <option value="Portfolio Management">Portfolio Management</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              placeholder="Allocated CRE"
              name="personalDetails.allocatedCRE"
              type="text"
              value={formData?.personalDetails?.allocatedCRE}
              onChange={handleChange}
            />
          </Col>
        </Row>
        {/* remark */}
        <Row className="mb-2">
          <Col md={12}>
            <Form.Label>Remark</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter any remarks"
              name="personalDetails.remark"
              value={formData?.personalDetails?.remark}
              onChange={handleChange}
            />
          </Col>
        </Row>
        {/* <Row className="mb-2">
          <Col>
            <Form.Control
              name="personalDetails.grade"
              placeholder="Grade"
              type="text"
              value={formData?.personalDetails?.grade}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Select
              name="personalDetails.salutation"
              value={formData?.personalDetails?.salutation}
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
              value={formData?.personalDetails?.groupName}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              name="personalDetails.groupCode"
              type="text"
              placeholder="Group Code"
              value={formData?.personalDetails?.groupCode}
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
              value={formData?.personalDetails?.residenceAddress}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              name="personalDetails.officeAddress"
              type="text"
              placeholder="Office Address"
              value={formData?.personalDetails?.officeAddress}
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
              value={formData?.personalDetails?.landMark}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Meeting Address"
              name="personalDetails.meetingAddress"
              type="text"
              value={formData?.personalDetails?.meetingAddress}
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
                value={formData?.personalDetails?.bestTime}
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
              value={formData?.personalDetails?.occupation}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Organisation"
              name="personalDetails.organisation"
              type="text"
              value={formData?.personalDetails?.organisation}
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
              value={formData?.personalDetails?.designation}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Mobile No"
              name="contactInfo.mobileNo"
              type="number"
              value={formData?.contactInfo?.mobileNo}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Whatsapp No"
              name="contactInfo.whatsappNo"
              type="number"
              value={formData?.contactInfo?.whatsappNo}
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
              value={formData?.contactInfo?.emailId}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="PA Name"
              name="contactInfo.paName"
              value={formData?.contactInfo?.paName}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="PA Mobile No"
              name="contactInfo.paMobileNo"
              type="number"
              value={formData?.contactInfo?.paMobileNo}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Form.Select
              name="personalDetails.leadOccupation"
              onChange={handleChange}
              value={formData?.personalDetails?.leadOccupation}
            >
              <option value="">Select Lead Occupation</option>
              {leadOccupation?.map((item, index) => (
                <option key={index} value={item.leadName}>
                  {item.leadName || "-"}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col>
            <Form.Select
              name="leadInfo.leadOccupationType"
              onChange={handleChange}
              value={formData?.leadInfo?.leadOccupationType}
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
              value={formData?.leadInfo?.leadSource}
            >
              <option value="">Select Lead Source</option>
              {leadSource?.map((item, index) => (
                <option key={index} value={item.leadName}>
                  {item.leadName || "-"}
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
              value={formData?.leadInfo?.leadPerson}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Adhar Number"
              name="leadInfo.adharNumber"
              type="Number"
              value={formData?.leadInfo?.adharNumber}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="PAN Card Number"
              name="leadInfo.panCardNumber"
              type="Number"
              value={formData?.leadInfo?.panCardNumber}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Allocated CRE"
              name="leadInfo.allocatedCRE"
              type="text"
              value={formData?.leadInfo?.allocatedCRE}
              onChange={handleChange}
            />
          </Col>
          <Row className="mt-2">
            <Col>
              <Form.Control
                placeholder="Hobbies"
                name="personalDetails.hobbies"
                type="text"
                value={formData?.personalDetails?.hobbies}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Native Place"
                name="personalDetails.nativePlace"
                type="text"
                value={formData?.preferences?.nativePlace}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Social Link"
                name="personalDetails.socialLink"
                type="text"
                value={formData?.preferences?.socialLink}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Habits"
                name="preferences.habits"
                type="text"
                value={formData?.preferences?.habits}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Row> */}
        &nbsp; &nbsp;
        {/* Family Members Section */}
        {/* 
        <Row className="mb-3">
          <Col>
            <Form.Control
              placeholder="Mr/Mrs"
              name="newFamilyMember.title"
              value={formData?.newFamilyMember??.title}
              onChange={handleFamilyMemberChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Name"
              name="newFamilyMember.name"
              value={formData?.newFamilyMember??.name}
              onChange={handleFamilyMemberChange}
            />
          </Col>
          <Col>
            <Form.Select
              name="newFamilyMember.relation"
              value={formData?.newFamilyMember??.relation}
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
                value={formData?.newFamilyMember??.dobActual}
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
                value={formData?.newFamilyMember??.dobRecord}
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
                value={formData?.newFamilyMember??.marriageDate}
                onChange={handleFamilyMemberChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Control
              placeholder="Occupation"
              name="newFamilyMember.occupation"
              value={formData?.newFamilyMember??.occupation}
              onChange={handleFamilyMemberChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Annual Income"
              name="newFamilyMember.annualIncome"
              type="number"
              value={formData?.newFamilyMember??.annualIncome}
              onChange={handleFamilyMemberChange}
            />
          </Col>
        </Row>
        <Form.Check
          label="Add Health Details"
          type="checkbox"
          name="newFamilyMember.includeHealth"
          checked={formData?.newFamilyMember??.includeHealth}
          onChange={handleFamilyMemberChange}
        />
        {formData?.newFamilyMember??.includeHealth && (
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
                      formData?.newFamilyMember??.healthHistory.submissionDate
                    }
                    onChange={handleFamilyMemberChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Control
                  placeholder="Disease Name"
                  name="newFamilyMember.healthHistory.diseaseName"
                  value={formData?.newFamilyMember??.healthHistory.diseaseName}
                  onChange={handleFamilyMemberChange}
                />
              </Col>
              <Col>
                <Form.Group controlId="healthHistorySince" className="d-flex">
                  <Form.Label>Since (Date)</Form.Label>
                  <Form.Control
                    name="newFamilyMember.healthHistory.since"
                    type="date"
                    value={formData?.newFamilyMember??.healthHistory.since}
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
                  value={formData?.newFamilyMember??.healthHistory.height}
                  onChange={handleFamilyMemberChange}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Weight"
                  name="newFamilyMember.healthHistory.weight"
                  value={formData?.newFamilyMember??.healthHistory.weight}
                  onChange={handleFamilyMemberChange}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Remark"
                  name="newFamilyMember.healthHistory.remark"
                  value={formData?.newFamilyMember??.healthHistory.remark}
                  onChange={handleFamilyMemberChange}
                />
              </Col>
            </Row>
          </>
        )}
        <div className="w-100 d-flex justify-content-end">
          <Button variant="primary" className="mt-3" onClick={addFamilyMember}>
            <FaPlus />
          </Button>
        </div> */}
        <div className="w-100 d-flex justify-content-between align-items-center">
          <h5 className="mt-4">Add Family Details</h5>
          <Button
            variant="success"
            className="mb-2"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                familyMembers: [
                  ...prev.familyMembers,
                  {
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
                ],
              }));
            }}
          >
            <FaPlus /> Add More Family Member
          </Button>
        </div>
        {formData?.familyMembers?.map((member, index) => (
          <div key={index} className="border rounded p-3 mb-3">
            <Row className="mb-2">
              <Col>
                <Form.Control
                  placeholder="Mr/Mrs"
                  name="title"
                  value={member.title}
                  onChange={(e) => handleFamilyMemberChange(e, index)}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Name"
                  name="name"
                  value={member.name}
                  onChange={(e) => handleFamilyMemberChange(e, index)}
                />
              </Col>
              <Col>
                <Form.Select
                  name="relation"
                  value={member.relation}
                  onChange={(e) => handleFamilyMemberChange(e, index)}
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
            </Row>

            <Row className="mb-2">
              <Col xs={12} md={4}>
                <Form.Group controlId={`dobActual-${index}`}>
                  <Form.Label className="small">DOB Actual</Form.Label>
                  <Form.Control
                    type="date"
                    name="dobActual"
                    value={member.dobActual}
                    onChange={(e) => handleFamilyMemberChange(e, index)}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={4}>
                <Form.Group controlId={`dobRecord-${index}`}>
                  <Form.Label className="small">DOB Record</Form.Label>
                  <Form.Control
                    type="date"
                    name="dobRecord"
                    value={member.dobRecord}
                    onChange={(e) => handleFamilyMemberChange(e, index)}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={4}>
                <Form.Group controlId={`marriageDate-${index}`}>
                  <Form.Label className="small">Marriage Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="marriageDate"
                    value={member.marriageDate}
                    onChange={(e) => handleFamilyMemberChange(e, index)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col>
                <Form.Control
                  placeholder="Occupation"
                  name="occupation"
                  value={member.occupation}
                  onChange={(e) => handleFamilyMemberChange(e, index)}
                />
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Annual Income"
                  name="annualIncome"
                  value={member.annualIncome}
                  onChange={(e) => handleFamilyMemberChange(e, index)}
                />
              </Col>
            </Row>

            <Form.Check
              label="Add Health Details"
              name="includeHealth"
              type="checkbox"
              checked={member.includeHealth}
              onChange={(e) => handleFamilyMemberChange(e, index)}
            />

            {member.includeHealth && (
              <>
                <h6 className="mb-3">Health History</h6>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId={`submissionDate-${index}`}>
                      <Form.Label>Submission Date</Form.Label>
                      <Form.Control
                        name="healthHistory.submissionDate"
                        type="date"
                        value={member.healthHistory.submissionDate}
                        onChange={(e) => handleFamilyMemberChange(e, index)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId={`diseaseName-${index}`}>
                      <Form.Label>Disease Name</Form.Label>
                      <Form.Control
                        name="healthHistory.diseaseName"
                        value={member.healthHistory.diseaseName}
                        onChange={(e) => handleFamilyMemberChange(e, index)}
                        placeholder="Disease Name"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={3}>
                    <Form.Group controlId={`since-${index}`}>
                      <Form.Label>Since</Form.Label>
                      <Form.Control
                        name="healthHistory.since"
                        type="date"
                        value={member.healthHistory.since}
                        onChange={(e) => handleFamilyMemberChange(e, index)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group controlId={`height-${index}`}>
                      <Form.Label>Height</Form.Label>
                      <Form.Control
                        name="healthHistory.height"
                        value={member.healthHistory.height}
                        onChange={(e) => handleFamilyMemberChange(e, index)}
                        placeholder="Height"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group controlId={`weight-${index}`}>
                      <Form.Label>Weight</Form.Label>
                      <Form.Control
                        name="healthHistory.weight"
                        value={member.healthHistory.weight}
                        onChange={(e) => handleFamilyMemberChange(e, index)}
                        placeholder="Weight"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group controlId={`remark-${index}`}>
                      <Form.Label>Remark</Form.Label>
                      <Form.Control
                        name="healthHistory.remark"
                        value={member.healthHistory.remark}
                        onChange={(e) => handleFamilyMemberChange(e, index)}
                        placeholder="Remark"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}

            <div className="text-end">
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFamilyMember(index)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
        {/* Display added family members
        {formData?.familyMembers?.length > 0 && (
          <div className="mt-4">
            <h5>Added Family Members</h5>
            <ul>
              {formData?.familyMembers?.map((member, index) => (
                <li key={index}>
                  {member.title} {member.name} ({member.relation})
                  {member.includeHealth && (
                    <span> - Health details included</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}{" "} */}
        &nbsp; &nbsp; &nbsp; &nbsp;
        {/* Financial Details */}
        {/* <h5 className="mt-4">Financial Details</h5>
        <div className="row"> */}
        {/* Insurance & Investment */}
        {/* <div className="col-md-4">
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
                checked={formData?.financialInfo?.insuranceInvestment.includes(
                  item
                )}
                onChange={(e) => handleCheckboxChange(e, "insuranceInvestment")}
              />
            ))}
          </div> */}
        {/* Loan & Liabilities */}
        {/* <div className="col-md-4">
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
                checked={formData?.financialInfo?.loans.includes(item)}
                onChange={(e) => handleCheckboxChange(e, "loans")}
              />
            ))}
          </div> */}
        {/* Future Priority
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
              checked={formData?.financialInfo?.futurePriorities.includes(item)}
              onChange={(e) => handleCheckboxChange(e, "futurePriorities")}
            />
          ))}
        </div> */}
        {/* </div> */}
        {/* Financial Details */}
        <h5 className="mt-4">Financial Details</h5>
        <div className="row">
          {/* Insurance  */}
          <div className="col-md-4">
            <h6 className="text-warning fw-bold">Insurance</h6>
            {[
              "LIC Policy",
              "Pvt. Life Policy",
              "Health Policy",
              "Motor Policy",
              "Fire Policy",
              "Other Policy",
            ].map((item) => (
              <Form.Check
                key={item}
                type="checkbox"
                label={item}
                value={item}
                checked={formData?.financialInfo?.insuranceInvestment.includes(
                  item
                )}
                onChange={(e) => handleCheckboxChange(e, "insuranceInvestment")}
              />
            ))}
          </div>
          {/* Investment */}
          <div className="col-md-4">
            <h6 className="text-warning fw-bold">Investment</h6>
            {[
              "Deposits",
              "Mutual Fund",
              "Stock Market",
              "Gold",
              "Property",
              "Other Investment",
            ].map((item) => (
              <Form.Check
                key={item}
                type="checkbox"
                label={item}
                value={item}
                checked={formData?.financialInfo?.insuranceInvestment.includes(
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
              "Business Loan",
              "Home Loan",
              "Vehicle Loan",
              "Personal Loan",
              "Gold Loan",
              "Other Loan",
            ].map((item) => (
              <Form.Check
                key={item}
                type="checkbox"
                label={item}
                value={item}
                checked={formData?.financialInfo?.loans.includes(item)}
                onChange={(e) => handleCheckboxChange(e, "loans")}
              />
            ))}
          </div>

          {/* Future's Priorities */}
          <div className="row mt-4">
            <div className="col-12">
              <h6
                className="fw-bold"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                FUTURE'S PRIORITIES
              </h6>
              <div className="row">
                {/* Column 1 */}
                <div className="col-md-4">
                  {[
                    "Life Insurance",
                    "Health Insurance",
                    "Retirement Fund",
                    "Wealth Creation",
                  ].map((item) => (
                    <Form.Check
                      key={item}
                      type="checkbox"
                      label={item}
                      value={item}
                      checked={formData?.financialInfo?.futurePriorities.includes(
                        item
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(e, "futurePriorities")
                      }
                    />
                  ))}
                </div>

                {/* Column 2 */}
                <div className="col-md-4">
                  {[
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
                      checked={formData?.financialInfo?.futurePriorities.includes(
                        item
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(e, "futurePriorities")
                      }
                    />
                  ))}
                </div>

                {/* Column 3 */}
                <div className="col-md-4">
                  {[
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
                      checked={formData?.financialInfo?.futurePriorities.includes(
                        item
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(e, "futurePriorities")
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        &nbsp; &nbsp;
        <Row className="mb-3">
          <h5 className="mt-4">Have You Any Need</h5>
          <Col>
            {/* ------------------------- */}
            <Form.Control
              placeholder="Financial Products"
              type="text"
              name="needs.financialProducts"
              value={formData?.needs?.financialProducts}
              onChange={handleChange}
            />
          </Col>

          {/* ------------------------- */}
          <Col>
            <Form.Control
              placeholder="Any Correction"
              type="text"
              name="needs.anyCorrection"
              value={formData?.needs?.anyCorrection}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Any Updation"
              name="needs.anyUpdation"
              value={formData?.needs?.anyUpdation}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col md={12}>
            <Form.Check
              inline
              type="checkbox"
              label="Financial Calculation"
              name="needs.financialCalculation"
              checked={formData?.needs?.financialCalculation}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Assessment of Need"
              name="needs.assesmentOfNeed"
              checked={formData?.needs?.assesmentOfNeed}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Portfolio Management"
              name="needs.portfolioManagement"
              checked={formData?.needs?.portfolioManagement}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Door Step Services"
              name="needs.doorStepServices"
              checked={formData?.needs?.doorStepServices}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Purchase New Products"
              name="needs.purchaseNewProducts"
              checked={formData?.needs?.purchaseNewProducts}
              onChange={handleChange}
            />
          </Col>
        </Row>
        {/* Submit upper details only */}
        <div className="w-100 d-flex justify-content-center mt-4 mb-4">
          {!isUpdated && (
            <Button
              type="submit"
              className="mt-3 "
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
              {formData?._id ? "Update" : "Submit"}
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default ClientFirstFrom;
