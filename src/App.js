import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveComponent } from './redux/componentSlice'; 
import Clock from './Components/Clock';
import Stopwatch from './Components/Stopwatch';
import Timer from './Components/Timer';
import "./App.css" 

const App = () => {
  const dispatch = useDispatch();
  const activeComponent = useSelector(state => state.components.activeComponent); 

  return (
    <div>
      <h1>Timer App</h1>
      <div>
        <button onClick={() => dispatch(setActiveComponent('clock'))}>Saat</button>
        <button onClick={() => dispatch(setActiveComponent('stopwatch'))}>Saniyəölçən</button>
        <button onClick={() => dispatch(setActiveComponent('timer'))}>Taymer</button>
      </div>

      {activeComponent === 'clock' && <Clock />}
      {activeComponent === 'stopwatch' && <Stopwatch />}
      {activeComponent === 'timer' && <Timer />}
    </div>
  );
};

export default App;
