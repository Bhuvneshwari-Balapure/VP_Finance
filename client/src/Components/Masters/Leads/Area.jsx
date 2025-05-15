import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import {
  fetchAreas,
  createArea,
  updateArea,
  deleteArea,
  // resetAreaStatus,
} from "../../../redux/feature/LeadArea/AreaThunx";

const Area = () => {
  const dispatch = useDispatch();
  const { areas, loading, error, success } = useSelector(
    (state) => state.leadArea
  );

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    pin: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchAreas());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setFormData({ name: "", code: "", pin: "" });
      setEditId(null);
      // dispatch(resetAreaStatus());
    }
  }, [success, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.code || !formData.pin) return;

    if (editId) {
      dispatch(updateArea({ id: editId, areaData: formData }));
    } else {
      dispatch(createArea(formData));
    }
  };

  const handleEdit = (area) => {
    setFormData({
      name: area.name,
      code: area.shortcode,
      pin: area.pincode,
    });
    setEditId(area._id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this area?")) {
      dispatch(deleteArea(id));
    }
  };

  if (loading && !areas.length) {
    return <div className="text-center mt-4">Loading areas...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-4">Error: {error}</div>;
  }

  return (
    <div className="container mt-2">
      <h3 className="mb-3">Location</h3>

      {success && (
        <div className="alert alert-success">
          Operation completed successfully!
        </div>
      )}

      <div className="row">
        {/* Form Section */}
        <div className="col-md-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5 className="card-title text-primary mb-3">
                {editId ? "Edit Location" : "Add New Location"}
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Location Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Location Name"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Short Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="Enter Zone Code"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Pin Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="pin"
                    value={formData.pin}
                    onChange={handleChange}
                    placeholder="Enter Postal Code"
                    required
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Processing..." : editId ? "Update" : "Submit"}
                </button>
                {editId && (
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setFormData({ name: "", code: "", pin: "" });
                      setEditId(null);
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="col-md-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5 className="card-title text-success mb-3">Location List</h5>
              {areas.length === 0 ? (
                <p>No locations added yet.</p>
              ) : (
                <div className="list-group">
                  {areas.map((area) => (
                    <div
                      key={area._id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>{area.name}</strong> ({area.shortcode}) -{" "}
                        {area.pincode}
                      </div>
                      <div>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEdit(area)}
                          title="Edit"
                          disabled={loading}
                        >
                          <PencilFill size={16} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(area._id)}
                          title="Delete"
                          disabled={loading}
                        >
                          <TrashFill size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Area;
