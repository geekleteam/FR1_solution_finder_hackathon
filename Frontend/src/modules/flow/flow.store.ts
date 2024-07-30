import {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  OnConnect,
} from '@xyflow/react';
import { createWithEqualityFn } from 'zustand/traditional';
import { immer } from 'zustand/middleware/immer';
import { nanoid } from 'nanoid';
import { AppNode } from './nodes/types';
import { AppEdge } from './edges/types';
import { shallow } from 'zustand/shallow';
import { LinkProps, useParams } from '@tanstack/react-router';

type Board = {
  title: string;
  nodes: Node[];
  edges: Edge[];
};

type BoardPath = '/' | (string & {});

type BoardBoundFunction<T> = T extends (...args: infer Args) => infer Result
  ? (path: BoardPath, ...args: Args) => Result
  : never;

export type RFState = {
  boards: Record<BoardPath, Board>;

  onNodesChange: BoardBoundFunction<OnNodesChange>;
  onEdgesChange: BoardBoundFunction<OnEdgesChange>;
  addNode: BoardBoundFunction<(node: Omit<AppNode, 'id'>) => void>;
  addEdge: BoardBoundFunction<OnConnect>;
  setNodes: BoardBoundFunction<(nodes: AppNode[]) => void>;
  setEdges: BoardBoundFunction<(nodes: AppEdge[]) => void>;
  setTitle: BoardBoundFunction<(title: string) => void>;
  updateNode: BoardBoundFunction<(node: Partial<AppNode> & { id: string }) => void>;
  setNodeVisibility: BoardBoundFunction<(nodeId: string, visibility: 'visible' | 'invisible') => void>;
};

const emptyBoard = {
  title: 'Empty Board',
  nodes: [],
  edges: [],
};

const useFlowStore = createWithEqualityFn(
  immer<RFState>((set, get) => ({
    boards: {
      '/': emptyBoard,
    },

    onNodesChange: (path: string, changes: NodeChange[]) =>
      set((draft) => {
        let board = draft.boards[path];
        if (!board) {
          board = draft.boards[path] = structuredClone(emptyBoard);
        }

        board.nodes = applyNodeChanges(changes, board.nodes);
      }),

    onEdgesChange: (path, changes: EdgeChange[]) =>
      set((draft) => {
        let board = draft.boards[path];
        if (!board) {
          board = draft.boards[path] = structuredClone(emptyBoard);
        }

        board.edges = applyEdgeChanges(changes, board.edges);
      }),

    addNode: (path, node) =>
      set((draft) => {
        let board = draft.boards[path];
        const id = nanoid();
        const newNode: Node = { id, ...node };

        if (!board) {
          board = draft.boards[path] = structuredClone(emptyBoard);
        }

        board.nodes.push(newNode);
      }),

    addEdge: (path, connection) =>
      set((draft) => {
        let board = draft.boards[path];
        const id = nanoid();
        const newEdge: Edge = { id, ...connection };

        if (!board) {
          board = draft.boards[path] = structuredClone(emptyBoard);
        }

        board.edges.unshift(newEdge);
      }),
    setNodes: (path, nodes) =>
      set((draft) => {
        let board = draft.boards[path];

        if (!board) {
          board = draft.boards[path] = structuredClone(emptyBoard);
        }

        board.nodes = nodes;
      }),
    setEdges: (path, edges) =>
      set((draft) => {
        let board = draft.boards[path];

        if (!board) {
          board = draft.boards[path] = structuredClone(emptyBoard);
        }

        board.edges = edges;
      }),

    setTitle: (path, title) =>
      set((draft) => {
        let board = draft.boards[path];

        if (!board) {
          board = draft.boards[path] = structuredClone(emptyBoard);
        }

        board.title = title;
      }),

    updateNode: (path, updatedNode) =>
      set((draft) => {
        let board = draft.boards[path];

        if (!board) {
          board = draft.boards[path] = structuredClone(emptyBoard);
        }

        const changes: any = board.nodes.map((node) => {
          if (node.id === updatedNode.id) {
            return { ...node, ...updatedNode };
          } else {
            return node;
          }
        });
        board.nodes = changes;
      }),
    setNodeVisibility: (path, nodeId, visibility) =>
      set((draft) => {
        let board = draft.boards[path];

        if (!board) {
          board = draft.boards[path] = structuredClone(emptyBoard);
        }

        const node = board.nodes.find((n) => n.id === nodeId);
        if (!node) return;

        const setVisibility = (nodeId: string, visibility: string) => {
          const node = board.nodes.find((n) => n.id === nodeId);
          if (node) {
            node.hidden = visibility === 'invisible';

            // Find and hide all children of this node
            board.nodes
              .filter((n) => n.parentId === nodeId)
              .forEach((childNode) => setVisibility(childNode.id, visibility));
          }
        };

        setVisibility(nodeId, visibility);
      }),
  })),
);

export function useBoardPath() {
  const { _splat = '' } = useParams({
    strict: false,
  });
  const path = `/${_splat}`;
  const segmentSlugs = _splat === '' ? [''] : path.split('/');

  const segments: { title: string; segment: string; link: LinkProps }[] = [];
  for (let segmentIdx = 0; segmentIdx < segmentSlugs.length; segmentIdx++) {
    const segment = segmentSlugs[segmentIdx];
    const segmentPath = segmentSlugs.join('/');

    segments.push({
      title: getBoard(segmentPath).title,
      segment,
      link: {
        to: '/p/$project/board/$',
        params: {
          _splat: segmentSlugs.slice(1, segmentIdx + 1).join('/'),
        },
      },
    });
  }

  return {
    path,
    segments,
  };
}

export function getBoard(path: string) {
  return useFlowStore.getState().boards[path] || emptyBoard;
}

export function useBoard(path: string) {
  const title = useFlowStore((s) => s.boards[path]?.title || emptyBoard.title, shallow);
  const nodes = useFlowStore((s) => s.boards[path]?.nodes || emptyBoard.nodes, shallow);
  const edges = useFlowStore((s) => s.boards[path]?.edges || emptyBoard.edges, shallow);

  return {
    title,
    nodes,
    edges,
  };
}

useFlowStore.setState({
  boards: {
    '/': emptyBoard,
  },
});

export default useFlowStore;
