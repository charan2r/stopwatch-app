import React, { useState, useEffect } from 'react';
import '../index.css';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        let timer;
        if(isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 1000);
        }
        else{
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    }

    const handleReset = () => {
        setTime(0);
        setIsRunning(false);
        setLaps([]);
    }

    const handleLap = () => {
        setLaps((prevLaps) => [...prevLaps, time]);
    }

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;

    }

    return (
        <div>
            <h1>Stopwatch</h1>
            <h2>{formatTime(time)}</h2>
            <div>
                <button onClick={handleStartPause}>{isRunning ? 'Pause' : 'Start'}</button>
                <button onClick={handleReset}>Reset</button>
                <button onClick={handleLap} disabled={!isRunning}>Lap</button>
            </div>
            <div>
                <h3>Laps</h3>
                <ul>
                    {laps.map((lap, index) => (
                        <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


export default Stopwatch;