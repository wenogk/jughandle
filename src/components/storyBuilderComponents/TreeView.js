import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'

const TreeView = () => {
  return (
    
  <Tree label={<div>Root</div>}>
    <TreeNode label={<div>Child 1</div>}>
      <TreeNode label={<div>Grand Child</div>} />
    </TreeNode>
  </Tree>
);
};
export default TreeView;
