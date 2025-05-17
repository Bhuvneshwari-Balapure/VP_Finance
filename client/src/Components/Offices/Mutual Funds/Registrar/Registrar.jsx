import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function Registrar() {
  return (
    <div className="p-4">
      <h5 className="text-center mb-4">MUTUAL FUND</h5>
      <Form>
        <Row>
          <Col md={3}>
            <Form.Group controlId="financialProduct">
              <Form.Label>Financial Product</Form.Label>
              <Form.Select>
                <option>Mutual Funds</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="arn1">
              <Form.Label>ARN No 1</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="euin1">
              <Form.Label>EUIN No 1</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="expiry1">
              <Form.Label>Expiry Date 1</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={3}>
            <Form.Group controlId="nimsEmail1">
              <Form.Label>NIMS Email 1</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="nimsPassword1">
              <Form.Label>NIMS Password 1</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="arn2">
              <Form.Label>ARN No 2</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="euin2">
              <Form.Label>EUIN No 2</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={3}>
            <Form.Group controlId="expiry2">
              <Form.Label>Expiry Date 2</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="nimsEmail2">
              <Form.Label>NIMS Email 2</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="nimsPassword2">
              <Form.Label>NIMS Password 2</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
          </Col>
        </Row>

        <h5 className="text-center mt-4 mb-3">REGISTRAR</h5>

        <Row>
          <Col md={3}>
            <Form.Group controlId="registrarName">
              <Form.Label>Registrar Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="localOfficeAddress">
              <Form.Label>Local Office Address</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="contactNo">
              <Form.Label>Contact No</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="emailId">
              <Form.Label>Email Id</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={3}>
            <Form.Group controlId="branchManager">
              <Form.Label>Branch Manager Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="branchManagerMobile">
              <Form.Label>Branch Manager Mobile</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="headOfficeAddress">
              <Form.Label>Head Office Address</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="headOfficeContact">
              <Form.Label>Head Office Contact</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={3}>
            <Form.Group controlId="headOfficeEmail">
              <Form.Label>Head Office Email</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="website">
              <Form.Label>Website</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="rmName">
              <Form.Label>Relationship Manager Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="rmDOB">
              <Form.Label>Relationship Manager DOB</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={3}>
            <Form.Group controlId="rmMobile">
              <Form.Label>Relationship Manager Mobile</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="rmEmail">
              <Form.Label>Relationship Manager Email</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="portalLink">
              <Form.Label>Portal Link</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="altPortalLink">
              <Form.Label>Alternate Portal Link</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>

        {/* Login Section */}
        <Row className="mt-3">
          {[1, 2, 3].map((num) => (
            <React.Fragment key={num}>
              <Col md={3}>
                <Form.Group controlId={`loginName${num}`}>
                  <Form.Label>Login Name {num}</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId={`username${num}`}>
                  <Form.Label>Username {num}</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId={`password${num}`}>
                  <Form.Label>Password {num}</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>
              </Col>
            </React.Fragment>
          ))}
        </Row>

        {/* App Section */}
        <Row className="mt-3">
          {[1, 2].map((num) => (
            <React.Fragment key={num}>
              <Col md={3}>
                <Form.Group controlId={`appName${num}`}>
                  <Form.Label>App Name</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId={`appUsername${num}`}>
                  <Form.Label>App Username</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId={`appPassword${num}`}>
                  <Form.Label>App Password</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>
              </Col>
            </React.Fragment>
          ))}
        </Row>

        <Row className="mt-3">
          <Col md={12}>
            <Form.Group controlId="remark">
              <Form.Label>Remark</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Registrar;
