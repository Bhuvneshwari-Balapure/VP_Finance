import { createSlice } from "@reduxjs/toolkit";
import {
  fetchLeadOccupationDetails,
  fetchDetailsById,
  createDetails,
  updateDetails,
  deleteDetails,
} from "./OccupationThunx";

const initialState = {
  details: [],
  detail: null,
  loading: false,
  error: null,
  success: false,
};

const LeadAreaSlice = createSlice({
  name: "leadOccupation",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // First handle all specific cases with addCase
      .addCase(fetchLeadOccupationDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadOccupationDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchLeadOccupationDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchDetailsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDetailsById.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(fetchDetailsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details.unshift(action.payload);
        state.success = true;
      })
      .addCase(createDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDetails.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.details.findIndex(
          (d) => d._id === action.payload._id
        );
        if (index !== -1) state.details[index] = action.payload;
        state.success = true;
      })
      .addCase(updateDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = state.details.filter((d) => d._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // If you still want to use addMatcher for common patterns,
      // it must come after all addCase calls
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { resetSuccess } = LeadAreaSlice.actions;
export default LeadAreaSlice.reducer;
