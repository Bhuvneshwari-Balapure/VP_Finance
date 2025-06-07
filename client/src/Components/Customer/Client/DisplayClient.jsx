import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Spinner } from "react-bootstrap";
import {
  deleteAddClientForm,
  getAllFullClients,
  updateClientLeadStatus,
} from "../../../redux/feature/ClientRedux/ClientThunx";

function DisplayClient({ setActiveTab, setEditId }) {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(getAllFullClients());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      dispatch(deleteAddClientForm(id));
    }
  };
  const handleEdit = (id) => {
    // setEditId(id);
    // setActiveTab("add");
    console.log(id);
  };

  // const handleConvert = (id) => {
  //   // Implement your convert logic here
  //   console.log("Convert client with ID:", id);
  // };

  if (loading)
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" />
      </div>
    );
  if (error) return <p className="text-danger">{error}</p>;
  const handleConvertStatus = (id, status) => {
    dispatch(updateClientLeadStatus({ id, status }))
      .unwrap()
      .then(() => dispatch(getAllFullClients()));
  };

  return (
    <div className="container mt-4">
      <h3>Client List</h3>
      <Table striped bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Address</th>
            <th>City</th>
            {/* <th>Group</th> */}
            <th>Actions</th>
            <th>Convert</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => {
            const personal = client.personalDetails || {};
            const contact = client.contactInfo || {};

            const name = `${personal.salutation || ""} ${
              personal.familyHead || personal.name || ""
            }`.trim();
            const mobile = contact.mobileNo || personal.mobile || "";
            const email = contact.emailId || personal.email || "";
            const address =
              personal.preferredMeetingAddr ||
              personal.resiAddr ||
              personal.officeAddr ||
              "-";
            const city = personal.city || "-";
            // const group = personal.group || "-";

            return (
              <tr key={client._id}>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>{mobile}</td>
                <td>{email}</td>
                <td>{address}</td>
                <td>{city}</td>
                {/* <td>{group}</td> */}
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(client._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(client._id)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleConvertStatus(client._id, "prospect")}
                  >
                    To Prospect
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default DisplayClient;
