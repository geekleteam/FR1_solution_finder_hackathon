import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Lock, UnlockIcon } from 'lucide-react';
import useFlowStore, { RFState } from '~/modules/flow/flow.store';
import { shallow } from 'zustand/shallow';

const InputWithArrows: React.FC<any> = ({ label, value, onChange, disabled }) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
    <div className="flex items-center">
      <input
        type="number"
        name={label.toLowerCase()}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-l px-2 py-1 w-14 text-right appearance-none border border-gray-300 dark:border-gray-700"
        style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
      />
    </div>
  </div>
);

const BlockProperties = ({ path }: any) => {
  const flowSelector = useCallback(
    (state: RFState) => ({
      nodes: state.boards[path].nodes,
      updateNode: state.updateNode,
    }),
    [path],
  );

  const { nodes, updateNode } = useFlowStore(flowSelector, shallow);

  const [showAllNodes, setShowAllNodes] = useState(true);
  const [selectedNodes, setSelectedNodes] = useState<any[]>([]);

  useEffect(() => {
    if (showAllNodes) {
      setSelectedNodes([...nodes]);
    } else {
      setSelectedNodes([...nodes.filter((node) => node.selected)]);
    }
  }, [nodes, showAllNodes]);

  return (
    <>
      <div className="flex items-center gap-2 justify-center">
        <p className="text-xs font-bold">Show Only Selected Blocks</p>
        <label
          htmlFor="AcceptConditions"
          className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
        >
          <input
            type="checkbox"
            checked={!showAllNodes}
            onChange={() => setShowAllNodes(!showAllNodes)}
            id="AcceptConditions"
            className="peer sr-only"
          />
          <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-all peer-checked:start-6"></span>
        </label>
      </div>
      {selectedNodes && selectedNodes.length > 0 ? (
        selectedNodes.map((selectedNode) => (
          <Node key={selectedNode.id} node={selectedNode} updateNode={updateNode} path={path} />
        ))
      ) : (
        <span className=" text-red-400">No Node {showAllNodes ? `Available.` : `Selected.`} </span>
      )}
    </>
  );
};

export default BlockProperties;

const Node = ({ node, updateNode, path }: any) => {
  const [disableInputs, setDisableInputs] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      let updatedNode = { ...node };

      if (['x', 'y'].includes(name)) {
        updatedNode.position = { ...updatedNode.position, [name]: parseFloat(value) };
      } else if (['width', 'height'].includes(name)) {
        updatedNode.measured = { ...updatedNode.measured, [name]: parseFloat(value) };
      } else {
        updatedNode.data = { ...updatedNode.data, [name]: value };
      }

      updateNode(path, updatedNode);
    },
    [node, updateNode],
  );

  return (
    <div>
      {node.id && (
        <div className="w-full mt-2 relative bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 font-sans shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <p className="text-xs font-bold">
              <span className="mr-1">{node.data.icon}</span>
              {node.id.toUpperCase()}
            </p>
            <div className={`w-full ${!isOpen && `hidden `}`}>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-600 dark:text-gray-400">ID</span>
                <input
                  type="text"
                  value={node.id}
                  readOnly
                  disabled
                  className="bg-gray-100 dark:bg-gray-800 text-sm rounded px-2 py-1 w-40 text-right border border-gray-300 dark:border-gray-700"
                />
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-600 dark:text-gray-400">Label</span>
                <input
                  type="text"
                  name="label"
                  value={node.data.label}
                  disabled={disableInputs}
                  onChange={handleChange}
                  className="bg-gray-100 dark:bg-gray-800 text-sm rounded px-2 py-1 w-40 text-right border border-gray-300 dark:border-gray-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                <InputWithArrows label="X" value={node.position.x} onChange={handleChange} disabled={disableInputs} />
                <InputWithArrows label="Y" value={node.position.y} onChange={handleChange} disabled={disableInputs} />
                <InputWithArrows
                  label="WIDTH"
                  value={node.measured.width}
                  onChange={handleChange}
                  disabled={disableInputs}
                />
                <InputWithArrows
                  label="HEIGHT"
                  value={node.measured.height}
                  onChange={handleChange}
                  disabled={disableInputs}
                />
              </div>
            </div>
            <div>
              <label className=" text-xs text-gray-700">Description:</label>
              <textarea
                rows={3}
                name="notes"
                className="mt-1 block w-full text-gray-700 text-sm rounded-md border-purple-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                value={node.description}
                onChange={handleChange}
                disabled={disableInputs}
              />
            </div>
          </div>
          <div className="absolute top-2 right-2 flex space-x-2">
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              {isOpen ? (
                <ChevronUp onClick={() => setIsOpen(false)} size={20} />
              ) : (
                <ChevronDown onClick={() => setIsOpen(true)} size={20} />
              )}
            </button>
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              {disableInputs ? (
                <Lock color="red" onClick={() => setDisableInputs(false)} size={20} />
              ) : (
                <UnlockIcon color="#35d366" onClick={() => setDisableInputs(true)} size={20} />
              )}
            </button>
          </div>
        </div>
      )}

      <div className="absolute top-2 right-2 flex space-x-2">
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          {isOpen ? (
            <ChevronUp onClick={() => setIsOpen(false)} size={20} />
          ) : (
            <ChevronDown onClick={() => setIsOpen(true)} size={20} />
          )}
        </button>
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          {disableInputs ? (
            <Lock color="red" onClick={() => setDisableInputs(false)} size={20} />
          ) : (
            <UnlockIcon color="#35d366" onClick={() => setDisableInputs(true)} size={20} />
          )}
        </button>
      </div>
    </div>
  );
};
