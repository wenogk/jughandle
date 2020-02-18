import React, { useState } from 'react'
import {useSelector} from 'react-redux';
import ReactPlayer from 'react-player'
const Preview = () => {
  const PATHS = useSelector((state) => {return(state)});
  const [currentPathID, setCurrentPathID] = useState("root");
  const [previousPathID, setPreviousPathID] = useState("root");
  const [percentagePlayed, setPercentagePlayed] = useState(0);


  function loadPath(idVal) {
    setPercentagePlayed(0) //reset the percentage played
    setPreviousPathID(currentPathID)
    setCurrentPathID(idVal)

  }
  function videoProgressed({played, loaded, playedSeconds, loadedSeconds}) {
      setPercentagePlayed(played);
  }
  let options = [];
  for(let i in PATHS[currentPathID].options) {
    let option = PATHS[currentPathID].options[i];
    options.push(<a onClick={() => {loadPath(option.pathID)}}>{option.text}</a>)
  }
  if(currentPathID!="root") {
    options.push(<a onClick={() => {loadPath(previousPathID)}}>Previous Path</a>);
    options.push(<a onClick={() => {loadPath("root")}}>Start Over</a>);
  }

if(PATHS[currentPathID].video =="") {
  return (
    <React.Fragment>
    <div className="container">
    <div class="row ">
    <div class="col s12 m12">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <p>{PATHS[currentPathID].text}</p>
        </div>
        <div class="card-action">
          {options}
        </div>
      </div>
    </div>
  </div>
  </div>
    </React.Fragment>
  );
} else {
  console.log("video: " + PATHS[currentPathID].video)
  return (
    <React.Fragment>
    <div className="container">
    <div class="row ">
    <div class="col s12 m12">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <ReactPlayer playing={true} url={PATHS[currentPathID].video} onProgress={videoProgressed} />
        </div>
        <div class="card-action">
          {(percentagePlayed>0.95) ? options : ""}
          <br />
          <p style={{color:"white"}}>{percentagePlayed}</p>
        </div>
      </div>
    </div>
  </div>
  </div>
    </React.Fragment>
  );
}

};
/*
<pre>
{JSON.stringify(PATHS, null, "\t")}
</pre>
*/
export default Preview;
