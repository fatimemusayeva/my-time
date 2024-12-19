import { configureStore } from '@reduxjs/toolkit';
import stopwatchReducer from './stopwatchSlice';  
import timerReducer from './timerSlice';  
import componentReducer from './componentSlice';


export const store = configureStore({
  reducer: {
    stopwatch: stopwatchReducer,
    timer: timerReducer,
    components: componentReducer, 
  },
});

export default store;
