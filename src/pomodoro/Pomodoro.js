import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { minutesToDuration, secondsToDuration } from "../utils/duration";
import Interface from "./Interface";
import DisplayArea from "./DisplayArea";
// These functions are defined outside of the component to ensure they do not have access to state
// and are, therefore, more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher-order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);
  const [focusDuration, setFocusDuration]=useState(25);
  const [breakDuration, setBreakDuration]=useState(5);

  function stahp(){
    setSession(null);
    //setFocusDuration()
    setIsTimerRunning(false);
  }

  function decreaseFocusDuration(){
    if (focusDuration>5){
      setFocusDuration(focusDuration-5)
    }
  }


  function increaseFocusDuration(){
    if (focusDuration<60){
      setFocusDuration(focusDuration+5)
    }
  }

  function decreaseBreakDuration(){
    if (breakDuration>1){
      setBreakDuration(breakDuration-1)
    }
  }


  function increaseBreakDuration(){
    if (breakDuration<15){
      setBreakDuration(breakDuration+1)
    }
  }


  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You won't need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
       
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

    function percentWidth(){
      if(!session){return 0}
      if(session.label==="Focusing"){
       // let currentDuration=session.timeRemaining;
        let secondsLeft=focusDuration*60-session.timeRemaining
        let barProgress=100*secondsLeft/(focusDuration*60)
       
        return barProgress
      }
      else{
        //let currentDuration=session.timeRemaining;
        let secondsLeft=breakDuration*60-session.timeRemaining
        let barProgress=100*secondsLeft/(breakDuration*60)
        return barProgress
      }
    }
    let duration=0
    if(session){
      if(session.label==="Focusing"){duration=focusDuration}
      else{duration=breakDuration}
    }
  return (
    <div className="pomodoro">
     <Interface
     focusDuration={focusDuration} 
     breakDuration={breakDuration}
     decreaseFocusDuration={decreaseFocusDuration}
     increaseFocusDuration={increaseFocusDuration} 
     increaseBreakDuration={increaseBreakDuration}
     decreaseBreakDuration={decreaseBreakDuration}
     classNames={classNames}
     stahp={stahp}
     playPause={playPause}
     minutesToDuration={minutesToDuration}
     isTimerRunning={isTimerRunning}
     />
     <DisplayArea
     secondsToDuration={secondsToDuration}
     percentWidth={percentWidth}
     duration={duration}
     session={session}
     focusDuration={focusDuration} 
     breakDuration={breakDuration}
   
     minutesToDuration={minutesToDuration}
     /> 
      
    </div>
  );
}

export default Pomodoro;
