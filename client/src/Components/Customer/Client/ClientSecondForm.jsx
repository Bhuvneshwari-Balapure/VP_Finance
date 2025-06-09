import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Col, Container, Form, Row } from "react-bootstrap";

import FileUpload from "../../FileUpload";

function ClientSecondForm({ isEdit, onDataChange, firstFormData }) {
  const [formData, setFormData] = useState({
    financialInfo: {
      insuranceInvestment: [],
      loans: [],
      futurePriorities: [],
    },
    proposedPlan: {
      date: "",
      memberName: "",
      financialProduct: "",
      company: "",
      planName: "",
      upload: [],
    },
    customerDoc: [
      {
        createdDate: "",
        memberName: "",
        documentNo: "",
        documentName: "",
        financialProducts: "",
        remark: "",
        upload: [],
      },
    ],
    taskDetails: "",
  });

  const handleUpload = (sectionName, urls) => {
    if (!urls || urls.length === 0) return;

    const updatedFormData = {
      ...formData,
      [sectionName]: {
        ...formData[sectionName],
        upload: Array.isArray(urls) ? urls : [urls],
      },
    };

    setFormData(updatedFormData);
    onDataChange(updatedFormData); // Notify parent
  };

  // 🔄 Specific handlers (optional, for readability or external triggers)
  const handleCustomerDocUpload = (urls, index) => {
    const updatedDocs = [...formData.customerDoc];
    updatedDocs[index] = {
      ...updatedDocs[index],
      upload: Array.isArray(urls) ? urls : [urls],
    };

    const updatedFormData = { ...formData, customerDoc: updatedDocs };
    setFormData(updatedFormData);
    onDataChange(updatedFormData);
  };

  const handleProposedPlanUpload = (urls) => handleUpload("proposedPlan", urls);

  useEffect(() => {
    if (!firstFormData?.financialInfo?.insuranceInvestment) return;

    const insuranceList = firstFormData.financialInfo.insuranceInvestment || [];

    const docs = insuranceList.map(() => ({
      createdDate: "",
      memberName: "",
      documentNo: "",
      documentName: "",
      financialProducts: "", // ✅ Add this
      upload: [],
    }));

    const updatedFormData = {
      ...formData,
      financialInfo: {
        ...formData.financialInfo,
        ...firstFormData.financialInfo, // ✅ merge financialInfo from firstFormData
      },
      customerDoc: docs,
    };

    setFormData(updatedFormData);
    onDataChange(updatedFormData); // Notify parent
  }, [firstFormData?.financialInfo?.insuranceInvestment]);

  // --------------------------------------
  const handleCustomerDocChange = (e, index) => {
    const { name, value, files } = e.target;
    const updatedDocs = [...formData.customerDoc];
    updatedDocs[index] = {
      ...updatedDocs[index],
      [name]: files ? files[0] : value,
    };

    const updatedFormData = { ...formData, customerDoc: updatedDocs };
    setFormData(updatedFormData);
    onDataChange(updatedFormData); // Notify parent
  };

  // useEffect(() => {
  //   if (isEdit?.financialInfo) {
  //     setFormData(isEdit);
  //     onDataChange(isEdit); // notify parent initially
  //   }
  // }, [isEdit]);
  useEffect(() => {
    if (isEdit) {
      const merged = {
        ...formData,
        ...isEdit,
        proposedPlan: isEdit.proposedPlan || formData.proposedPlan,
      };
      setFormData(merged);
      onDataChange(merged); // notify parent
    }
  }, [isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const keys = name.split(".");
    const updatedData = { ...formData };

    let current = updatedData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    const lastKey = keys[keys.length - 1];
    current[lastKey] =
      type === "checkbox" ? checked : type === "file" ? files[0] : value;

    setFormData(updatedData);
    onDataChange(updatedData);
  };
  // --------------------------------------
  // useEffect(() => {
  //   const insuranceList = firstFormData.financialInfo.insuranceInvestment || [];
  //   const docs = insuranceList.map(() => ({
  //     submissionDate: "",
  //     memberName: "",
  //     documentNo: "",
  //     documentName: "",
  //     uploadFile: null,
  //   }));
  //   setFormData((prev) => ({ ...prev, customerDoc: docs }));
  // }, [firstFormData.financialInfo.insuranceInvestment]);

  // useEffect(() => {
  //   const insuranceList = firstFormData.financialInfo.insuranceInvestment || [];
  //   const docs = insuranceList.map(() => ({
  //     submissionDate: "",
  //     memberName: "",
  //     documentNo: "",
  //     documentName: "",
  //     upload: [],
  //   }));
  //   const updatedFormData = { ...formData, customerDoc: docs };
  //   setFormData(updatedFormData);
  //   onDataChange(updatedFormData); // Notify parent
  // }, [firstFormData.financialInfo.insuranceInvestment]);
  // console.log(firstFormData, "First form Data"); // for debugging

  // --------------------------------------

  // 🔄 Handle file uploads for customerDoc
  // const handleUpload = (sectionName, urls) => {
  //   if (!urls || urls.length === 0) return; // guard clause

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [sectionName]: {
  //       ...prevData[sectionName],
  //       upload: Array.isArray(urls) ? urls : [urls],
  //     },
  //   }));
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form Data Submitted:", formData);
  //   // Add your backend submission logic here
  // };

  return (
    <Container className="my-4">
      <h2 className="mb-4">Client Registration Form</h2>
      <Form>
        {/* <Row className="mb-3">
          <h5 className="mt-4">Have You Any Need</h5>
          <Col>
          
            <Form.Control
              placeholder="Financial Products"
              type="text"
              name="financialInfo.needs.financialProducts"
              value={formData.financialInfo.needs.financialProducts}
              onChange={handleChange}
            />
          </Col>

          <Col>
            <Form.Control
              placeholder="Any Correction"
              type="text"
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
        </Row> */}

        {/* <Row className="mb-2">
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
        </Row> */}

        <h5 className="mt-4">Proposed Financial Plan</h5>
        <Row className="g-3">
          {" "}
          {/* Adds spacing between columns */}
          <Col xs={12} md={4} lg={2}>
            <Form.Group>
              <Form.Label>Created Date</Form.Label>
              <Form.Control
                placeholder="Date"
                name="proposedPlan.date"
                type="date"
                value={formData.proposedPlan?.date}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={4} lg={2}>
            <Form.Group>
              <Form.Label>Member Name</Form.Label>
              <Form.Control
                placeholder="Member Name"
                name="proposedPlan.memberName"
                type="text"
                value={formData.proposedPlan?.memberName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={4} lg={2}>
            <Form.Group>
              <Form.Label>Financial Product</Form.Label>
              <Form.Control
                placeholder="Financial Product"
                name="proposedPlan.financialProduct"
                type="text"
                value={formData.proposedPlan?.financialProduct}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={2}>
            <Form.Group>
              <Form.Label>Financial Company</Form.Label>
              <Form.Control
                placeholder="Company"
                name="proposedPlan.company"
                type="text"
                value={formData.proposedPlan?.company}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={2}>
            <Form.Group>
              <Form.Label>Plan Name</Form.Label>
              <Form.Control
                placeholder="Plan Name"
                name="proposedPlan.planName"
                type="text"
                value={formData.proposedPlan?.planName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={2}>
            <Form.Group>
              <Form.Label>Upload Document</Form.Label>
              <FileUpload
                name="proposedPlan"
                onUpload={handleProposedPlanUpload}
              />
            </Form.Group>
          </Col>
        </Row>

        {firstFormData?.financialInfo?.insuranceInvestment?.map(
          (insurance, index) => (
            <Row className="g-3 mb-3" key={index}>
              <h5 className="mt-4">KYC Document for: {insurance}</h5>

              <Col xs={12} md={6} lg={2}>
                <Form.Group controlId={`createdDate-${index}`}>
                  <Form.Label>Created Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="createdDate"
                    value={formData.customerDoc[index]?.createdDate || ""}
                    onChange={(e) => handleCustomerDocChange(e, index)}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={2}>
                <Form.Group controlId={`memberName-${index}`}>
                  <Form.Label>Member Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Member Name"
                    name="memberName"
                    value={formData.customerDoc[index]?.memberName || ""}
                    onChange={(e) => handleCustomerDocChange(e, index)}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={2}>
                <Form.Group controlId={`documentName-${index}`}>
                  <Form.Label>Document Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Document Name"
                    name="documentName"
                    value={formData.customerDoc[index]?.documentName || ""}
                    onChange={(e) => handleCustomerDocChange(e, index)}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={2}>
                <Form.Group controlId={`documentNo-${index}`}>
                  <Form.Label>Document No</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Document No"
                    name="documentNo"
                    value={formData.customerDoc[index]?.documentNo || ""}
                    onChange={(e) => handleCustomerDocChange(e, index)}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={2}>
                <Form.Group controlId={`remark-${index}`}>
                  <Form.Label>Remark</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Remark"
                    name="documentNo"
                    value={formData.customerDoc[index]?.remark || ""}
                    onChange={(e) => handleCustomerDocChange(e, index)}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={2}>
                <Form.Group>
                  <Form.Label>Upload</Form.Label>
                  <FileUpload
                    name="customerDoc"
                    onUpload={(urls) => handleCustomerDocUpload(urls, index)}
                  />
                </Form.Group>
              </Col>
            </Row>
          )
        )}

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
      </Form>
    </Container>
  );
}

export default ClientSecondForm;
