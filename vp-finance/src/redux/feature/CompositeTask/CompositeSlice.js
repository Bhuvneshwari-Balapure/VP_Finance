// redux/CompositeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  compositeData: {
    cat: '1',
    sub: 'MutulFUND ',
    depart: 'OA',
    name: 'Dummy Task',
    descp: '<p>This is dummy description</p>',
  },
};

const CompositeSlice = createSlice({
  name: 'composite',
  initialState,
  reducers: {
    setCompositeData: (state, action) => {
      state.compositeData = action.payload;
    },
  },
});

export const { setCompositeData } = CompositeSlice.actions;
export default CompositeSlice.reducer;
