import React from "react";

function RegistrarDetail({ setActiveTab, setEditId }) {
  return (
    <div>
      <p>Registrar Detail Table</p>
      <button
        onClick={() => {
          setEditId("someId123");
          setActiveTab("add");
        }}
      >
        Edit Registrar
      </button>
    </div>
  );
}

export default RegistrarDetail;
