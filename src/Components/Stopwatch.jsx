import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startStopwatch, pauseStopwatch, resetStopwatch, incrementStopwatch } from '../redux/stopwatchSlice'; 

const Stopwatch = () => {
  const dispatch = useDispatch();
  const { stopwatchTime, running, pausedTimes } = useSelector((state) => state.stopwatch); 

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        dispatch(incrementStopwatch()); 
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [running, dispatch]);

  const formattedTime = new Date(stopwatchTime * 1000).toISOString().substr(11, 8);

  const formattedPausedTimes = pausedTimes.map((time) => 
    new Date(time * 1000).toISOString().substr(11, 8)
  );

  return (
    <div className="stopwatch">
      <h2>Saniyəölçən</h2>
      <div className="time-display">
        <h3>{formattedTime}</h3>
      </div>

      <div className="controls">
        <button onClick={() => dispatch(running ? pauseStopwatch() : startStopwatch())}>
          {running ? 'Pauza' : 'Başlat'}
        </button>
        <button onClick={() => dispatch(resetStopwatch())}>Sıfırla</button>
      </div>

      {pausedTimes.length > 0 && (
        <div className="paused-times">
          <h3>Pauza Vaxtları:</h3>
          <ul>
            {formattedPausedTimes.map((time, index) => (
              <li key={index}>{time}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
