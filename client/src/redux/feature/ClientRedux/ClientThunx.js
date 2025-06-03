// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../../config/axios";

// const API_URL = "/client";

// // 🔹 Step 1: Create Client First Form
// export const createClientFirstForm = createAsyncThunk(
//   "client/createClientFirstForm",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${API_URL}/client-first-form`,
//         formData
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // !--------------------------------

// export const updateClientFirstForm = createAsyncThunk(
//   "clientFirstForm/update",
//   async ({ id, formData }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(
//         `${API_URL}/client-first-form/${id}`,
//         formData
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );
// export const fetchByidClientFirstForm = createAsyncThunk(
//   "clientFirstForm/fetchById",
//   async ({ id }, { rejectWithValue }) => {
//     console.log("Fetching Client First Form by ID:", id);
//     try {
//       const response = await axios.get(`${API_URL}/${id}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // !--------------------------------

// // 🔹 Step 2: Complete Client Form (after first step)
// export const completeClientForm = createAsyncThunk(
//   "client/completeClientForm",
//   async (formData, { rejectWithValue }) => {
//     try {
//       console.log("Complete Client Form Data:", formData);
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const response = await axios.post(
//         `${API_URL}/add-client`,
//         formData,
//         config
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // 🔹 Get all full clients (with clientFirstFormId populated)
// export const getAllFullClients = createAsyncThunk(
//   "client/getAllFullClients",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_URL}/full-details`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../config/axios";

const API_URL = "/client";

// 🔹 Step 1: Create Client First Form
export const createClientFirstForm = createAsyncThunk(
  "createClientFirstForm/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/client-first-form`,
        formData
      );
      console.log("first");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateClientFirstForm = createAsyncThunk(
  "clientFirstForm/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/client-first-form/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchByidClientFirstForm = createAsyncThunk(
  "clientFirstForm/fetchById",
  async ({ id }, { rejectWithValue }) => {
    console.log("Fetching Client First Form by ID:", id);
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 🔹 Step 2: Complete Client Form
export const completeClientForm = createAsyncThunk(
  "client/completeClientForm",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("Complete Client Form Data:", formData);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${API_URL}/add-client`,
        formData,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// export const completeClientForm = createAsyncThunk(
//   "client/completeClientForm",
//   async (formData, { rejectWithValue }) => {

//     try {
//       const form = new FormData();

//       // Append simple fields
//       form.append("taskDetails", formData.taskDetails);
//       form.append("proposedPlan.date", formData.proposedPlan.date);
//       form.append("proposedPlan.memberName", formData.proposedPlan.memberName);
//       form.append("proposedPlan.company", formData.proposedPlan.company);
//       form.append("proposedPlan.planName", formData.proposedPlan.planName);

//       // Append single file
//       if (formData.proposedPlan.upload) {
//         form.append("proposedPlan.upload", formData.proposedPlan.upload);
//       }

//       // Append customer documents (array of objects with files)
//       formData.customerDoc.forEach((doc, index) => {
//         form.append(
//           `customerDoc[${index}][submissionDate]`,
//           doc.submissionDate
//         );
//         form.append(`customerDoc[${index}][memberName]`, doc.memberName);
//         form.append(`customerDoc[${index}][documentNo]`, doc.documentNo);
//         form.append(`customerDoc[${index}][documentName]`, doc.documentName);
//         form.append(
//           `customerDoc[${index}][financialProducts]`,
//           doc.financialProducts
//         );
//         if (doc.uploadFile) {
//           form.append(`customerDoc[${index}][upload]`, doc.uploadFile);
//         }
//       });

//       // Append nested non-file fields as JSON string
//       form.append("financialInfo", JSON.stringify(formData.financialInfo));

//       const config = {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       };

//       const response = await axios.post(`${API_URL}/add-client`, form, config);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// 🔹 Fetch all full clients
export const getAllFullClients = createAsyncThunk(
  "client/getAllFullClients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/complete-client-form`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ClientThunx.js
export const updateAddClientForm = createAsyncThunk(
  "client/updateAddClientForm",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/add-client/${id}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteAddClientForm = createAsyncThunk(
  "client/deleteAddClientForm",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/add-client/${id}`);
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
