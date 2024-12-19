// timerSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    hours: 0,
    minutes: 0,
    seconds: 0,
    running: false,
    pausedTimes: [],
  },
  reducers: {
    incrementTime: (state, action) => {
      const { field } = action.payload;
      if (field === 'hours') state.hours += 1;
      else if (field === 'minutes') state.minutes += 1;
      else if (field === 'seconds') state.seconds += 1;
    },
    decrementTime: (state, action) => {
      const { field } = action.payload;
      if (field === 'hours') state.hours -= 1;
      else if (field === 'minutes') state.minutes -= 1;
      else if (field === 'seconds') state.seconds -= 1;
    },
    startTimer: (state) => {
      state.running = true;
    },
    pauseTimer: (state) => {
      state.running = false;
      state.pausedTimes.push({
        hours: state.hours,
        minutes: state.minutes,
        seconds: state.seconds,
      });
    },
    resetTimer: (state) => {
      state.hours = 0;
      state.minutes = 0;
      state.seconds = 0;
      state.running = false;
    },
    addPausedTime: (state, action) => {
      state.pausedTimes.push(action.payload);
    },
    countdownTimer: (state) => {
      if (state.seconds > 0) {
        state.seconds -= 1;
      } else if (state.minutes > 0) {
        state.minutes -= 1;
        state.seconds = 59;
      } else if (state.hours > 0) {
        state.hours -= 1;
        state.minutes = 59;
        state.seconds = 59;
      } else {
        state.running = false;
      }
    },
  },
});

export const { 
  incrementTime, 
  decrementTime, 
  startTimer, 
  pauseTimer, 
  resetTimer, 
  addPausedTime, 
  countdownTimer 
} = timerSlice.actions;

export default timerSlice.reducer;
