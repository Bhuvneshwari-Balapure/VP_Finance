import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FaPlus, FaTrash, FaPaperclip, FaCheck } from 'react-icons/fa';

const Addtask = () => {
  const [formData, setFormData] = useState({
    cat: '',
    sub: '',
    depart: '',
    name: '',
    type: 'composite',
    descp: '',
    email_descp: '',
    sms_descp: '',
    whatsapp_descp: '',
    checklists: [''],
    formChecklists: [{ name: '', file: null }],
    image: null,
    old_img: ''
  });

  const [activeTab, setActiveTab] = useState('tab_1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditorChange = (editor, data, field) => {
    setFormData(prev => ({ ...prev, [field]: data }));
  };

  const addChecklist = () => {
    setFormData(prev => ({
      ...prev,
      checklists: [...prev.checklists, '']
    }));
  };

  const updateChecklist = (index, value) => {
    const newChecklists = [...formData.checklists];
    newChecklists[index] = value;
    setFormData(prev => ({ ...prev, checklists: newChecklists }));
  };

  const removeChecklist = (index) => {
    const newChecklists = [...formData.checklists];
    newChecklists.splice(index, 1);
    setFormData(prev => ({ ...prev, checklists: newChecklists }));
  };

  const addFormChecklist = () => {
    setFormData(prev => ({
      ...prev,
      formChecklists: [...prev.formChecklists, { name: '', file: null }]
    }));
  };

  const updateFormChecklist = (index, field, value) => {
    const newFormChecklists = [...formData.formChecklists];
    newFormChecklists[index][field] = value;
    setFormData(prev => ({ ...prev, formChecklists: newFormChecklists }));
  };

  const removeFormChecklist = (index) => {
    const newFormChecklists = [...formData.formChecklists];
    newFormChecklists.splice(index, 1);
    setFormData(prev => ({ ...prev, formChecklists: newFormChecklists }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategory = (value) => {
    console.log('Selected category:', value);
    // Simulate subcategory data based on category
    const subCategories = {
      '1': ['LIC', 'HDFC Life', 'ICICI Prudential'],
      '2': ['SBI Mutual Fund', 'HDFC Mutual Fund', 'ICICI Mutual Fund'],
      '3': ['Star Health', 'HDFC Ergo', 'ICICI Lombard'],
      '4': ['Bajaj Allianz', 'New India Assurance', 'United India'],
      '5': ['HDFC Home Loan', 'SBI Home Loan', 'LIC Housing'],
      '6': ['DLF', 'Godrej Properties', 'Prestige Group'],
      '7': ['Composite 1', 'Composite 2', 'Composite 3']
    };

    if (value && subCategories[value]) {
      const subSelect = document.getElementById('sub_category');
      if (subSelect) {
        subSelect.innerHTML = '<option value="">Choose Company Name</option>' +
          subCategories[value].map(opt => `<option value="${opt}">${opt}</option>`).join('');
      }
    }
  };

  const tabConfig = [
    { id: 'tab_1', label: 'Work Description', icon: '📝' },
    { id: 'tab_2', label: 'Checklist', icon: '✅' },
    { id: 'tab_6', label: 'Download Forms', icon: '📄' },
    { id: 'tab_3', label: 'Email Templates', icon: '✉️' },
    { id: 'tab_4', label: 'SMS Templates', icon: '📱' },
    { id: 'tab_5', label: 'WhatsApp Templates', icon: '💬' },
    { id: 'tab_7', label: 'Sample Form', icon: '📋' }
  ];

  return (
    <div className="">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h3 className="card-title">Task Management Form</h3>
          <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse">
              <i className="fas fa-minus"></i>
            </button>
          </div>
        </div>

        <form id='forming' onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="font-weight-bold">Financial Product</label>
                  <select
                    name="cat"
                    className="form-control select2"
                    onChange={(e) => {
                      handleChange(e);
                      getCategory(e.target.value);
                    }}
                    value={formData.cat}
                  >
                    <option value="">Choose Financial Product</option>
                    <option value="1">Life Insurance</option>
                    <option value="2">Mutual Funds</option>
                    <option value="3">Health Insurance</option>
                    <option value="4">General Insurance</option>
                    <option value="5">Home Loan</option>
                    <option value="6">Real Estate</option>
                    <option value="7">Composit Documents</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label className="font-weight-bold">Company Name</label>
                  <select
                    id="sub_category"
                    name="sub"
                    className="form-control select2"
                    value={formData.sub}
                    onChange={handleChange}
                  >
                    <option value="">Choose Company Name</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row ">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="font-weight-bold">Employee Type</label>
                  <select
                    name="depart"
                    className="form-control select2"
                    value={formData.depart}
                    onChange={handleChange}
                  >
                    <option value="">Choose Employee</option>
                    <option value="OA">OA</option>
                    <option value="OE">OE</option>
                    <option value="CRE">CRE</option>
                    <option value="Telemarketer">Telemarketer</option>
                    <option value="Telecaller">Telecaller</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label className="font-weight-bold">Task Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter task name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <input type="hidden" name="type" value="composite" />

            <div className="nav-tabs-custom mt-4">
              <ul className="nav nav-pills nav-fill mb-4">
                {tabConfig.map(tab => (
                  <li key={tab.id} className="nav-item">
                    <button
                      type="button"
                      className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="tab-content p-3 border border-top-0 rounded-bottom">
                {/* Work Description Tab */}
                <div className={`tab-pane fade ${activeTab === 'tab_1' ? 'show active' : ''}`} id="tab_1">
                  <div className="card">
                    <div className="card-header bg-light">
                      <h4 className="card-title">Work Description</h4>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Detailed Description</label>
                        <CKEditor
                          editor={ClassicEditor}
                          data={formData.descp}
                          onChange={(event, editor) => handleEditorChange(editor, editor.getData(), 'descp')}
                          config={{
                            toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo']
                          }}
                        />
                      </div>
                      <div className="form-group mt-4">
                        <label>Attach File</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            name="image"
                            className="custom-file-input"
                            id="customFile"
                            onChange={handleChange}
                          />
                          <label className="custom-file-label" htmlFor="customFile">
                            {formData.image ? formData.image.name : 'Choose file'}
                          </label>
                        </div>
                        <input
                          type="hidden"
                          name="old_img"
                          value={formData.old_img}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checklist Template Tab */}
                <div className={`tab-pane fade ${activeTab === 'tab_2' ? 'show active' : ''}`} id="tab_2">
                  <div className="card">
                    <div className="card-header bg-light">
                      <div className="d-flex justify-content-between align-items-center">
                        <h4 className="card-title">Checklist Items</h4>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={addChecklist}
                        >
                          <FaPlus className="mr-1" /> Add Item
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      {formData.checklists.map((checklist, index) => (
                        <div key={index} className="form-group row align-items-center mb-3">
                          <div className="col-sm-10">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">{index + 1}</span>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={`Checklist item ${index + 1}`}
                                value={checklist}
                                onChange={(e) => updateChecklist(index, e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-sm-2">
                            {index > 0 && (
                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() => removeChecklist(index)}
                              >
                                <FaTrash />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email Templates Tab */}
                <div className={`tab-pane fade ${activeTab === 'tab_3' ? 'show active' : ''}`} id="tab_3">
                  <div className="card">
                    <div className="card-header bg-light">
                      <h4 className="card-title">Email Template</h4>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Email Content</label>
                        <CKEditor
                          editor={ClassicEditor}
                          data={formData.email_descp}
                          onChange={(event, editor) => handleEditorChange(editor, editor.getData(), 'email_descp')}
                          config={{
                            toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo']
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Templates Tab */}
                <div className={`tab-pane fade ${activeTab === 'tab_4' ? 'show active' : ''}`} id="tab_4">
                  <div className="card">
                    <div className="card-header bg-light">
                      <h4 className="card-title">SMS Template</h4>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label>SMS Content</label>
                        <CKEditor
                          editor={ClassicEditor}
                          data={formData.sms_descp}
                          onChange={(event, editor) => handleEditorChange(editor, editor.getData(), 'sms_descp')}
                          config={{
                            toolbar: ['bold', 'italic', '|', 'undo', 'redo']
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Whatsapp Templates Tab */}
                <div className={`tab-pane fade ${activeTab === 'tab_5' ? 'show active' : ''}`} id="tab_5">
                  <div className="card">
                    <div className="card-header bg-light">
                      <h4 className="card-title">WhatsApp Template</h4>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label>WhatsApp Message</label>
                        <CKEditor
                          editor={ClassicEditor}
                          data={formData.whatsapp_descp}
                          onChange={(event, editor) => handleEditorChange(editor, editor.getData(), 'whatsapp_descp')}
                          config={{
                            toolbar: ['bold', 'italic', '|', 'undo', 'redo']
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download Form Tab */}
                <div className={`tab-pane fade ${activeTab === 'tab_6' ? 'show active' : ''}`} id="tab_6">
                  <div className="card">
                    <div className="card-header bg-light">
                      <div className="d-flex justify-content-between align-items-center">
                        <h4 className="card-title">Downloadable Forms</h4>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={addFormChecklist}
                        >
                          <FaPlus className="mr-1" /> Add Form
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      {formData.formChecklists.map((item, index) => (
                        <div key={index} className="form-row mb-3 align-items-center">
                          <div className="col-md-5 mb-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Form name"
                              value={item.name}
                              onChange={(e) => updateFormChecklist(index, 'name', e.target.value)}
                            />
                          </div>
                          <div className="col-md-5 mb-2">
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id={`formFile_${index}`}
                                onChange={(e) => updateFormChecklist(index, 'file', e.target.files[0])}
                              />
                              <label className="custom-file-label" htmlFor={`formFile_${index}`}>
                                {item.file ? item.file.name : 'Choose file'}
                              </label>
                            </div>
                          </div>
                          <div className="col-md-2 mb-2">
                            {index > 0 && (
                              <button
                                type="button"
                                className="btn btn-sm btn-danger btn-block"
                                onClick={() => removeFormChecklist(index)}
                              >
                                <FaTrash />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sample Form Tab */}
                <div className={`tab-pane fade ${activeTab === 'tab_7' ? 'show active' : ''}`} id="tab_7">
                  <div className="card">
                    <div className="card-header bg-light">
                      <h4 className="card-title">Sample Form Preview</h4>
                    </div>
                    <div className="card-body">
                      <div className="alert alert-info">
                        <FaPaperclip className="mr-2" />
                        This section would display a preview of the sample form when available.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer text-center">
            <button
              type="submit"
              className="btn btn-success btn-lg px-5"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                  Processing...
                </>
              ) : (
                <>
                  {submitSuccess ? (
                    <>
                      <FaCheck className="mr-2" /> Submitted Successfully!
                    </>
                  ) : (
                    'Submit Task'
                  )}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addtask;