import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stopwatchTime: 0,
  running: false,
  pausedTimes: [], 
};

const stopwatchSlice = createSlice({
  name: 'stopwatch',
  initialState,
  reducers: {
    startStopwatch: (state) => {
      state.running = true;
    },
    pauseStopwatch: (state) => {
      state.running = false;
      state.pausedTimes.push(state.stopwatchTime); 
    },
    resetStopwatch: (state) => {
      state.running = false;
      state.stopwatchTime = 0;
    },
    incrementStopwatch: (state) => {
      if (state.running) {
        state.stopwatchTime += 1;
      }
    },
  },
});

export const { startStopwatch, pauseStopwatch, resetStopwatch, incrementStopwatch } = stopwatchSlice.actions;
export default stopwatchSlice.reducer;
