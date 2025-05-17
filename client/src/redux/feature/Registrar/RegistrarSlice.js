import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRegistrars,
  createRegistrar,
  updateRegistrar,
  deleteRegistrar,
} from "./RegistrarThunx";

const initialState = {
  registrars: [],
  loading: false,
  error: null,
};

const registrarSlice = createSlice({
  name: "registrar",
  initialState,
  reducers: {
    // You can add synchronous reducers here if needed
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all registrars
      .addCase(fetchRegistrars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegistrars.fulfilled, (state, action) => {
        state.loading = false;
        state.registrars = action.payload;
      })
      .addCase(fetchRegistrars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create registrar
      .addCase(createRegistrar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRegistrar.fulfilled, (state, action) => {
        state.loading = false;
        state.registrars.push(action.payload);
      })
      .addCase(createRegistrar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update registrar
      .addCase(updateRegistrar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRegistrar.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.registrars.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.registrars[index] = action.payload;
        }
      })
      .addCase(updateRegistrar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete registrar
      .addCase(deleteRegistrar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRegistrar.fulfilled, (state, action) => {
        state.loading = false;
        state.registrars = state.registrars.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteRegistrar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = registrarSlice.actions;

export default registrarSlice.reducer;
