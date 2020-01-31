import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'

const TreeView = (pathArg) => {
  let paths = pathArg.paths
  function getTreeCode(searchID) {
    if(paths[searchID].options.length==0) {
      return <TreeNode label={paths[searchID].title} />;
    }
    else {
      return (
        <TreeNode label={paths[searchID].title} >
          {
            paths[searchID].options.map((option, index) => (
              <TreeNode label={option.title}>
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
        <Tree>
          {getTreeCode("root")}
        </Tree>
      </React.Fragment>
  );

};
export default TreeView;
