import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'
import Modal from "reactjs-popup";
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

    let divStyle = {
      color: '#311b92',
      padding: '5px',
      display: 'inline-block',
      border: '5px solid #311b92'
    };
    return (
      <Modal modal trigger={  <div className="hoverPointer" style={divStyle}>{text}</div>}>
        <PathItemInput title={PATHS[idVal].title} pathID={idVal} textVal={PATHS[idVal].text} onChanged={dispatch} parentTitle={getParentTitle(idVal)} defaultOptions={PATHS[idVal].options}  hasVideoDefault={(PATHS[idVal].video=="") ? false : true} defaultVideoURL={PATHS[idVal].video} />
      </Modal>
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
        lineColor={"black"}
        label = {getLabelCode(PATHS["root"].title,"root")}
        >
          {getTreeCode("root")}
        </Tree>
      </React.Fragment>
  );

};
export default TreeView;
