import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../../config/axios";
import axios from "../../../config/axios";

const API_URL = "/leadOccupation";

export const fetchLeadOccupationDetails = createAsyncThunk(
  "/leadSource/fetch",
  async () => {
    const response = await axios.get(`${API_URL}`);
    // console.log(response.data, "all Data of lead Occupations");
    return response.data;
  }
);

export const fetchDetailsById = createAsyncThunk(
  "/leadSource/fetchDetailsById",
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);

export const createDetails = createAsyncThunk(
  "/leadSource/create",
  async (data) => {
    const response = await axios.post(API_URL, data);
    console.log(response, "Create Data of lead Occupations");
    return response.data;
  }
);

export const updateDetails = createAsyncThunk(
  "/leadSource/update",
  async ({ id, data }) => {
    const response = await axios.put(`${API_URL}/${id}`, data);

    return response.data;
  }
);

export const deleteDetails = createAsyncThunk(
  "/leadSource/delete",
  async (id) => {
    await axios.delete(`${API_URL}/delete/${id}`);
    return id;
  }
);
