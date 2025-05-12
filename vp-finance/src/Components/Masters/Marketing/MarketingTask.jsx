import React, { useState } from 'react';
import { Tab, Tabs, Modal, Button, Form, Table, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import AddTask from "./AddTask"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const MarketingTask = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('view');

  // State for form data
  const [formData, setFormData] = useState({
    cat: '',
    sub: '',
    depart: '',
    name: '',
    workdetail: '',
    type: 'composite',
    image: null,
    old_img: ''
  });

  // State for companies based on selected category
  const [companies, setCompanies] = useState([]);

  // State for task data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      financialProduct: '',
      companyName: '',
      employee: '',
      taskName: '',
      description: '',
      checklist: '',
      sms: '',
      email: `Annual Assessment Sheet\n\nAssessment for the Year……………………… Date of Assessment …………………………….\n\nName of Employee ………………………designation…………..Date of Appointment …………………\n\n1. Quarterly Sales Target Achievement\n\n[Table with quarterly data]\n\n2. Customer Services Assessment\n\n[Table with service data]\n\n3. Achievement in Prospects Generation\n\n[Table with prospects data]\n\n4. From Director's Desk\n\n[Evaluation criteria table]\n\n5. Recommendation\n\n[Signature section]`,
      whatsapp: ''
    },
    {
      id: 2,
      financialProduct: 'Life Insurance',
      companyName: 'LIC OF INDIA',
      employee: 'OE',
      taskName: 'Ankit',
      description: 'Ankit Testing',
      checklist: 'check 2',
      sms: 'sms',
      email: 'email',
      whatsapp: 'whatsapp'
    }
  ]);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // State for modals
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // If category changes, update companies
    if (name === 'cat') {
      getCategory(value);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  // Handle editor change
  const handleEditorChange = (event, editor) => {
    setFormData({
      ...formData,
      workdetail: editor.getData()
    });
  };

  // Simulate getting companies based on category
  const getCategory = (categoryId) => {
    const companyOptions = {
      '1': ['LIC OF INDIA', 'HDFC Life', 'SBI Life', 'ICICI Prudential'],
      '2': ['HDFC Mutual Fund', 'SBI Mutual Fund', 'ICICI Mutual Fund'],
      '3': ['Apollo Munich', 'Max Bupa', 'Religare Health'],
      '4': ['Bajaj Allianz', 'ICICI Lombard', 'New India Assurance'],
      '5': ['HDFC Home Loan', 'SBI Home Loan', 'LIC Housing Finance'],
      '6': ['DLF', 'Godrej Properties', 'Sobha Developers'],
      '7': ['Composite Document 1', 'Composite Document 2']
    };

    setCompanies(companyOptions[categoryId] || []);
    setFormData(prev => ({
      ...prev,
      cat: categoryId,
      sub: ''
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: tasks.length + 1,
      financialProduct: formData.cat,
      companyName: formData.sub,
      employee: formData.depart,
      taskName: formData.name,
      description: formData.workdetail,
      checklist: '',
      sms: '',
      email: '',
      whatsapp: ''
    };

    setTasks([...tasks, newTask]);
    setFormData({
      cat: '',
      sub: '',
      depart: '',
      name: '',
      workdetail: '',
      type: 'composite',
      image: null,
      old_img: ''
    });
    setCompanies([]);
    alert('Task template added successfully!');
  };

  // Handle delete task
  const handleDelete = (id) => {
    if (window.confirm('Are you sure want to delete?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  // Open modal with task details
  const openModal = (type, task) => {
    setCurrentTask(task);
    switch (type) {
      case 'detail':
        setShowDetailModal(true);
        break;
      case 'checklist':
        setShowChecklistModal(true);
        break;
      case 'sms':
        setShowSmsModal(true);
        break;
      case 'email':
        setShowEmailModal(true);
        break;
      default:
        break;
    }
  };

  // Pagination logic
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = tasks.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(tasks.length / entriesPerPage);

  return (
    <div className="">
      <h4>Marketing task</h4>
      <div className="row">
        <div className="col-md-12">
          <div className="card card-primary card-outlin">
            <div style={{backgroundColor:"#ECECEC"}}className="card-header">
              <Tabs 
                id="task-tabs"
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-3"
              >
                <Tab eventKey="view" title={<b>View Data</b>} />
                <Tab eventKey="add" title={<b>Add Task Template</b>} />
              </Tabs>
            </div>

            <div className="card-body">
              {activeTab === 'view' && (
                <div className="table-responsive">
                  <div className="row mb-3">
                    <div className="col-sm-6">
                      <div className="dataTables_length">
                        <label>
                          Show{' '}
                          <select
                            className="form-control form-control-sm"
                            value={entriesPerPage}
                            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                          >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                          </select>{' '}
                          entries
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="dataTables_filter float-right">
                        <label>
                          Search:
                          <input
                            type="search"
                            className="form-control form-control-sm"
                            placeholder=""
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Financial Product</th>
                        <th>Co. Name</th>
                        <th>Emp</th>
                        <th>Task</th>
                        <th>Description</th>
                        <th>Checklist</th>
                        <th>Sms</th>
                        <th>Email</th>
                        <th>Whatsapp</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentEntries.map((task, index) => (
                        <tr key={task.id}>
                          <td>{indexOfFirstEntry + index + 1}</td>
                          <td>{task.financialProduct}</td>
                          <td>{task.companyName}</td>
                          <td>{task.employee}</td>
                          <td>{task.taskName}</td>
                          <td>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => openModal('detail', task)}
                            >
                              View
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => openModal('checklist', task)}
                            >
                              View
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() => openModal('sms', task)}
                            >
                              View
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => openModal('email', task)}
                            >
                              View
                            </Button>
                          </td>
                          <td className="text-center">
                            <a
                              href={`https://api.whatsapp.com/send?phone=+919425009228&text=${task.whatsapp || '.'}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src="https://static.cdnlogo.com/logos/w/35/whatsapp-icon.svg"
                                width="25"
                                alt="WhatsApp"
                              />
                            </a>
                          </td>
                          <td>
                            <div className="btn-group" role="group">
                              <Button
                                variant="link"
                                className="text-primary"
                                onClick={() => {
                                  alert(`Edit task ${task.id}`);
                                }}
                              >
                                <i className="fa fa-pencil"></i>
                              </Button>
                              <Button
                                variant="link"
                                className="text-danger"
                                onClick={() => handleDelete(task.id)}
                              >
                                <i className="fa fa-trash"></i>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  <div className="row">
                    <div className="col-sm-5">
                      <div className="dataTables_info">
                        Showing {indexOfFirstEntry + 1} to{' '}
                        {Math.min(indexOfLastEntry, tasks.length)} of{' '}
                        {tasks.length} entries
                      </div>
                    </div>
                    <div className="col-sm-7">
                      <Pagination className="float-right">
                        <Pagination.Prev
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(currentPage - 1)}
                        />
                        {[...Array(totalPages)].map((_, i) => (
                          <Pagination.Item
                            key={i + 1}
                            active={i + 1 === currentPage}
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </Pagination.Item>
                        ))}
                        <Pagination.Next
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(currentPage + 1)}
                        />
                      </Pagination>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'add' && (
               <div>
                <AddTask />
               </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <b>{currentTask?.taskName || ''} Description</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentTask?.description || 'No description available'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showChecklistModal} onHide={() => setShowChecklistModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <b>{currentTask?.taskName || ''} Checklist</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>
            <center>
              <h5>{currentTask?.checklist || 'No checklist available'}</h5>
            </center>
          </b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowChecklistModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSmsModal} onHide={() => setShowSmsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <b>{currentTask?.taskName || ''} SMS</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentTask?.sms || 'No SMS template available'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSmsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <b>{currentTask?.taskName || ''} EMAIL</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div dangerouslySetInnerHTML={{ __html: currentTask?.email || 'No email template available' }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEmailModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MarketingTask;