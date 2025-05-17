// LeadType.js
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
  createLeadType,
  deleteLeadType,
  fetchLeadType,
  updateLeadType,
} from "../../../redux/feature/LeadType/LeadTypeThunx";

const LeadType = () => {
  const dispatch = useDispatch();
  const { LeadType, loading } = useSelector((state) => state.LeadType);
  const [leadType, setLeadType] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    dispatch(fetchLeadType());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (leadType.trim()) {
      dispatch(createLeadType({ leadType }));
      setLeadType("");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditValue(item.leadType);
  };

  const handleUpdate = (id) => {
    if (editValue.trim()) {
      dispatch(updateLeadType({ id, data: { leadType: editValue } }));
      setEditId(null);
      setEditValue("");
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditValue("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Type?")) {
      dispatch(deleteLeadType(id));
    }
  };

  return (
    <Container fluid className="container mt-4">
      <h3 className="mb-4">Lead Type Management</h3>
      <Row>
        <Col md={6}>
          <Card className="shadow-sm border-top border-primary">
            <Card.Body>
              <Card.Title>Add New Lead Type</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="TypeName">
                  <Form.Label>Type Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Type name"
                    value={leadType}
                    onChange={(e) => setLeadType(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Add Type
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm border-top border-success">
            <Card.Body>
              <Card.Title>All Lead Types</Card.Title>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ListGroup variant="flush">
                  {LeadType.map((item) => (
                    <ListGroup.Item
                      key={item._id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      {editId === item._id ? (
                        <div className="d-flex w-100">
                          <Form.Control
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="me-2"
                          />
                          <Button
                            variant="success"
                            size="sm"
                            className="me-2"
                            onClick={() => handleUpdate(item._id)}
                          >
                            Save
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <>
                          {item.leadType}
                          <span>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              onClick={() => handleEdit(item)}
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
                          </span>
                        </>
                      )}
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

export default LeadType;
