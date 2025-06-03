// import React, { useState } from "react";
// // import { useSelector } from "react-redux";
// // import { useParams } from "react-router-dom";
// // import toast from "react-hot-toast";

// import ClientSecondForm from "./ClientSecondForm";
// import ClientFirstFrom from "./ClientFirstFrom";
// import { useDispatch } from "react-redux";
// import { completeClientForm } from "../../../redux/feature/ClientRedux/ClientThunx";

// const AddClient = () => {
//   const [clientFirstData, setClientFirstData] = useState({});
//   const [clientSecondData, setClientSecondData] = useState({});
//   const [initialData, setInitialData] = useState({});
//   const [showSecondForm, setShowSecondForm] = useState(false);

//   const dispatch = useDispatch();
//   //   const navigate = useNavigate();
//   //   const { id } = useParams();

//   //   const { loading, error } = useSelector((state) => state.manappuram);

//   const handleSubmitAll = async () => {
//     const combinedData = {
//       ...clientFirstData,
//       ...clientSecondData,
//     };
//     console.log(clientFirstData, "firstData");
//     console.log(clientSecondData, "secondData");
//     console.log(combinedData, "combinedData");

//     // Dispatch the combined data to the Redux store
//     dispatch(completeClientForm(combinedData));
//   };

//   return (
//     <div className="max-w-5xl mx-auto mt-6 px-4">
//       <h3 className="text-2xl font-semibold mb-4">Complete Valuation Report</h3>

//       {/* <ClientFirstFrom isEdit={initialData} onDataChange={setClientFirstData} />
//       <ClientSecondForm
//         isEdit={initialData}
//         onDataChange={setClientSecondData}
//       /> */}
//       <ClientFirstFrom
//         isEdit={initialData}
//         onDataChange={(data) => {
//           setClientFirstData(data);
//           setShowSecondForm(true); // Only show second form on success
//         }}
//       />

//       {showSecondForm && (
//         <ClientSecondForm
//           isEdit={initialData}
//           onDataChange={setClientSecondData}
//         />
//       )}

//       {/*
//       {loading && <p className="text-blue-600">Submitting...</p>}
//       {error && <p className="text-red-600">Error: {error}</p>} */}

//       <div className="flex justify-end mt-4 mb-4">
//         <button
//           onClick={handleSubmitAll}
//           type="submit"
//           style={{
//             width: "200px",
//             backgroundColor: "#0d6efd",
//             color: "white",
//             padding: "10px 20px",
//             borderRadius: "5px",
//             fontSize: "16px",
//             cursor: "pointer",
//             boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           Submit Report
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddClient;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClientSecondForm from "./ClientSecondForm";
import ClientFirstFrom from "./ClientFirstFrom";
import {
  completeClientForm,
  updateClientFirstForm,
} from "../../../redux/feature/ClientRedux/ClientThunx";

const AddClient = () => {
  const [clientFirstData, setClientFirstData] = useState({});
  const [clientSecondData, setClientSecondData] = useState({});
  const [initialData, setInitialData] = useState({});
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [isEdit, setIsEdit] = useState();

  // console.log(clientFirstData, "clientFirstData");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.client);

  const handleSubmitAll = async () => {
    const combinedData = {
      ...clientFirstData,
      ...clientSecondData,
    };
    console.log("Submitting combined data", combinedData);
    dispatch(completeClientForm(combinedData));
  };

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setClientFirstData(initialData);
      setShowSecondForm(true);
    }
  }, [initialData]);

  return (
    <div className="max-w-5xl mx-auto mt-6 px-4">
      {/* <h3 className="text-2xl font-semibold mb-4">Complete Valuation Report</h3> */}

      {/* First form always visible */}
      <ClientFirstFrom
        isEdit={clientFirstData}
        onDataChange={(data) => {
          setClientFirstData(data);
          setShowSecondForm(true);
        }}
      />

      {showSecondForm && (
        <ClientSecondForm
          firstFormData={clientFirstData}
          isEdit={initialData}
          onDataChange={setClientSecondData}
        />
      )}

      {loading && <p className="text-blue-600">Submitting...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <div className="flex justify-end mt-4 mb-4">
        <button
          onClick={handleSubmitAll}
          type="submit"
          style={{
            width: "200px",
            backgroundColor: "#0d6efd",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          Submit Report
        </button>
      </div>
    </div>
  );
};

export default AddClient;
