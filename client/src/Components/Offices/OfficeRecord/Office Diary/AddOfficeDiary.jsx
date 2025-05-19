import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import {
  createOfficeDiary,
  fetchOfficeDiaryByID,
  updateOfficeDiary,
} from "../../../../redux/feature/OfficeDiary/OfficeDiaryThunx";
import { useDispatch, useSelector } from "react-redux";

function AddOfficeDiary({ editId, setActiveTab, setEditId }) {
  const [name, setName] = useState("");
  const [particulars, setParticulars] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.officeDiary);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!name || !pdfFile) {
  //     alert("Please fill in the required fields");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("particulars", particulars);
  //   formData.append("diaryPdf", pdfFile);

  //   dispatch(createOfficeDiary(formData));

  //   setName("");
  //   setParticulars("");
  //   setPdfFile(null);
  // };

  // eidt update
  useEffect(() => {
    if (editId) {
      dispatch(fetchOfficeDiaryByID(editId));
    }
  }, [editId, dispatch]);

  useEffect(() => {
    if (current && editId) {
      setName(current.name || "");
      setParticulars(current.particulars || "");
      // You can't prefill a file input, so you can leave setPdfFile(null)
    }
  }, [current, editId]);

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please fill in the required fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("particulars", particulars);
    if (pdfFile) formData.append("diaryPdf", pdfFile);

    if (editId) {
      dispatch(updateOfficeDiary({ id: editId, formData }));
    } else {
      if (!pdfFile) {
        alert("Please upload a PDF");
        return;
      }
      dispatch(createOfficeDiary(formData));
    }

    // Reset form
    setName("");
    setParticulars("");
    setPdfFile(null);
    setEditId(null);
    setActiveTab("view");
  };

  return (
    <Card className="p-3 mt-3">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formName">
              <Form.Label>
                <strong>Enter Name</strong>
              </Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPdf">
              <Form.Label>
                <strong>Upload PDF</strong>
              </Form.Label>
              <Form.Control
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="formParticulars" className="mt-3">
          <Form.Label>
            <strong>Enter Particulars of Doc if any</strong>
          </Form.Label>
          <Form.Control
            type="text"
            value={particulars}
            onChange={(e) => setParticulars(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Save
        </Button>
      </Form>
    </Card>
  );
}

export default AddOfficeDiary;
