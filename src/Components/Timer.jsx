import React, { useState, useEffect } from "react";

const Timer = () => {
    const [hours, setHours] = useState(""); 
    const [minutes, setMinutes] = useState(""); 
    const [seconds, setSeconds] = useState(""); 
    const [isRunning, setIsRunning] = useState(false);
    const [pauseLogs, setPauseLogs] = useState([]);

    const start = () => setIsRunning(true);

    const pause = () => {
        setIsRunning(false);
        const currentTime = `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        setPauseLogs((prevLogs) => [...prevLogs, currentTime]);
    };

    const reset = () => {
        setHours("");
        setMinutes("");
        setSeconds("");
        setIsRunning(false);
        setPauseLogs([]);
    };

    const handleIncrement = (type) => {
        if (type === "hours") setHours((prev) => (prev ? parseInt(prev) + 1 : 1));
        if (type === "minutes") setMinutes((prev) => ((prev ? parseInt(prev) + 1 : 1) % 60));
        if (type === "seconds") setSeconds((prev) => ((prev ? parseInt(prev) + 1 : 1) % 60));
    };

    const handleDecrement = (type) => {
        if (type === "hours" && hours > 0)
            setHours((prev) => (prev ? Math.max(parseInt(prev) - 1, 0) : ""));
        if (type === "minutes" && minutes > 0)
            setMinutes((prev) => (prev ? Math.max(parseInt(prev) - 1, 0) : ""));
        if (type === "seconds" && seconds > 0)
            setSeconds((prev) => (prev ? Math.max(parseInt(prev) - 1, 0) : ""));
    };

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                if (seconds > 0) {
                    setSeconds((prev) => prev - 1);
                } else if (minutes > 0) {
                    setMinutes((prev) => prev - 1);
                    setSeconds(59);
                } else if (hours > 0) {
                    setHours((prev) => prev - 1);
                    setMinutes(59);
                    setSeconds(59);
                } else {
                    clearInterval(timer);
                    setIsRunning(false);
                    alert("Vaxt bitdi!");
                }
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isRunning, seconds, minutes, hours]);

    return (
        <div>
            <h1>
                {(hours || "00").toString().padStart(2, "0")}:
                {(minutes || "00").toString().padStart(2, "0")}:
                {(seconds || "00").toString().padStart(2, "0")}
            </h1>
            <div>
                Saat:
                <input
                    type="number"
                    value={hours}
                    onChange={(e) => {
                        const val = e.target.value;
                        setHours(val === "" ? "" : Math.max(0, parseInt(val) || 0));
                    }}
                    disabled={isRunning} 
                />
                <button onClick={() => handleIncrement("hours")} disabled={isRunning}>
                    +
                </button>
                <button onClick={() => handleDecrement("hours")} disabled={isRunning}>
                    -
                </button>
            </div>
            <div>
                Dəqiqə:
                <input
                    type="number"
                    value={minutes}
                    onChange={(e) => {
                        const val = e.target.value;
                        setMinutes(
                            val === "" ? "" : Math.max(0, Math.min(59, parseInt(val) || 0))
                        );
                    }}
                    disabled={isRunning}
                />
                <button onClick={() => handleIncrement("minutes")} disabled={isRunning}>
                    +
                </button>
                <button onClick={() => handleDecrement("minutes")} disabled={isRunning}>
                    -
                </button>
            </div>
            <div>
                Saniyə:
                <input
                    type="number"
                    value={seconds}
                    onChange={(e) => {
                        const val = e.target.value;
                        setSeconds(
                            val === "" ? "" : Math.max(0, Math.min(59, parseInt(val) || 0))
                        );
                    }}
                    disabled={isRunning}
                />
                <button onClick={() => handleIncrement("seconds")} disabled={isRunning}>
                    +
                </button>
                <button onClick={() => handleDecrement("seconds")} disabled={isRunning}>
                    -
                </button>
            </div>
            <button onClick={start} disabled={isRunning}>
                Start
            </button>
            <button onClick={pause} disabled={!isRunning}>
                Pause
            </button>
            <button onClick={reset}>Reset</button>

            <h2>Pauzalar</h2>
            <ul>
                {pauseLogs.map((log, index) => (
                    <li key={index}>
                        Pauza {index + 1}: {log}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Timer;
