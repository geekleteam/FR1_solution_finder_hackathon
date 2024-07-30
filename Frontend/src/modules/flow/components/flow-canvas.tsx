import '@xyflow/react/dist/style.css';

import { useCallback, useRef } from 'react';
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import { shallow } from 'zustand/shallow';
import useFlowStore, { RFState, useBoard } from '../flow.store';
import { nodeTypes } from '../nodes';
import { edgeTypes } from '../edges';
import { useDrop } from 'react-aria';
import { useThemeMode } from 'flowbite-react';
import { SettingsPanel } from '../panels/SettingsPanel';
import { NavigationPanel } from '../panels/navigation';
import { useFlow } from '../hooks/use-flow';
import { nanoid } from 'nanoid';
import FloatingCleanButton from '~/components/FloatingCleanButton';
import { DevTool } from '~/modules/devtool';
import { useParams, useRouter } from '@tanstack/react-router';
// import Sidebar from '../../../components/sidebar';

interface FlowCanvasProps {
  path: string;
}

export function FlowCanvas({ path }: FlowCanvasProps) {
  const flow = useFlow();
  const params = useParams({ strict: false });
  const router = useRouter();
  const { mode: themeMode } = useThemeMode();
  const flowSelector = useCallback(
    (state: RFState) => ({
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      addEdge: state.addEdge,
      addNode: state.addNode,
      setEdges: state.setEdges,
      setNodes: state.setNodes,
    }),
    [path],
  );
  const { nodes, edges } = useBoard(path);
  const { onNodesChange, onEdgesChange, addEdge, addNode, setNodes, setEdges } = useFlowStore(flowSelector, shallow);

  const ref = useRef(null);
  const { dropProps } = useDrop({
    ref,
    async onDrop({ items: [item], x, y }) {
      if (item.kind === 'text' && item.types.has('application/geekle-ai-diagram')) {
        const node = JSON.parse(await item.getText('application/geekle-ai-diagram'));
        addNode(path, {
          id: nanoid(),
          position: flow.screenToFlowPosition({ x, y }),
          ...node,
        });
      }
    },
  });

  return (
    <>
      <ReactFlow
        className="playground"
        ref={ref}
        fitView
        // Nodes and Edges
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={(changes) => onNodesChange(path, changes)}
        onEdgesChange={(changes) => onEdgesChange(path, changes)}
        onConnect={(connection) => addEdge(path, connection)}
        onNodeDoubleClick={(_, node) => {
          router.navigate({
            to: '/p/$project/board/$',
            params: {
              _splat: `${params._splat || ''}/${node.id}`,
            },
          });
        }}
        // DnD
        onDragEnter={dropProps.onDragEnter}
        onDragLeave={dropProps.onDragLeave}
        onDragOver={dropProps.onDragOver}
        onDrop={dropProps.onDrop}
        // Theme
        colorMode={themeMode === 'auto' ? 'system' : themeMode}
      >
        <SettingsPanel />
        <NavigationPanel />

        <Background className="dark:bg-gray-900" />
        <MiniMap position="bottom-left" className="dark:bg-gray-900" />
        <Controls className="payground-controls" showInteractive={false} />
        {/* <DevTool /> */}
      </ReactFlow>

      <FloatingCleanButton
        onClean={() => {
          setNodes(path, []);
          setEdges(path, []);
        }}
      />
    </>
  );
}
