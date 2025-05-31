import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Spinner, Container, Pagination } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import {
  deleteProspectLead,
  fetchProspectLeads,
} from "../../redux/feature/ProspectLead/ProspectThunx";

// const ProspectLeadTable = ({ setActiveTab, setEditId }) => {
const ProspectLeadTable = ({
  setActiveTab,
  setEditId,
  setEditClientFormData,
}) => {
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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      dispatch(deleteProspectLead(id));
    }
  };
  const handleEdit = (id) => {
    setEditId(id);
    setActiveTab("add");
  };

  const handleConvertToClient = (prospect) => {
    const mappedClientData = {
      personalDetails: {
        grade: prospect.grade || "",
        salutation: prospect.salutation || "",
        groupName: "",
        groupCode: "",
        residenceAddress: prospect.resiAddr || "",
        officeAddress: prospect.officeAddr || "",
        landMark: prospect.resiLandmark || "",
        meetingAddress: prospect.preferredMeetingAddr || "",
        bestTime: "",
        occupation: prospect.occupationType || "",
        organisation: prospect.organisation || "",
        designation: prospect.designation || "",
      },
      contactInfo: {
        mobileNo: prospect.mobile || "",
        whatsappNo: prospect.whatsapp || "",
        emailId: prospect.email || "",
        paName: "",
        paMobileNo: "",
      },
      leadInfo: {
        leadOccupation: prospect.leadOccupation || "",
        leadOccupationType: prospect.occupationType || "",
        leadSource: prospect.leadSource || "",
        leadPerson: prospect.leadName || "",
        adharNumber: "",
        panCardNumber: "",
        allocatedCRE: "",
      },
      preferences: {
        hobbies: "",
        nativePlace: "",
        socialLink: "",
        habits: "",
      },
      education: {
        type: "",
        schoolName: "",
        schoolSubjects: "",
        collegeName: "",
        collegeCourse: "",
        instituteName: "",
        professionalDegree: "",
      },
      newFamilyMember: {
        title: "",
        name: "",
        relation: "",
        dobActual: "",
        dobRecord: "",
        marriageDate: "",
        occupation: "",
        annualIncome: "",
        includeHealth: false,
        healthHistory: {
          submissionDate: "",
          diseaseName: "",
          since: "",
          height: "",
          weight: "",
          remark: "",
        },
      },
      familyMembers: [],
      financialInfo: {
        insuranceInvestment: [],
        loans: [],
        futurePriorities: [],
      },
    };

    setEditClientFormData(mappedClientData); // 👈 Pass data to parent
    setActiveTab("clientForm"); // 👈 Navigate to form
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
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>City</th>
            <th>Actions</th>
            <th>Convert</th>
          </tr>
        </thead>
        <tbody>
          {currentLeads.map((lead) => (
            <tr key={lead._id}>
              <td>
                {lead.salutation} {lead.familyHead}
              </td>
              <td>
                <span>{lead.mobile}</span>
              </td>
              <td>
                <span>{lead.preferredMeetingAddr}</span>
              </td>
              <td>
                <span>{lead.city}</span>
              </td>
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
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleConvertToClient(lead)}
                >
                  To Client
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
