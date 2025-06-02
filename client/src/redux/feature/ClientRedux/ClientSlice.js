// import { createSlice } from "@reduxjs/toolkit";
// import {
//   // createClientFirstForm,
//   completeClientForm,
//   fetchClients,
// } from "./ClientThunx";

// const initialState = {
//   loading: false,
//   error: null,
//   success: false,
//   clients: [],
//   client: null,
//   step: 1, // Can be used to track form steps in UI
// };

// const clientSlice = createSlice({
//   name: "client",
//   initialState,
//   reducers: {
//     resetClientState: (state) => {
//       state.loading = false;
//       state.error = null;
//       state.success = false;
//       state.step = 1;
//     },
//   },
//   extraReducers: (builder) => {
//     // 🔹 Step 1: Client First Form
//     builder;
//     // .addCase(createClientFirstForm.pending, (state) => {
//     //   state.loading = true;
//     //   state.error = null;
//     // })
//     // .addCase(createClientFirstForm.fulfilled, (state, action) => {
//     //   state.loading = false;
//     //   state.success = true;
//     //   state.client = action.payload;
//     //   state.clients.unshift(action.payload);
//     //   state.step = 2; // Move to next step in UI
//     // })
//     // .addCase(createClientFirstForm.rejected, (state, action) => {
//     //   state.loading = false;
//     //   state.error = action.payload;
//     // });

//     // 🔹 Step 2: Complete AddClientForm
//     builder
//       .addCase(completeClientForm.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(completeClientForm.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.clients.unshift(action.payload);
//       })
//       .addCase(completeClientForm.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // 🔹 Fetch Clients
//     builder
//       .addCase(fetchClients.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchClients.fulfilled, (state, action) => {
//         state.loading = false;
//         state.clients = action.payload;
//       })
//       .addCase(fetchClients.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetClientState } = clientSlice.actions;
// export default clientSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  createClientFirstForm,
  completeClientForm,
  getAllFullClients,
} from "./ClientThunx";

const initialState = {
  loading: false,
  error: null,
  success: false,
  clients: [],
  client: null,
  step: 1,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    resetClientState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.step = 1;
    },
  },
  extraReducers: (builder) => {
    // 🔹 Step 1: Client First Form
    builder
      .addCase(createClientFirstForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClientFirstForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.client = action.payload;
        state.clients.unshift(action.payload);
        state.step = 2;
      })
      .addCase(createClientFirstForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 🔹 Step 2: Complete AddClientForm
    builder
      .addCase(completeClientForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeClientForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clients.unshift(action.payload);
      })
      .addCase(completeClientForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 🔹 Get all clients
    builder
      .addCase(getAllFullClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFullClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(getAllFullClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetClientState } = clientSlice.actions;
export default clientSlice.reducer;
