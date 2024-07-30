import { useState } from 'react';
import { ChevronDown, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { useNodes } from '@xyflow/react';
import { List, ListItem } from 'flowbite-react';
import { AppNode } from '../nodes/types';
import useFlowStore from '../flow.store';

interface HierarchyProps {
  path: string;
}

export const Hierarchy = ({ path }: HierarchyProps) => {
  const nodes = useNodes() as AppNode[];

  return <HierarchyItems path={path} nodes={nodes} />;
};

// -----------------------------------------------------------------------------
// Hierarchy Items
// -----------------------------------------------------------------------------

interface HierarchyItemsProps {
  path: string;
  nodes: AppNode[];
  forNode?: string;
}
function HierarchyItems({ path, nodes, forNode }: HierarchyItemsProps) {
  return (
    <List unstyled>
      {nodes
        .filter((node) => (forNode ? node.parentId === forNode : !node.parentId))
        .map((node) => (
          <HierarchyItem
            path={path}
            key={node.id}
            node={node}
            nodes={nodes}
            hasChildren={nodes.some((other) => other.parentId === node.id)}
          />
        ))}
    </List>
  );
}

// -----------------------------------------------------------------------------
// Hierarchy Item
// -----------------------------------------------------------------------------

interface HierarchyItemProps {
  path: string;
  nodes: AppNode[];
  node: AppNode;
  hasChildren?: boolean;
}
function HierarchyItem({ path, nodes, node, hasChildren }: HierarchyItemProps) {
  const [expanded, setExpanded] = useState(false);
  const setNodeVisibility = useFlowStore((s) => s.setNodeVisibility);
  const nodeVisible = useFlowStore((s) => s.boards[path].nodes.find((n) => n.id === node.id)?.hidden !== true);

  return (
    <ListItem className="flex flex-col group hierarchy-item cursor-default hover:bg-gray-800/40 py-1">
      <div className="flex flex-row">
        <button
          onClick={() => setExpanded((value) => !value)}
          className={`px-2 ${!hasChildren ? 'disabled invisible' : ''}`}
        >
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        <span className={nodeVisible ? '' : 'opacity-40'}>{node.data.label}</span>

        <div className="ml-auto px-2">
          <button
            onClick={() => setNodeVisibility(path, node.id, nodeVisible ? 'invisible' : 'visible')}
            className="group-hover:visible invisible ml-2 text-gray-300 hover:text-pink-500"
          >
            {nodeVisible ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
      </div>

      {expanded ? (
        <div className="ml-4">
          <HierarchyItems path={path} nodes={nodes} forNode={node.id} />
        </div>
      ) : null}
    </ListItem>
  );
}
