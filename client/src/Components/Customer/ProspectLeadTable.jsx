import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Spinner, Container, Pagination } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import {
  deleteProspectLead,
  fetchProspectLeads,
  updateLeadStatus,
} from "../../redux/feature/ProspectLead/ProspectThunx";
// import { useNavigate } from "react-router-dom";

// const ProspectLeadTable = ({ setActiveTab, setEditId }) => {
const ProspectLeadTable = ({ setActiveTab, setEditId }) => {
  const dispatch = useDispatch();
  const { leads, loading, error } = useSelector((state) => state.prospectLead);

  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;

  useEffect(() => {
    dispatch(fetchProspectLeads());
  }, [dispatch]);

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = leads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(leads.length / leadsPerPage);
  // const navigate = useNavigate(); // ✅ use navigate

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      dispatch(deleteProspectLead(id));
    }
  };
  const handleEdit = (id) => {
    setEditId(id);
    setActiveTab("add");
  };

  const handleConvertStatus = (id, status) => {
    dispatch(updateLeadStatus({ id, status }))
      .unwrap()
      .then(() => dispatch(fetchProspectLeads()));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading)
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" /> Loading leads...
      </Container>
    );

  if (error)
    return <Container className="text-danger mt-4">Error: {error}</Container>;

  return (
    <Container className="mt-4">
      <h3 className="mb-3">Prospect Leads</h3>

      <Table striped bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Address</th>
            <th>City</th>
            <th>Group</th>
            <th>Actions</th>
            <th>Convert</th>
          </tr>
        </thead>
        <tbody>
          {currentLeads.map((lead, index) => (
            <tr key={lead._id}>
              <td>{index + 1}</td>
              <td>
                {lead.personalDetails?.salutation}{" "}
                {lead.personalDetails?.familyHead}
              </td>
              <td>{lead.personalDetails?.mobile}</td>
              <td>{lead.personalDetails?.email}</td>
              <td>{lead.personalDetails?.preferredMeetingAddr}</td>
              <td>{lead.personalDetails?.city}</td>
              <td>{lead.personalDetails?.group}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(lead._id)}
                  title="Edit"
                >
                  <PencilSquare />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(lead._id)}
                  title="Delete"
                >
                  <Trash />
                </Button>
              </td>
              <td>
                {/* Show "To Client" button only if not already client */}
                {lead.status !== "client" && (
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2"
                    onClick={() => handleConvertStatus(lead._id, "client")}
                  >
                    To Client
                  </Button>
                )}

                {/* Always show "To Suspect" button */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleConvertStatus(lead._id, "suspect")}
                >
                  To Suspect
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item
            key={idx + 1}
            active={idx + 1 === currentPage}
            onClick={() => paginate(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </Container>
  );
};

export default ProspectLeadTable;
