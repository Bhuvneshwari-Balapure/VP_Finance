import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Spinner, Container, Pagination } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import {
  fetchSuspectLeads,
  deleteSuspectLead,
  updateSuspectLead,
  // updateSuspectLead,
} from "../../redux/feature/SuspectLead/SuspectLeadThunx";

const SuspectLeadsTable = ({ setActiveTab, setEditId }) => {
  const dispatch = useDispatch();
  const { leads, loading, error } = useSelector((state) => state.suspectLead);

  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;

  useEffect(() => {
    dispatch(fetchSuspectLeads());
  }, [dispatch]);

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = leads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(leads.length / leadsPerPage);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      dispatch(deleteSuspectLead(id));
    }
  };
  const handleEdit = (id) => {
    setEditId(id);
    setActiveTab("add");
  };

  const handleConvertToProspect = (lead) => {
    if (window.confirm("Convert this lead to a Prospect?")) {
      dispatch(
        updateSuspectLead({
          id: lead._id,
          leadData: { ...lead, status: "prospect" },
        })
      )
        .unwrap()
        .then(() => {
          alert("Lead successfully converted to Prospect.");
          dispatch(fetchSuspectLeads()); // Refresh suspect leads
        })
        .catch((err) => {
          console.error("Conversion error:", err);
          alert("Failed to convert to Prospect.");
        });
    }
  };
  const handleConvertToClient = (lead) => {
    if (window.confirm("Convert this lead to a Client?")) {
      dispatch(
        updateSuspectLead({
          id: lead._id,
          leadData: { ...lead, status: "client" },
        })
      )
        .unwrap()
        .then(() => {
          alert("Lead successfully converted to Client.");
          dispatch(fetchSuspectLeads());
        })
        .catch((err) => {
          console.error("Conversion error:", err);
          alert("Failed to convert to Client.");
        });
    }
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
      <h3 className="mb-3">Suspect Leads</h3>

      <Table striped bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>City</th>
            {/* <th>Group</th> */}
            <th>Actions</th>
            <th>Convert</th>
          </tr>
        </thead>
        <tbody>
          {currentLeads.map((lead, index) => (
            <tr key={lead._id}>
              <td>{(currentPage - 1) * leadsPerPage + index + 1}</td>
              <td>
                {lead.personalDetails?.salutation}{" "}
                {lead.personalDetails?.familyHead}
              </td>
              <td>{lead.personalDetails?.contactNo}</td>
              <td>{lead.personalDetails?.email}</td>
              <td>{lead.personalDetails?.preferredMeetingAddr}</td>
              <td>{lead.personalDetails?.city}</td>
              {/* <td>{lead.personalDetails?.group}</td> */}
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
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleConvertToProspect(lead)}
                  >
                    To Prospect
                  </Button>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleConvertToClient(lead)}
                  >
                    To Client
                  </Button>
                </td>
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

export default SuspectLeadsTable;
