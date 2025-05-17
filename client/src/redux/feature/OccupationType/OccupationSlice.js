import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOccupations,
  createOccupation,
  updateOccupation,
  deleteOccupation,
} from "./OccupationThunx";

const initialState = {
  details: [],
  loading: false,
  error: null,
};

const OccupationTypeSlice = createSlice({
  name: "OccupationType",
  initialState,
  reducers: {
    // optional synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      // fetchOccupations
      .addCase(fetchOccupations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOccupations.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchOccupations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch occupation types";
      })

      // createOccupation
      .addCase(createOccupation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOccupation.fulfilled, (state, action) => {
        state.loading = false;
        state.details.push(action.payload);
      })
      .addCase(createOccupation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create occupation type";
      })

      // updateOccupation
      .addCase(updateOccupation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOccupation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.details.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.details[index] = action.payload;
        }
      })
      .addCase(updateOccupation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update occupation type";
      })

      // deleteOccupation
      .addCase(deleteOccupation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOccupation.fulfilled, (state, action) => {
        state.loading = false;
        state.details = state.details.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteOccupation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete occupation type";
      });
  },
});

export default OccupationTypeSlice.reducer;
