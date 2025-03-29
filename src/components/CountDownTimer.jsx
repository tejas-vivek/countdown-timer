import React, { useEffect, useState } from "react";

export default function CountDownTimer() {
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [sec, setSec] = useState(0);
  const [milisec, setMilisec] = useState(0);
  const [isRunning, setIsRunning] = useState(null);

  useEffect(() => {
    let interval;
    if(isRunning){
        interval = setInterval(()=>{
            if(milisec > 0){
                setMilisec((milisec) => milisec - 1);
            } else if(sec > 0){
                setSec((sec) => sec -1);
                setMilisec(99);
            }
        });
    }
    return () => clearInterval(interval);
  }, [milisec]);

  return (
    <div>
      <h1 className="title">Restart your countdown</h1>
      <div>CountDownTimer</div>
    </div>
  );
}
