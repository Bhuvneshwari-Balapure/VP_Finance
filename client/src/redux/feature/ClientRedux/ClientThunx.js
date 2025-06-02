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
  "client/createClientFirstForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/client-first-form`,
        formData
      );
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

// 🔹 Fetch all full clients
export const getAllFullClients = createAsyncThunk(
  "client/getAllFullClients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/full-details`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
