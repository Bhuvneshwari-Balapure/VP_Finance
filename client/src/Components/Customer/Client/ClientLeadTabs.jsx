import React, { useState } from "react";
import DisplayClient from "./DisplayClient";
import AddClient from "./AddClient";

const ClientLeadTabs = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [editId, setEditId] = useState(null); // 👈 Track which lead is being edited

  return (
    <div className="container mt-4">
      {/* Tab Buttons */}
      <div className="d-flex mb-3">
        <button
          className={`btn btn-${
            activeTab === "add" ? "primary" : "outline-primary"
          } me-2`}
          onClick={() => {
            setEditId(null); // clear any editing state when adding fresh
            setActiveTab("add");
          }}
        >
          Add Client Lead
        </button>
        <button
          className={`btn btn-${
            activeTab === "display" ? "primary" : "outline-primary"
          }`}
          onClick={() => setActiveTab("display")}
        >
          Display Client Leads
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "add" && <AddClient editId={editId} />}
        {activeTab === "display" && (
          <DisplayClient setActiveTab={setActiveTab} setEditId={setEditId} />
        )}
      </div>
    </div>
  );
};

export default ClientLeadTabs;
