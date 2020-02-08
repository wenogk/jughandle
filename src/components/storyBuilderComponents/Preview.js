import React, { useState, useEffect, useRef } from 'react'
import {useSelector} from 'react-redux';

const Preview = () => {
  const PATHS = useSelector((state) => {return(state)});
  const [currentPathID, setCurrentPathID] = useState("root");
  const [previousPathID, setPreviousPathID] = useState("root");

  function loadPath(idVal) {
    setPreviousPathID(currentPathID)
    setCurrentPathID(idVal)

  }
  let options = [];
  for(let i in PATHS[currentPathID].options) {
    let option = PATHS[currentPathID].options[i];
    options.push(<a onClick={() => {loadPath(option.pathID)}}>{option.text}</a>)
  }
  options.push(<a onClick={() => {loadPath(previousPathID)}}>Previous Path</a>);
  options.push(<a onClick={() => {loadPath("root")}}>Start Over</a>);

  return (
    <React.Fragment>
    <div class="row">
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
    </React.Fragment>
  );
};
/*
<pre>
{JSON.stringify(PATHS, null, "\t")}
</pre>
*/
export default Preview;
