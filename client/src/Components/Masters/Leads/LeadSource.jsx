import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createDetails,
  fetchDetails,
  updateDetails,
  deleteDetails,
} from "../../../redux/feature/LeadSource/LeadThunx";

const LeadSource = () => {
  const [leadType, setLeadType] = useState("");
  const [leadName, setLeadName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();
  const { details: leadSources, loading } = useSelector(
    (state) => state.leadsource
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!leadType || !leadName) {
      alert("Please fill in both Lead Type and Lead Name.");
      return;
    }

    const leadData = { leadType, leadName };

    if (isEditing) {
      dispatch(updateDetails({ id: editId, data: leadData }));
    } else {
      dispatch(createDetails(leadData));
    }

    // Reset form
    setLeadName("");
    setLeadType("");
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (source) => {
    setEditId(source._id);
    setLeadName(source.leadName);
    setLeadType(source.leadType);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setLeadName("");
    setLeadType("");
    setEditId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lead source?")) {
      dispatch(deleteDetails(id));
    }
  };

  useEffect(() => {
    dispatch(fetchDetails());
  }, [dispatch]);

  return (
    <Container
      fluid
      className="p-4"
      style={{ backgroundColor: "#edf2f7", minHeight: "100vh" }}
    >
      <h3 className="mb-4">Lead Source</h3>
      <Row>
        {/* Left Side - Add/Edit Lead Source */}
        <Col md={6}>
          <Card className="shadow-sm border-top border-primary">
            <Card.Body>
              <Card.Title>
                {isEditing ? "Edit Lead Source" : "Add Lead Source"}
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="leadType">
                  <Form.Label>Lead Type</Form.Label>
                  <Form.Select
                    value={leadType}
                    onChange={(e) => setLeadType(e.target.value)}
                    required
                  >
                    <option value="">--Choose--</option>
                    <option value="Digital Platform">Digital Platform</option>
                    <option value="Organization Data">Organization Data</option>
                    <option value="Direct Approach">Direct Approach</option>
                    <option value="Internship Student">
                      Internship Student
                    </option>
                    <option value="Business Associates">
                      Business Associates
                    </option>
                    <option value="Customer Referral">Customer Referral</option>
                    <option value="Administrator Referral">
                      Administrator Referral
                    </option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="leadName">
                  <Form.Label>Lead Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button type="submit" variant="primary">
                    {isEditing ? "Update" : "Submit"}
                  </Button>
                  {isEditing && (
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Side - All Lead Sources */}
        <Col md={6}>
          <Card className="shadow-sm border-top border-success">
            <Card.Body>
              <Card.Title>All Lead Sources</Card.Title>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ListGroup variant="flush">
                  {leadSources?.map((source) => (
                    <ListGroup.Item
                      key={source._id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        {source.leadName} ({source.leadType})
                      </div>
                      <div>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(source)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(source._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LeadSource;
