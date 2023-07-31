import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

const Timer = (props) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [startimer, setstartimer] = useState(false);
  
  useEffect(() => {
    let intervalId = null;
    if (startimer) {
      intervalId = setInterval(() => {
        setTimeLeft((timeLeft) => {
          if (timeLeft === 0) {
            clearInterval(intervalId);
            return 0;
          }
          return timeLeft - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [startimer]); // eslint-disable-line react-hooks/exhaustive-deps

//   const runFunction = () => {
//     console.log("Function called");
//   };

  useEffect(() => {
    if (timeLeft === 0) {
      props.blockuser();
    }
  }, [timeLeft]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {timeLeft === 10 && (!startimer) ? (
        <Button variant="contained" color="error" 
        disabled={props.report.isblocked}
        onClick={()=>setstartimer(true)} >Block</Button>
        
      ) : (
        <Button
          disabled={timeLeft === 0}
          onClick={() => {
              setstartimer(false);
              setTimeLeft(10)
          }}
        >
          {" "}
          cancel in {timeLeft}
        </Button>
      )}
    </>
  );
};

export default Timer;
