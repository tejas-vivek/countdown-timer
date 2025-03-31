import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import { BsFillPlayFill, BsPauseFill, BsStopFill } from "react-icons/bs";

document.body.style.background="#282c34"

export default function CountDownTimer() {
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [sec, setSec] = useState(0);
  const [milisec, setMilisec] = useState(0);
  const [isRunning, setIsRunning] = useState(null);

  const [showEndScreen, setShowEndScreen] = useState({
    show: false,
    message: "Restart your countdown",
  });

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
    if(hours === 0 && mins === 0 && sec === 0 && milisec === 1){
        setShowEndScreen({...showEndScreen, show:true});
        resetTimer();
    }
    return () => clearInterval(interval);
  }, [milisec, sec, mins, hours, isRunning, showEndScreen.show]);

  //Start timers
  function startTimer() {
    if (hours !== 0 || mins !== 0 || sec !== 0 || milisec !== 0) {
      setIsRunning(true);
      setShowEndScreen({...showEndScreen, show:false});
    } else {
      window.alert("Add time");
    }
  }

  //Pause timer
  function pauseTimer() {
    setIsRunning(false);
  }

  function stopTimer() {
    resetTimer();
    setShowEndScreen({...showEndScreen, show:false});
  }

  function resetTimer() {
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
      {showEndScreen.show && <h1 className="title text-light">{showEndScreen.message}</h1>}
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
