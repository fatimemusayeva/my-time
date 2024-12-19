import { createSlice } from '@reduxjs/toolkit';

export const componentSlice = createSlice({
  name: 'components',
  initialState: {
    activeComponent: 'clock', 
  },
  reducers: {
    setActiveComponent: (state, action) => {
      state.activeComponent = action.payload;
    },
  },
});

export const { setActiveComponent } = componentSlice.actions;

export default componentSlice.reducer;
