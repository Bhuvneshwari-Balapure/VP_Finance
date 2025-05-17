import React from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

function RegistrarDetail({ setActiveTab, setEditId }) {
  const registrarData = [
    {
      id: "1",
      registrar: "CAMS",
      arn: "84437",
      euin: "E069905",
      username: "ARN-84437",
      password: "",
      expiryDate: "2027-09-18",
    },
    {
      id: "2",
      registrar: "CAMS",
      arn: "84437",
      euin: "",
      username: "ARN-84437",
      password: "",
      expiryDate: "",
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          Show
          <select className="mx-2">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          entries
        </div>
        <div>
          Search:
          <input type="text" className="mx-2" />
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Registrar</th>
            <th>ARN No</th>
            <th>EUIN No</th>
            <th>Username</th>
            <th>Password</th>
            <th>Expiry Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {registrarData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.registrar}</td>
              <td>{item.arn}</td>
              <td>{item.euin}</td>
              <td>{item.username}</td>
              <td>{item.password}</td>
              <td>{item.expiryDate}</td>
              <td>
                <Button
                  variant="link"
                  onClick={() => {
                    setEditId(item.id);
                    setActiveTab("add");
                  }}
                >
                  <FaEdit />
                </Button>
                <Button variant="link" className="text-danger">
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center">
        <div>
          Showing 1 to {registrarData.length} of {registrarData.length} entries
        </div>
        <div>
          <Button variant="light" size="sm" disabled>
            Previous
          </Button>
          <Button variant="primary" size="sm" className="mx-1">
            1
          </Button>
          <Button variant="light" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RegistrarDetail;
