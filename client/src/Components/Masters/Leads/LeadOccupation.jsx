// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';

// const LeadOccupation = () => {
//   const [leadType, setLeadType] = useState('');
//   const [leadName, setLeadName] = useState('');
//   const [leadOccupations, setLeadOccupations] = useState([
//     'Barkatullah (Organization Data)',
//     'Facebook (Digital Platform)',
//     'Instagram (Digital Platform)',
//     'Google Search (Digital Platform)',
//     'Youtube (Digital Platform)',

//   ]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (leadType && leadName) {
//       const newEntry = `${leadName} (${leadType})`;
//       setLeadOccupations([...leadOccupations, newEntry]);
//       setLeadName('');
//       setLeadType('');
//     }
//   };

//   return (
//     <Container fluid className="p-4" style={{ backgroundColor: '#edf2f7', minHeight: '100vh' }}>
//       <h3 className="mb-4">Lead Occupation</h3>
//       <Row>
//         {/* Left Side - Add Lead Occupation */}
//         <Col md={6}>
//           <Card className="shadow-sm border-top border-primary">
//             <Card.Body>
//               <Card.Title>Add Lead Occupation</Card.Title>
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3" controlId="leadOccupation">
//                   <Form.Label>Lead Occupation</Form.Label>
//                   <Form.Select
//                     value={leadType}
//                     onChange={(e) => setLeadType(e.target.value)}
//                   >
//                     <option value="">--Choose--</option>
//                     <option value="Digital Platform">Digital Platform</option>
//                     <option value="Organization Data">Organization Data</option>
//                     <option value="Administrator Referral">Administrator Referral</option>
//                   </Form.Select>
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="leadName">
//                   <Form.Label>Lead Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter Name"
//                     value={leadName}
//                     onChange={(e) => setLeadName(e.target.value)}
//                   />
//                 </Form.Group>

//                 <Button type="submit" variant="primary">submit</Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Right Side - All Lead Occupations */}
//         <Col md={6}>
//           <Card className="shadow-sm border-top border-success">
//             <Card.Body>
//               <Card.Title>All Lead Occupation</Card.Title>
//               <ListGroup variant="flush">
//                 {leadOccupations.map((Occupation, index) => (
//                   <ListGroup.Item
//                     key={index}
//                     className="d-flex justify-content-between align-items-center"
//                   >
//                     {Occupation}
//                     <span>
//                       <i className="fas fa-edit text-primary me-3" style={{ cursor: 'pointer' }}></i>
//                       <i className="fas fa-trash-alt text-danger" style={{ cursor: 'pointer' }}></i>
//                     </span>
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default LeadOccupation;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDetails,
  createDetails,
  updateDetails,
  deleteDetails,
} from "../../../redux/feature/LeadOccupation/OccupationThunx";
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
  const [leadName, setLeadName] = useState("");
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();
  const { details, loading, error } = useSelector(
    (state) => state.leadOccupation
  );

  // Fetch all lead occupations on component mount
  useEffect(() => {
    dispatch(fetchDetails());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!leadOccupation || !leadName) return;

    if (editId) {
      // Update existing occupation
      dispatch(
        updateDetails({ id: editId, data: { leadName, leadOccupation } })
      );
    } else {
      // Create new occupation
      dispatch(createDetails({ leadName, leadOccupation }));
    }

    // Reset form
    setLeadName("");
    setLeadOccupation("");
    setEditId(null);
  };

  const handleEdit = (item) => {
    setLeadName(item.leadName);
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
                    <option value="Businessman">Businessman</option>
                    <option value="Private Service">Private Service</option>
                    <option value="Government Service">
                      Government Service
                    </option>
                    <option value="Retiered Person">Retiered Person</option>
                    <option value="Agreeculturist">Agreeculturist</option>
                    <option value="Housewife">Housewife</option>
                    <option value="Student">Student</option>
                    <option value="Not Specified">Not Specified</option>
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

                <Button type="submit" variant="primary" disabled={loading}>
                  {editId ? "Update" : "Submit"}
                </Button>
                {editId && (
                  <Button
                    variant="secondary"
                    className="ms-2"
                    onClick={() => {
                      setLeadName("");
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
