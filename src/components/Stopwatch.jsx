import React, { useState, useRef, useEffect } from 'react';

const Stopwatch = () => {
  const initialTime = parseInt(localStorage.getItem('stopwatch-time')) || 0;
  const initialIsRunning = localStorage.getItem('stopwatch-isRunning') === 'true' || false;
  const initialFinalTime = parseInt(localStorage.getItem('stopwatch-finalTime')) || null;

  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(initialIsRunning);
  const [finalTime, setFinalTime] = useState(initialFinalTime);
  const intervalRef = useRef(null);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('stopwatch-time', time.toString());
    localStorage.setItem('stopwatch-isRunning', isRunning.toString());
    localStorage.setItem('stopwatch-finalTime', finalTime !== null ? finalTime.toString() : '');
  }, [time, isRunning, finalTime]);

  const handleStartPause = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 50); // Update every 10 milliseconds
    }
    setIsRunning(!isRunning);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setFinalTime(time);
    setTime(0);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setFinalTime(null);
  };

  const formatTime = (time) => {
    const milliseconds = Math.floor(time % 1000);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);

    // Ensure milliseconds are always displayed as two digits
    const formattedMilliseconds = milliseconds.toString().padStart(3, '0').substring(0, 2);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${formattedMilliseconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 sm:mb-8 mt-8">Stopwatch</h1>
      <div className="w-72 sm:w-96 lg:w-120 h-72 sm:h-96 lg:h-120 rounded-full flex items-center justify-center bg-white shadow-md border border-gray-300">
        <div className="text-4xl sm:text-6xl lg:text-7xl font-mono">{formatTime(time)}</div>
      </div>
      {finalTime !== null && (
        <div className="text-lg sm:text-xl lg:text-2xl font-mono mt-4 sm:mt-6 text-gray-700">
          Final Time: {formatTime(finalTime)}
        </div>
      )}
      <div className="flex space-x-4 sm:space-x-6 mt-6 sm:mt-12">
        <button
          onClick={handleStartPause}
          className="bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded shadow text-sm sm:text-xl"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={handleStop}
          className="bg-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded shadow text-sm sm:text-xl"
        >
          Stop
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded shadow text-sm sm:text-xl"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
