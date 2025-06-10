import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Col, Container, Form, Row } from "react-bootstrap";

import FileUpload from "../../FileUpload";

function ClientSecondForm({ isEdit, onDataChange, firstFormData }) {
  const [formData, setFormData] = useState({
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
    proposedPlan: {
      date: "",
      memberName: "",
      financialProduct: "",
      company: "",
      planName: "",
      upload: [],
    },
    taskDetails: "",
  });

  // Get all family member names including the primary client
  const getAllMemberNames = () => {
    const members = [];

    // Add primary client if name exists
    if (firstFormData?.personalDetails?.name) {
      members.push({
        name: firstFormData.personalDetails.name,
        relation: "self",
      });
    }

    // Add family members
    if (firstFormData?.familyMembers) {
      firstFormData.familyMembers.forEach((member) => {
        if (member.name) {
          members.push({
            name: member.name,
            relation: member.relation,
          });
        }
      });
    }

    return members;
  };

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
    onDataChange(updatedFormData);
  };

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

    const docs = insuranceList.map(() =>
      //added
      ({
        createdDate: "",
        memberName: "",
        documentNo: "",
        documentName: "",
        financialProducts: "",
        remark: "",
        upload: [],
      })
    );

    const updatedFormData = {
      ...formData,
      financialInfo: {
        ...formData.financialInfo,
        ...firstFormData.financialInfo,
      },
      customerDoc: docs,
    };

    setFormData(updatedFormData);
    onDataChange(updatedFormData);
  }, [firstFormData?.financialInfo?.insuranceInvestment]);

  const handleCustomerDocChange = (e, index) => {
    const { name, value, files } = e.target;
    const updatedDocs = [...formData.customerDoc];
    updatedDocs[index] = {
      ...updatedDocs[index],
      [name]: files ? files[0] : value,
    };
    const updatedFormData = { ...formData, customerDoc: updatedDocs };
    setFormData(updatedFormData);
    onDataChange(updatedFormData);
  };

  useEffect(() => {
    if (isEdit) {
      const merged = {
        ...formData,
        ...isEdit,
        proposedPlan: isEdit.proposedPlan || formData.proposedPlan,
      };
      setFormData(merged);
      onDataChange(merged);
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
  const handleAddDoc = () => {
    const newDoc = {
      createdDate: "",
      memberName: "",
      documentNo: "",
      documentName: "",
      financialProducts: "",
      remark: "",
      upload: [],
    };
    const updatedFormData = {
      ...formData,
      customerDoc: [...formData.customerDoc, newDoc],
    };
    setFormData(updatedFormData);
    onDataChange(updatedFormData);
  };

  const handleRemoveDoc = (index) => {
    const updatedDocs = formData.customerDoc.filter((_, i) => i !== index);
    const updatedFormData = { ...formData, customerDoc: updatedDocs };
    setFormData(updatedFormData);
    onDataChange(updatedFormData);
  };

  return (
    <Container>
      <Form>
        {/* KYC Document */}

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
                  <Form.Select
                    name="memberName"
                    value={formData.customerDoc[index]?.memberName || ""}
                    onChange={(e) => handleCustomerDocChange(e, index)}
                  >
                    <option value="">Select Member</option>
                    {getAllMemberNames().map((member, i) => (
                      <option key={i} value={member.name}>
                        {member.name} ({member.relation})
                      </option>
                    ))}
                  </Form.Select>
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
                    name="remark"
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

        {/* Proposed Plan */}
        <h5 className="mt-4">Proposed Financial Plan</h5>
        <Row className="g-3">
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
              <Form.Select
                name="proposedPlan.memberName"
                value={formData.proposedPlan?.memberName || ""}
                onChange={handleChange}
              >
                <option value="">Select Member</option>
                {getAllMemberNames().map((member, i) => (
                  <option key={i} value={member.name}>
                    {member.name} ({member.relation})
                  </option>
                ))}
              </Form.Select>
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
      </Form>
    </Container>
  );
}

export default ClientSecondForm;
