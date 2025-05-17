import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../config/axios";

const BASE_URL = "/occupation-types"; // adjust to your API route

export const fetchOccupations = createAsyncThunk(
  "occupationType/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createOccupation = createAsyncThunk(
  "occupationType/create",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(BASE_URL, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateOccupation = createAsyncThunk(
  "occupationType/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteOccupation = createAsyncThunk(
  "occupationType/delete",
  async (id, thunkAPI) => {
    try {
      // Your backend delete route has `/delete/:id`
      await axios.delete(`${BASE_URL}/delete/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
