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
import { fetchLeadType } from "../../../redux/feature/LeadType/LeadTypeThunx";

const LeadSource = () => {
  const [leadType, setLeadType] = useState("");
  const [sourceName, setsourceName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();

  // Lead sources slice from Redux
  const { leadsourceDetail: leadSources, loading } = useSelector(
    (state) => state.leadsource
  );

  // Lead types slice from Redux — adjust 'leadType' based on your actual slice name
  const leadTypeState = useSelector((state) => state.LeadType);

  useEffect(() => {
    dispatch(fetchLeadType());
    dispatch(fetchDetails());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!leadType || !sourceName) {
      alert("Please fill in both Lead Type and Lead Name.");
      return;
    }

    const leadData = { leadType, sourceName };

    if (isEditing) {
      dispatch(updateDetails({ id: editId, data: leadData }));
    } else {
      dispatch(createDetails(leadData));
    }

    setsourceName("");
    setLeadType("");
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (source) => {
    setEditId(source._id);
    setsourceName(source.sourceName);
    setLeadType(source.leadType);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setsourceName("");
    setLeadType("");
    setEditId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lead source?")) {
      dispatch(deleteDetails(id));
    }
  };

  return (
    <Container
      fluid
      className="p-4"
      style={{ backgroundColor: "#edf2f7", minHeight: "100vh" }}
    >
      <h3 className="mb-4">Lead Source</h3>
      <Row>
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
                    {(leadTypeState?.LeadType || []).map((item) => (
                      <option key={item._id} value={item.leadType}>
                        {item.leadType}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="sourceName">
                  <Form.Label>Lead Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={sourceName}
                    onChange={(e) => setsourceName(e.target.value)}
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
                        {source.sourceName} ({source.leadType})
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
