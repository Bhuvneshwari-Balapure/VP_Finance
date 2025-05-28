import { createSlice } from "@reduxjs/toolkit";
import { createCustomer, fetchClients } from "./ClientThunx";

const initialState = {
  loading: false,
  error: null,
  success: false,
  clients: [],
  client: null,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    resetClientState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Create Client
    builder.addCase(createCustomer.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.client = action.payload;
      state.clients.unshift(action.payload); // Add new client to the beginning of the array
    });
    builder.addCase(createCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch Clients
    builder.addCase(fetchClients.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.loading = false;
      state.clients = action.payload;
    });
    builder.addCase(fetchClients.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetClientState } = clientSlice.actions;
export default clientSlice.reducer;
