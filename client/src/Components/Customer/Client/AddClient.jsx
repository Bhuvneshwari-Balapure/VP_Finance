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
  fetchByidCompleteForm,
  getAllFullClients,
} from "../../../redux/feature/ClientRedux/ClientThunx";

// Toastify imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

const AddClient = ({ editId, setActiveTab }) => {
  const [clientFirstData, setClientFirstData] = useState({});
  const [clientSecondData, setClientSecondData] = useState({});
  const [initialData, setInitialData] = useState({});
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [formKey, setFormKey] = useState(Date.now()); // unique key to trigger remount
  // const [isEdit, setIsEdit] = useState();
  const location = useLocation();

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.client);

  const handleSubmitAll = async () => {
    const combinedData = {
      ...clientFirstData,
      ...clientSecondData,
    };

    try {
      const resultAction = await dispatch(completeClientForm(combinedData));

      // Redux Toolkit's createAsyncThunk stores status in meta.requestStatus
      if (resultAction?.meta?.requestStatus === "fulfilled") {
        toast.success("Client form submitted successfully!");
        console.log(combinedData, "full data");
        // Reset form data
        setClientFirstData({});
        setClientSecondData({});
        setShowSecondForm(false);
        setFormKey(Date.now()); // update key to remount ClientFirstFrom
      } else {
        toast.error("Failed to submit client form.");
      }
    } catch (error) {
      toast.error("Something went wrong while submitting the form.");
      console.error("Error submitting form:", error);
    }
  };

  // useEffect(() => {
  //   if (initialData && Object.keys(initialData).length > 0) {
  //     setClientFirstData(initialData);
  //     setShowSecondForm(true);
  //   }
  // }, [initialData]);

  useEffect(() => {
    if (location.state?.initialData) {
      setInitialData(location.state.initialData); // this is the mappedClientData
      setClientFirstData(location.state.initialData); // populate the first form
      setShowSecondForm(true); // optionally show the second form
    }
  }, [location.state]);
  useEffect(() => {
    if (editId) {
      // Fetch client data by ID for editing
      dispatch(fetchByidCompleteForm(editId))
        .unwrap()
        .then((clientData) => {
          console.log(clientData, "skldfjldksfjkdslfjsd");
          // Assume clientData has structure matching your form parts
          setClientFirstData(clientData);
          // setClientSecondData(clientData.secondFormPart || {});
          setShowSecondForm(true);
          setFormKey(Date.now()); // to remount form components and reset inputs
        })
        .catch(() => {
          toast.error("Failed to load client data for editing");
          setActiveTab("display"); // fallback to display if error
        });
    } else {
      // If no editId, clear form for add mode
      setClientFirstData({});
      setClientSecondData({});
      setShowSecondForm(false);
      setFormKey(Date.now());
    }
  }, [editId, dispatch, setActiveTab]);

  return (
    <div className="max-w-5xl mx-auto mt-6 px-4">
      {/* First form always visible */}
      <ClientFirstFrom
        key={formKey}
        isEdit={clientFirstData}
        onDataChange={(data) => {
          setClientFirstData(data);
          setShowSecondForm(true);
        }}
      />

      {/* Second form appears after first form is filled */}
      {showSecondForm && (
        <ClientSecondForm
          firstFormData={clientFirstData}
          isEdit={clientFirstData}
          //  isEdit={clientSecondData}
          onDataChange={(data) => {
            console.log("🔥 Data from ClientSecondForm:", data);
            setClientSecondData(data);
          }}
        />
      )}

      {/* Loading and error indicators */}
      {loading && <p className="text-blue-600">Submitting...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {/* Submit button */}
      {showSecondForm && (
        <div className="w-100 d-flex justify-content-center">
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
      )}

      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddClient;
