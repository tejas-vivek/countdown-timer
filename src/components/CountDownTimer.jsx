import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import { BsFillPlayFill, BsPauseFill, BsStopFill } from "react-icons/bs";

export default function CountDownTimer() {
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [sec, setSec] = useState(0);
  const [milisec, setMilisec] = useState(0);
  const [isRunning, setIsRunning] = useState(null);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (milisec > 0) {
          setMilisec((milisec) => milisec - 1);
        } else if (sec > 0) {
          setSec((sec) => sec - 1);
          setMilisec(99);
        } else if (mins > 0) {
          setMins((mins) => mins - 1);
          setSec(59);
          setMilisec(99);
        } else if (hours > 0) {
          setHours((hours) => hours - 1);
          setMins(59);
          setSec(59);
          setMilisec(99);
        }
      }, 10);
    }
    return () => clearInterval(interval);
  }, [milisec, sec, mins, hours, isRunning]);

  //Start timers
  function startTimer(){
    if(hours !== 0 || mins !== 0 || sec !== 0 || milisec !== 0){
        setIsRunning(true);
    } else {
        window.alert("Add time");
    }
  }

  //Pause timer
  function pauseTimer(){
    setIsRunning(false);
  }

  function stopTimer(){
    resetTimer();
  }

  function resetTimer(){
    setIsRunning(false);
    setMilisec(0);
    setSec(0);
    setMins(0);
    setHours(0);
  }

  // Handlers
  const changeSeconds = (e) => {
    setSec(e.target.value);
  };
  const changeMinutes = (e) => {
    setMins(e.target.value);
  };
  const changeHours = (e) => {
    setHours(e.target.value);
  };
  return (
    <div>
      <h1 className="title">Restart your countdown</h1>
      <Timer
        milisec={milisec}
        sec={sec}
        mins={mins}
        hours={hours}
        changeSeconds={changeSeconds}
        changeMinutes={changeMinutes}
        changeHours={changeHours}
      />
      <br />

      {!isRunning && (
        <button className="btn btn-accept btn-lg" onClick={startTimer}>
          <BsFillPlayFill />
        </button>
      )}
      {isRunning && (
        <button className="btn btn-warning btn-lg" onClick={pauseTimer}>
          <BsPauseFill />
        </button>
      )}
      <button className="btn btn-danger btn-lg" onClick={stopTimer}>
        <BsStopFill />
      </button>
    </div>
  );
}
