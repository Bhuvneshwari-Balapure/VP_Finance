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
  createOccupation,
  deleteOccupation,
  fetchOccupations,
  updateOccupation,
} from "../../../redux/feature/OccupationType/OccupationThunx";

const OccupationType = () => {
  const dispatch = useDispatch();
  const { details, loading } = useSelector((state) => state.OccupationType);
  const [occupationType, setOccupationType] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    dispatch(fetchOccupations());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (occupationType.trim()) {
      dispatch(createOccupation({ occupationType }));
      setOccupationType("");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditValue(item.occupationType);
  };

  const handleUpdate = (id) => {
    if (editValue.trim()) {
      dispatch(updateOccupation({ id, data: { occupationType: editValue } }));
      setEditId(null);
      setEditValue("");
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditValue("");
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this Occupation Type?")
    ) {
      dispatch(deleteOccupation(id));
    }
  };

  return (
    <Container fluid className="container mt-4">
      <h3 className="mb-4">Occupation Type Management</h3>
      <Row>
        <Col md={6}>
          <Card className="shadow-sm border-top border-primary">
            <Card.Body>
              <Card.Title>Add New Occupation Type</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="OccupationTypeName">
                  <Form.Label>Occupation Type Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Occupation Type name"
                    value={occupationType}
                    onChange={(e) => setOccupationType(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Add Occupation Type
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm border-top border-success">
            <Card.Body>
              <Card.Title>All Occupation Types</Card.Title>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ListGroup variant="flush">
                  {details.map((item) => (
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
                          {item.occupationType}
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

export default OccupationType;
