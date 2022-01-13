import React from "react";

function DisplayArea(props){
   return !props.session?"":<div>
    {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
    <div className="row mb-2">
      <div className="col">
        {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
        <h2 data-testid="session-title">
           {props.session?props.session.label:""} for {props.minutesToDuration(props.duration)} minutes
        </h2>
        {/* TODO: Update message below correctly format the time remaining in the current session */}
        <p className="lead" data-testid="session-sub-title">
          {props.session?props.secondsToDuration(props.session.timeRemaining):""} remaining
        </p>
      </div>
    </div>
    <div className="row mb-2">
      <div className="col">
        <div className="progress" style={{ height: "20px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={ props.percentWidth()} // TODO: Increase aria-valuenow as elapsed time increases
            style={{ width: props.percentWidth()+"%" }} // TODO: Increase width % as elapsed time increases
          />
        </div>
      </div>
    </div>
  </div>}

export default DisplayArea