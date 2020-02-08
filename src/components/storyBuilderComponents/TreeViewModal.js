import React, { useState, useEffect, useRef } from 'react'
import PopPop from 'react-poppop';
import PathItemInput from './PathItemInput'
import {useSelector, useDispatch} from 'react-redux';

const TreeViewModal = ({text, idVal}) => {
  const dispatch = useDispatch();
  const PATHS = useSelector((state) => {return(state)});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  let borderStyle = "5px solid #1a237e";
  if(idVal==="root") {
    borderStyle = "5px solid #b71c1c"
  } else if(PATHS[idVal].options.length==0) {
    borderStyle = "5px solid #1b5e20"
  }
  const [divStyle, setDivStyle] = useState({
    color: "white",
    userSelect: "none",
    padding: '15px',
    display: 'inline-block',
    border: borderStyle,
    background: "black",
    borderRadius: "25px",
  });
  const [divStyle2, setDivStyle2] = useState({
    color: "white",
    padding: '15px',
    userSelect: "none",
    display: 'inline-block',
    border: borderStyle,
    background: "black",
    borderRadius: "25px",
    fontSize: "24px",
    top:"30px",
  });
  console.log("PATHS modal: " + JSON.stringify(PATHS))
  console.log("idVal modal : " + JSON.stringify(idVal))

  let isRootAndEmpty = (idVal=="root" && PATHS[idVal].options.length==0);



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
  function hover(isEntering) {
    setIsHover(isEntering);
    if(isEntering) {
      setDivStyle({...divStyle, background: "#282828"})
      setDivStyle2({...divStyle2, background: "#282828"})
    } else {
      setDivStyle({...divStyle, background: "black"})
      setDivStyle2({...divStyle2, background: "black"})
    }
  }

  function toggleShow() { setIsModalOpen(!isModalOpen); }
  return (
    <React.Fragment>
    <div onMouseEnter={() => hover(true)}
        onMouseLeave={() => hover(false)} className = {(!isRootAndEmpty) ? "treeBtn hoverPointer" : " treeBtn hoverPointer pulse"} style={(!isRootAndEmpty) ? divStyle : divStyle2} onClick={()=> {toggleShow()}}>{text}</div>
    <PopPop open={isModalOpen} closeBtn={true} onClose={() => {toggleShow()}}>
      <PathItemInput title={PATHS[idVal].title} pathID={idVal} textVal={PATHS[idVal].text} onChanged={dispatch} parentTitle={getParentTitle(idVal)} defaultOptions={PATHS[idVal].options}  hasVideoDefault={(PATHS[idVal].video=="") ? false : true} defaultVideoURL={PATHS[idVal].video} />
    </PopPop>
    </React.Fragment>
  );
};

export default TreeViewModal;
