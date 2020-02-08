import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'
import Popup from "reactjs-popup";
import PopPop from 'react-poppop';
import PathItemInput from './PathItemInput'
import TreeViewModal from './TreeViewModal'
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

  function getLabelCode(text,id) {
    return (
      <TreeViewModal text={text} idVal={id} />
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
