import React, { useState, useEffect, useRef } from 'react'
import PopPop from 'react-poppop';
import PathItemInput from './PathItemInput'
import {useSelector, useDispatch} from 'react-redux';
const TreeViewModal = ({text, idVal}) => {
  const dispatch = useDispatch();
  const PATHS = useSelector((state) => {return(state)});
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("PATHS modal: " + JSON.stringify(PATHS))
  console.log("idVal modal : " + JSON.stringify(idVal))
  let borderStyle = "5px solid #1a237e";
  if(idVal==="root") {
    borderStyle = "5px solid #b71c1c"
  } else if(PATHS[idVal].options.length==0) {
    borderStyle = "5px solid #1b5e20"
  }
  let isRootAndEmpty = (idVal=="root" && PATHS[idVal].options.length==0);

  let divStyle = {
    color: "white",
    padding: '15px',
    display: 'inline-block',
    border: borderStyle,
    background: "black",
    borderRadius: "25px",
  };
  let divStyle2 = {
    color: "white",
    padding: '15px',
    display: 'inline-block',
    border: borderStyle,
    background: "black",
    borderRadius: "25px",
    fontSize: "2vw",
    top:"30px",
  };


  function getParentTitle(pathID) {
    for (let idVal in PATHS) {
      for(let optionIndex in PATHS[idVal].options) {
        if(PATHS[idVal].options[optionIndex].pathID === pathID) {
          console.log("PARENT TITLE IS " + PATHS[idVal].title)
          return PATHS[idVal].title;
        }
      }
    }
  }
  console.log(JSON.stringify(PATHS))

  function toggleShow() { setIsModalOpen(!isModalOpen); }
  return (
    <React.Fragment>
    <div className = {(!isRootAndEmpty) ? "hoverPointer" : "hoverPointer pulse"} style={(!isRootAndEmpty) ? divStyle : divStyle2} onClick={()=> {toggleShow()}}>{text}</div>
    <PopPop open={isModalOpen} closeBtn={true} onClose={() => {toggleShow()}}>
      <PathItemInput title={PATHS[idVal].title} pathID={idVal} textVal={PATHS[idVal].text} onChanged={dispatch} parentTitle={getParentTitle(idVal)} defaultOptions={PATHS[idVal].options}  hasVideoDefault={(PATHS[idVal].video=="") ? false : true} defaultVideoURL={PATHS[idVal].video} />
    </PopPop>
    </React.Fragment>
  );
};

export default TreeViewModal;
