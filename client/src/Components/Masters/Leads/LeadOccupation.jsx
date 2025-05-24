import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeadOccupationDetails,
  createDetails,
  updateDetails,
  deleteDetails,
} from "../../../redux/feature/LeadOccupation/OccupationThunx";
import { fetchOccupations } from "../../../redux/feature/OccupationType/OccupationThunx";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";

const LeadOccupation = () => {
  const [leadOccupation, setLeadOccupation] = useState("");
  const [occupationName, setoccupationName] = useState("");
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();
  const { details, loading, error } = useSelector(
    (state) => state.leadOccupation
  );
  const occupationType = useSelector((state) => state.OccupationType);
  console.log(occupationType, "occupation type");

  useEffect(() => {
    dispatch(fetchLeadOccupationDetails());
    dispatch(fetchOccupations());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!leadOccupation || !occupationName) return;

    if (editId) {
      dispatch(
        updateDetails({ id: editId, data: { occupationName, leadOccupation } })
      );
    } else {
      dispatch(createDetails({ occupationName, leadOccupation }));
    }

    setoccupationName("");
    setLeadOccupation("");
    setEditId(null);
  };

  const handleEdit = (item) => {
    setoccupationName(item.occupationName);
    setLeadOccupation(item.leadOccupation);
    setEditId(item._id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this occupation?")) {
      dispatch(deleteDetails(id));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container
      fluid
      className="p-4"
      style={{ backgroundColor: "#edf2f7", minHeight: "100vh" }}
    >
      <h3 className="mb-4">Lead Occupation</h3>
      <Row>
        {/* Left Side - Add Lead Occupation */}
        <Col md={6}>
          <Card className="shadow-sm border-top border-primary">
            <Card.Body>
              <Card.Title>{editId ? "Edit" : "Add"} Lead Occupation</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="leadOccupation">
                  <Form.Label>Lead Occupation</Form.Label>
                  <Form.Select
                    value={leadOccupation}
                    onChange={(e) => setLeadOccupation(e.target.value)}
                    required
                  >
                    <option value="">--Choose--</option>
                    {(occupationType?.details || []).map((item) => (
                      <option key={item._id} value={item.occupationType}>
                        {item.occupationType}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="leadName">
                  <Form.Label>Lead Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={occupationName}
                    onChange={(e) => setoccupationName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="primary" disabled={loading}>
                  {editId ? "Update" : "Submit"}
                </Button>
                {editId && (
                  <Button
                    variant="secondary"
                    className="ms-2"
                    onClick={() => {
                      setoccupationName("");
                      setLeadOccupation("");
                      setEditId(null);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Side - All Lead Occupations */}
        <Col md={6}>
          <Card className="shadow-sm border-top border-success">
            <Card.Body>
              <Card.Title>All Lead Occupations</Card.Title>
              <ListGroup variant="flush">
                {Array.isArray(details) &&
                  details.map((item) => (
                    <ListGroup.Item
                      key={item._id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        {item.leadName} ({item.leadOccupation})
                      </div>
                      <div>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="me-2"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LeadOccupation;
