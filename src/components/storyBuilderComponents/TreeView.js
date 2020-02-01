import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'

let obj = {}
const TreeView = (pathArg) => {
  let paths = pathArg.paths

  function getLabelCode(text) {
    let divStyle = {
      color: '#311b92',
      padding: '5px',
      display: 'inline-block',
      border: '5px solid #311b92'
    };
    return <div style={divStyle}>{text}</div>;
  }

  function hasChildren(id) {
    return (paths[id].options.length > 0)
  }

  function getOptionsCode(option) {
    if(hasChildren(option.pathID)) {
      return(
        <TreeNode label={getLabelCode(option.text)}>
          {(getTreeCode(option.pathID))}
        </TreeNode>
      )
    } else {
      return(
        <TreeNode label={getLabelCode(option.text)} />
      )
    }
  }

  function getTreeCode(searchID, prevSearchID = "") {
    if(prevSearchID==searchID) {
      return;
    } else if(paths[searchID].options.length==0 && searchID!="root") {
      return <TreeNode label={getLabelCode(paths[searchID].title)} />;
    } else  {
          return (
            <React.Fragment>
                {
                  paths[searchID].options.map((option, index) => (
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
        label = {getLabelCode(paths["root"].title)}
        >
          {getTreeCode("root")}
        </Tree>
      </React.Fragment>
  );

};
export default TreeView;
