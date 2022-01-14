import React from "react";

 
    function Interface(props){
    return (<>
    <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
               Focus Duration: { props.minutesToDuration(props.focusDuration)}
            </span>
            <div className="input-group-append">
             
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={props.decreaseFocusDuration}
                disabled={props.isTimerRunning}
              >
                <span className="oi oi-minus" />
              </button>
           
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={props.increaseFocusDuration}
                disabled={props.isTimerRunning}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                Break Duration: {props.minutesToDuration(props.breakDuration)}
              </span>
              <div className="input-group-append">
                  <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={props.decreaseBreakDuration}
                  disabled={props.isTimerRunning}
                >
                  <span className="oi oi-minus" />
                </button>
              
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={props.increaseBreakDuration}
                  disabled={props.isTimerRunning}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={props.playPause}
            >
              <span
                className={props.classNames({
                  oi: true,
                  "oi-media-play": !props.isTimerRunning,
                  "oi-media-pause": props.isTimerRunning,
                })}
              />
            </button>
         
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="stop"
              title="Stop the session"
              disabled={!props.isTimerRunning}
              onClick={props.stahp}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
    
    
    </>)
    }


export default Interface;