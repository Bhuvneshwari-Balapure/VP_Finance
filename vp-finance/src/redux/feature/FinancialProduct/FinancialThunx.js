import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../config/axios";

const API_URL = "/FinancialProduct";
// get all
export const fetchFinancialProduct = createAsyncThunk(
  "FinancialProduct/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      console.log(response.data, "data from thunx");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
// get By Id
export const fetchFinancialProductById = createAsyncThunk(
  "FinancialProduct/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// create
export const createFinancialProduct = createAsyncThunk(
  "FinancialProduct/create",
  async (FinancialProductData, { rejectWithValue }) => {
    try {
      // Transform data to match backend schema
      const payload = {
        name: FinancialProductData.name,
        shortcode: FinancialProductData.code,
        pincode: FinancialProductData.pin,
      };

      const response = await axios.post(API_URL, payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
// update
export const updateFinancialProduct = createAsyncThunk(
  "FinancialProduct/update",
  async ({ id, FinancialProductData }, { rejectWithValue }) => {
    try {
      // Transform data to match backend schema
      const payload = {
        name: FinancialProductData.name,
        shortcode: FinancialProductData.code,
        pincode: FinancialProductData.pin,
      };
      const response = await axios.put(`${API_URL}/${id}`, payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
// delete
export const deleteFinancialProduct = createAsyncThunk(
  "FinancialProduct/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
