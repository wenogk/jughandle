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
    options.push(<a className="btn-small" onClick={() => {loadPath(option.pathID)}}>{option.text}</a>)
  }
  if(currentPathID!="root") {
    options.push(<a className="btn-small" onClick={() => {loadPath(previousPathID)}}>Previous Path</a>);
    options.push(<a className="btn-small" onClick={() => {loadPath("root")}}>Start Over</a>);
  }
let optionsHolder = <div className="react-player"><div className="valign-wrapper center-align" style={{width:"100%",height:"100%"}}>{options}</div></div>;
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
  let player = <ReactPlayer className='react-player' playing={true} url={PATHS[currentPathID].video} onProgress={videoProgressed} width='100%' height='100%' />

  return (
    <React.Fragment>
    <div className="container">
    <div class="row ">
    <div class="col s12 m12">

        <div className='player-wrapper'>
        {(percentagePlayed>0.95) ? optionsHolder : player}
              </div>
        </div>
          <br />
          <p style={{color:"white"}}>{percentagePlayed}</p>

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
