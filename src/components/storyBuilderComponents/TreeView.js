import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'
let divStyle = {
  color: 'black',
  padding: '5px',
  display: 'inline-block',
  border: '5px solid black'
};
let obj = {}
const TreeView = (pathArg) => {
  let paths = pathArg.paths
  function getLabelCode(text) {
    return <div style={divStyle}>{text}</div>;
  }
  function getTreeCode(searchID) {
    if(paths[searchID].options.length==0) {
      let atr = <div style={divStyle}>{paths[searchID].title}</div>;
      return <TreeNode label={atr} />;
    }
    else  {
      let atr = <div style={divStyle}>{paths[searchID].title}</div>;
      return (
        <TreeNode label={atr} >
            {paths[searchID].options.map((option, index) => (
              <TreeNode label={getLabelCode(option.text)}>
              {(getTreeCode(option.pathID))}
              </TreeNode>
            ))
          }
        </TreeNode>
      );

    }

  }

  return (
      <React.Fragment>
        <Tree
        lineWidth={"10px"}
        lineColor={"blue"}
        label = {paths["root"].title}
        >
          {getTreeCode("root")}
        </Tree>
      </React.Fragment>
  );

};
export default TreeView;
