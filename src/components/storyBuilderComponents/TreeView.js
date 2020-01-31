import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'

const ExampleTree = () => (
  <Tree label={<div>Root</div>}>
    <TreeNode label={<div>Child 1</div>}>
      <TreeNode label={<div>Grand Child</div>} />
    </TreeNode>
  </Tree>
);
