import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../../config/axios";
import axios from "../../../config/axios";

const API_URL = "/leadOccupation";

export const fetchLeadOccupationDetails = createAsyncThunk(
  "/leadOccupation/fetch",
  async () => {
    const response = await axios.get(`${API_URL}`);
    // console.log(response.data, "all Data of lead Occupations");
    return response.data;
  }
);

export const fetchDetailsById = createAsyncThunk(
  "/leadOccupation/fetchDetailsById",
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);

export const createDetails = createAsyncThunk(
  "/leadOccupation/create",
  async (data) => {
    const response = await axios.post(API_URL, data);
    console.log(response, "Create Data of lead Occupations");
    return response.data;
  }
);

export const updateDetails = createAsyncThunk(
  "/leadOccupation/update",
  async ({ id, data }) => {
    const response = await axios.put(`${API_URL}/${id}`, data);

    return response.data;
  }
);

export const deleteDetails = createAsyncThunk(
  "/leadOccupation/delete",
  async (id) => {
    await axios.delete(`${API_URL}/delete/${id}`);
    return id;
  }
);
