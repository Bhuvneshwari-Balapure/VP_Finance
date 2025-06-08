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
  // const leadOccupation = useSelector((state) => state.leadOccupation.details);
  // const occupationType = useSelector((state) => state.OccupationType.details);
  // const leadSource = useSelector((state) => state.leadsource.leadsourceDetail);

  const [StoreData, setStoreData] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const [formData, setFormData] = useState({
    personalDetails: {
      grade: "",
      salutation: "",
      groupName: "",
      groupCode: "",
      familyHead: "",
      gender: "",
      occupation: "",
      organisation: "",
      designation: "",
      dob: "",
      dom: "",
      // Address Info
      resiAddr: "",
      resiLandmark: "",
      resiPincode: "",
      officeAddr: "",
      officeLandmark: "",
      officePincode: "",
      preferredMeetingAddr: "",
      preferredMeetingArea: "",
      bestTime: "",
      city: "",
      pincode: "",
      callingPurpose: "",
      name: "",

      // grade: "",
      // salutation: "",
      // groupName: "",
      // groupCode: "",
      // residenceAddress: "",
      // officeAddress: "",
      // landMark: "",
      // meetingAddress: "",
      // bestTime: "",
      // occupation: "",
      // organisation: "",
      // designation: "",
    },
    contactInfo: {
      mobileNo: "",
      whatsappNo: "",
      contactNo: "",
      emailId: "",
      paName: "",
      paMobileNo: "",
      // mobileNo: "",
      // whatsappNo: "",
      // emailId: "",
      // paName: "",
      // paMobileNo: "",
    },
    leadInfo: {
      leadSource: "",
      leadName: "",
      leadOccupation: "",
      leadOccupationType: "",
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

  // add familyMember
  // const addFamilyMember = () => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     familyMembers: [...prev.familyMembers, prev.newFamilyMember],
  //     newFamilyMember: {
  //       title: "",
  //       name: "",
  //       relation: "",
  //       dobActual: "",
  //       dobRecord: "",
  //       marriageDate: "",
  //       occupation: "",
  //       annualIncome: "",
  //       includeHealth: false,
  //       healthHistory: {
  //         submissionDate: "",
  //         diseaseName: "",
  //         since: "",
  //         height: "",
  //         weight: "",
  //         remark: "",
  //       },
  //     },
  //   }));
  // };

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     if (formData._id) {
  //       // UPDATE case
  //       const updatedRes = await dispatch(
  //         updateClientFirstForm({ id: formData._id, formData })
  //       ).unwrap();
  //       alert("Form updated successfully.");
  //       setStoreData(updatedRes);
  //       onDataChange(updatedRes);
  //     } else {
  //       // CREATE case
  //       const res = await dispatch(createClientFirstForm(formData)).unwrap();
  //       if (res && res._id) {
  //         setStoreData(res);
  //         onDataChange(res);

  //         // console.log(res, "Form Data Submitted:");

  //         alert("Form saved successfully.");
  //       } else {
  //         console.error("Form submission failed:", res);
  //         alert("Form submission failed. Please try again.");
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Form submission/update failed:", err);
  //     alert("Something went wrong while saving or updating the form.");
  //   }
  // };

  // console.log(StoreData);

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
        {/* Personal Details , meetingAddress , offince address , bestTime */}
        <h5 className="mt-4">Personal Details</h5>
        <Row className="mb-2">
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
        {/* Family Head, Gender, Organisation, Designation */}
        <Row className="mb-2">
          <Col>
            <Form.Control
              name="personalDetails.familyHead"
              placeholder="Family Head"
              value={formData?.personalDetails?.familyHead}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Select
              name="personalDetails.gender"
              value={formData?.personalDetails?.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </Form.Select>
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
              name="personalDetails.organisation"
              placeholder="Organisation"
              value={formData?.personalDetails?.organisation}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              name="personalDetails.designation"
              placeholder="Designation"
              value={formData?.personalDetails?.designation}
              onChange={handleChange}
            />
          </Col>
        </Row>
        {/* Mobile, Contact No, Whatsapp, Email */}
        <Row className="mb-2">
          <Col>
            <Form.Control
              name="contactInfo.mobile"
              placeholder="Mobile No."
              value={formData?.contactInfo?.mobile}
              onChange={handleChange}
            />
          </Col>
          {/* <Col>
            <Form.Control
              name="contactNo"
              placeholder="Contact No."
              value={formData?.contactInfo?.contactNo}
              onChange={handleChange}
            />
          </Col> */}
          <Col>
            <Form.Control
              name="contactInfo.whatsapp"
              placeholder="whatsapp Number"
              value={formData?.contactInfo?.whatsapp}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              name="contactInfo.emailId"
              placeholder="Email"
              type="email"
              value={formData?.contactInfo?.emailId}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Form.Control
              name="contactInfo.paName"
              placeholder="PA Name"
              type="text"
              value={formData?.contactInfo?.paName}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              name="contactInfo.paMobileNo"
              placeholder="PA Mobile Number"
              type="number"
              value={formData?.contactInfo?.paMobileNo}
              onChange={handleChange}
            />
          </Col>
        </Row>
        {/* DOB, DOM */}
        <Row className="mb-2">
          <Col xs={12} md={6}>
            <Form.Group controlId="dob">
              <Form.Label className="small">Date of Birth (DOB)</Form.Label>
              <Form.Control
                name="personalDetails.dob"
                type="date"
                value={formData?.personalDetails?.dob}
                onChange={handleChange}
                className="form-control-sm"
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="dom">
              <Form.Label className="small">Date of Marriage (DOM)</Form.Label>
              <Form.Control
                name="personalDetails.dom"
                type="date"
                value={formData?.personalDetails?.dom}
                onChange={handleChange}
                className="form-control-sm"
              />
            </Form.Group>
          </Col>
        </Row>
        {/* Address Info */}
        <Row className="mb-2">
          <Col>
            <Form.Control
              name="personalDetails.resiAddr"
              placeholder="Residence Address"
              value={formData?.personalDetails?.resiAddr}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              name="personalDetails.resiLandmark"
              placeholder="Residence Landmark"
              value={formData?.personalDetails?.resiLandmark}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              name="personalDetails.resiPincode"
              placeholder="Residence Pincode"
              value={formData?.personalDetails?.resiPincode}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Form.Control
              name="personalDetails.officeAddr"
              placeholder="Office Address"
              value={formData?.personalDetails?.officeAddr}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              name="personalDetails.officeLandmark"
              placeholder="Office Landmark"
              value={formData?.personalDetails?.officeLandmark}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              name="personalDetails.officePincode"
              placeholder="Office Pincode"
              value={formData?.personalDetails?.officePincode}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Form.Control
              name="personalDetails.preferredMeetingAddr"
              placeholder="Preferred Meeting Address"
              value={formData?.personalDetails?.preferredMeetingAddr}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              name="personalDetails.preferredMeetingArea"
              placeholder="Meeting Area"
              value={formData?.personalDetails?.preferredMeetingArea}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              name="personalDetails.city"
              placeholder="City"
              value={formData?.personalDetails?.city}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              name="personalDetails.pincode"
              placeholder="Pincode"
              value={formData?.personalDetails?.pincode}
              onChange={handleChange}
            />
          </Col>
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
        </Row>
        {/* Lead Info */}
        <Row className="mb-2">
          <Col>
            <Form.Select
              name="leadInfo.leadSource"
              value={formData?.leadInfo?.leadSource}
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
              name="leadInfo.leadName"
              placeholder="Lead Name"
              value={formData?.leadInfo?.leadName}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Select
              name="leadInfo.leadOccupation"
              value={formData?.leadInfo?.leadOccupation}
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
              name="leadInfo.leadOccupationType"
              placeholder="Occupation Type"
              value={formData?.leadInfo?.leadOccupationType}
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
        </Row>
        {/* PAN Card Number, Aadhaar Number, Allocated CRE */}
        <Row className="mb-2">
          <Col>
            <Form.Control
              placeholder="Adhar Number"
              name="leadInfo.adharNumber"
              type="number"
              value={formData?.leadInfo?.adharNumber}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="PAN Card Number"
              name="leadInfo.panCardNumber"
              type="number"
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
              name="leadInfo.leadOccupation"
              onChange={handleChange}
              value={formData?.leadInfo?.leadOccupation}
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
                name="preferences.hobbies"
                type="text"
                value={formData?.preferences?.hobbies}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Native Place"
                name="preferences.nativePlace"
                type="text"
                value={formData?.preferences?.nativePlace}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Social Link"
                name="preferences.socialLink"
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
        {/* Education Section */}
        <h6 className="mt-3">Education</h6>
        <Row className="mb-3">
          <Col md={4}>
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
        </Row>
        &nbsp; &nbsp;
        {formData?.education?.types === "school" && (
          <Row className="mb-2">
            <Col>
              <Form.Control
                name="education.schoolName"
                type="text"
                placeholder="School Name"
                value={formData?.education?.schoolName}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Control
                name="education.schoolSubjects"
                type="text"
                placeholder="Subjects Pursuing in School"
                value={formData?.education?.schoolSubjects}
                onChange={handleChange}
              />
            </Col>
          </Row>
        )}
        {formData?.education?.types === "college" && (
          <Row className="mb-2">
            <Col>
              <Form.Control
                name="education.collegeName"
                type="text"
                placeholder="College Name"
                value={formData?.education?.collegeName}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Control
                name="education.collegeCourse"
                type="text"
                placeholder="Course or Degree Name"
                value={formData?.education?.collegeCourse}
                onChange={handleChange}
              />
            </Col>
          </Row>
        )}
        {formData?.education?.types === "professional" && (
          <Row className="mb-2">
            <Col>
              <Form.Control
                name="education.instituteName"
                type="text"
                placeholder="Institute Name"
                value={formData?.education?.instituteName}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Control
                name="education.professionalDegree"
                type="text"
                placeholder="Degree Name"
                value={formData?.education?.professionalDegree}
                onChange={handleChange}
              />
            </Col>
          </Row>
        )}
        &nbsp; &nbsp;
        {/* Family Head Relationship Data */}
        <h5 className="mt-4">Family Head Relationship Data</h5>
        {/* Preferences: Hobbies, Native Place, Social Link, Habits */}
        <Row className="mb-2">
          <Col>
            <Form.Control
              placeholder="Hobbies"
              name="preferences.hobbies"
              type="text"
              value={formData?.preferences?.hobbies}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Native Place"
              name="preferences.nativePlace"
              type="text"
              value={formData?.preferences?.nativePlace}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Social Link"
              name="preferences.socialLink"
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
                <h6>Health History</h6>
                <Row className="mb-2">
                  <Col>
                    <Form.Control
                      name="healthHistory.submissionDate"
                      type="date"
                      value={member.healthHistory.submissionDate}
                      onChange={(e) => handleFamilyMemberChange(e, index)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="Disease Name"
                      name="healthHistory.diseaseName"
                      value={member.healthHistory.diseaseName}
                      onChange={(e) => handleFamilyMemberChange(e, index)}
                    />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Form.Control
                      placeholder="Since"
                      name="healthHistory.since"
                      type="date"
                      value={member.healthHistory.since}
                      onChange={(e) => handleFamilyMemberChange(e, index)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="Height"
                      name="healthHistory.height"
                      value={member.healthHistory.height}
                      onChange={(e) => handleFamilyMemberChange(e, index)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="Weight"
                      name="healthHistory.weight"
                      value={member.healthHistory.weight}
                      onChange={(e) => handleFamilyMemberChange(e, index)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="Remark"
                      name="healthHistory.remark"
                      value={member.healthHistory.remark}
                      onChange={(e) => handleFamilyMemberChange(e, index)}
                    />
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
