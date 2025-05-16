import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import Card from '../common/Card';
import { TreeNode } from '../../types';
import { TreeOperations } from '../../utils/dataStructures';

interface TreeViewProps {
  data: TreeNode;
}

const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  return (
    <Card title="Department Hierarchy (Tree Structure)">
      <div className="ml-2 text-sm">
        <TreeNodeComponent node={data} level={0} />
      </div>
    </Card>
  );
};

interface TreeNodeComponentProps {
  node: TreeNode;
  level: number;
}

const TreeNodeComponent: React.FC<TreeNodeComponentProps> = ({ node, level }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className="mt-1">
      <div 
        className="flex items-center hover:bg-gray-50 p-1 rounded cursor-pointer"
        onClick={toggleExpand}
      >
        <span className="mr-1" style={{ marginLeft: `${level * 16}px` }}>
          {node.children.length > 0 ? (
            isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
          ) : (
            <span className="w-4"></span>
          )}
        </span>
        <span className={`${level === 0 ? 'font-bold text-base text-[#0A2463]' : 'text-gray-700'}`}>
          {node.name}
        </span>
      </div>
      
      {isExpanded && node.children.length > 0 && (
        <div>
          {node.children.map((child, index) => (
            <TreeNodeComponent key={index} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeView;