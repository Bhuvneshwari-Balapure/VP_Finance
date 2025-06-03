import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Spinner } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import {
  deleteAddClientForm,
  getAllFullClients,
} from "../../../redux/feature/ClientRedux/ClientThunx";

function DisplayClient() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { clients, loading, error } = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(getAllFullClients());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      dispatch(deleteAddClientForm(id));
    }
  };

  // const handleEdit = (id) => {
  //   // navigate(`/edit-client/${id}`);
  // };

  if (loading) return <Spinner animation="border" />;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h3>Client List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Client Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={client?._id}>
              <td>{index + 1}</td>
              <td>
                {client.personalDetails?.salutation}{" "}
                {client.newFamilyMember?.name}
              </td>
              <td>{client.contactInfo?.mobileNo}</td>
              <td>{client.contactInfo?.emailId}</td>
              <td>{client.personalDetails?.groupName}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  // onClick={() => handleEdit(client._id)}
                  className="me-2"
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
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DisplayClient;
