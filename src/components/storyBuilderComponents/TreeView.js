import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'
import Popup from "reactjs-popup";
import PathItemInput from './PathItemInput'
import {useSelector, useDispatch} from 'react-redux';
let obj = {}
const TreeView = () => {

  const dispatch = useDispatch();
  const PATHS = useSelector((state) => {return(state)});

  function getParentTitle(pathID) {
  //console.log("get parent title function called")

    for (let idVal in PATHS) {
      for(let optionIndex in PATHS[idVal].options) {
        if(PATHS[idVal].options[optionIndex].pathID === pathID) {
          console.log("PARENT TITLE IS " + PATHS[idVal].title)
          return PATHS[idVal].title;
        }
      }
    }
  }

  function getLabelCode(text,idVal) {
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
    let triggerCode = <div  className={ (isRootAndEmpty) ? "hoverPointer pulse" :"hoverPointer"} style={divStyle}>{text}</div>;
    if(isRootAndEmpty) {
      triggerCode = <div className = "hoverPointer pulse" style={divStyle2}>{text}</div>
    }
    return (

      <Popup trigger={ triggerCode } modal>
      {close => (
      <div className="modal2" style={{maxHeight:"65vh",overflow:"auto"}}>
        <a className="close" onClick={close}>
        <i class="tiny material-icons" >close</i>
        </a>

        <div className="content">
        <PathItemInput title={PATHS[idVal].title} pathID={idVal} textVal={PATHS[idVal].text} onChanged={dispatch} parentTitle={getParentTitle(idVal)} defaultOptions={PATHS[idVal].options}  hasVideoDefault={(PATHS[idVal].video=="") ? false : true} defaultVideoURL={PATHS[idVal].video} />
        </div>

        </div>


    ) }
    </Popup>
    )
  }

  function hasChildren(id) {
    return (PATHS[id].options.length > 0)
  }

  function getOptionsCode(option) {
    if(hasChildren(option.pathID)) {
      return(
        <TreeNode label={getLabelCode(option.text,option.pathID)}>
          {(getTreeCode(option.pathID))}
        </TreeNode>
      )
    } else {
      return(
        <TreeNode label={getLabelCode(option.text,option.pathID)} />
      )
    }
  }

  function getTreeCode(searchID, prevSearchID = "") {
    if(prevSearchID==searchID) {
      return;
    } else if(PATHS[searchID].options.length==0 && searchID!="root") {
      return <TreeNode label={getLabelCode(PATHS[searchID].title,searchID)} />;
    } else  {
          return (
            <React.Fragment>
                {
                  PATHS[searchID].options.map((option, index) => (
                    <React.Fragment>
                      {getOptionsCode(option)}
                    </React.Fragment>
                  ))
                }
              </React.Fragment>
          );

        }

  }

  return (
      <React.Fragment>
        <Tree
        lineWidth={"5px"}
        lineColor={(PATHS["root"].options.length > 0) ? "black" : "rgba(255, 0, 0, 0)"}
        label = {getLabelCode(PATHS["root"].title,"root")}
        >
          {getTreeCode("root")}
        </Tree>
      </React.Fragment>
  );

};
export default TreeView;
