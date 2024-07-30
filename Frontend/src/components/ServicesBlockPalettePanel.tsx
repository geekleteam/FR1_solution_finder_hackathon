import { useState } from 'react';
import { CircleX, Grid, List, Plus } from 'lucide-react';
import { useDrag } from 'react-aria';
import { AppNode } from '~/modules/flow/nodes/types';
import { Node } from '@xyflow/react';

const BlockPalettePanel = ({setShowBlocks}:any) => {
  const [filter, setFilter] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [blocks, setBlocks] = useState<NodeTypeProps[]>([
    {
      label: 'Group',
      icon: '□',
      type: 'group',
      creator: ({ label }) => ({
        data: {
          color: 'red',
          label: `${label}`,
        },
      }),
    },
    { label: 'Load Balancer', icon: '⚖️', type: 'service' },
    { label: 'Cache', icon: '💾', type: 'service' },
    { label: 'Database', icon: '🗄️', type: 'service' },
    { label: 'API Gateway', icon: '🚪', type: 'service' },
    { label: 'Message Queue', icon: '📨', type: 'service' },
    { label: 'CDN', icon: '🌐', type: 'service' },
    { label: 'Web Server', icon: '🖥️', type: 'service' },
    { label: 'Application Server', icon: '🚀', type: 'service' },
    { label: 'Firewall', icon: '🛡️', type: 'service' },
    { label: 'Storage', icon: '💽', type: 'service' },
    { label:"Group" , icon:"📥", type:"group"},
  ]);

  const filteredBlocks = blocks.filter((block) => block.label.toLowerCase().includes(filter.toLowerCase()));

  const addNewBlock = () => {
    const newBlock = { label: filter, icon: '🆕', type: 'service' };
    setBlocks([...blocks, newBlock]);
    setFilter('');
  };

  return (
    <div className="absolute drag-and-drop-blocks flex flex-col gap-1 border border-gray-200 p-2 -translate-y-1/2 bg-white top-1/2 left-20">
      <CircleX onClick={()=>setShowBlocks(false)} className='absolute -top-3 -right-3 cursor-pointer hover:text-red-600 ' />
      <div className="p-2 bg-purple-100 border-b border-purple-300 flex items-center">
        <input
          type="text"
          placeholder="Filter blocks..."
          className="flex-grow mr-2 px-2 py-1 text-sm border border-purple-300 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={() => setIsGridView(!isGridView)} className="p-1 text-purple-600 hover:text-pink-500">
          {isGridView ? <List size={20} /> : <Grid size={20} />}
        </button>
      </div>

      {filteredBlocks.length > 0 ? (
        <div
          className={`p-2 overflow-y-auto h-80 ${isGridView ? 'grid grid-cols-2 gap-2' : 'grid grid-cols-1 space-y-2'}`}
        >
          {filteredBlocks.map((block, index) => (
            <NodeType
              type={block.type}
              icon={block.icon}
              label={block.label}
              isGridView={isGridView}
              creator={block.creator}
            />
          ))}
        </div>
      ) : (
        <div className="p-2 flex flex-col items-center justify-center h-80">
          <p className="text-sm text-purple-600 mb-2">No matching blocks</p>
          <button
            onClick={addNewBlock}
            className="flex items-center px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            <Plus size={16} className="mr-1" />
            Add "{filter}"
          </button>
        </div>
      )}
    </div>
  );
};

// interface NodeTypeProps<T extends NonNullable<AppNode['type']>> {
//   type: T;
//   label?: string;
//   icon?: React.ReactNode;
//   creator?: (ctx: {label?: string;
//     icon?: React.ReactNode;}) => Omit<AppNode & { type: T }, 'id' | 'type' | 'position'>;
// }

interface NodeTypeProps {
  isGridView?: boolean;
  type: string;
  label: string;
  icon: string;
  creator?: (ctx: { label: string; icon: string }) => Omit<AppNode, 'id' | 'type' | 'position'>;
}

export function NodeType({
  isGridView,
  type,
  icon,
  label,
  creator = ({ icon, label }) => ({
    data: {
      icon,
      label: `New ${label}`,
    },
  }),
}: NodeTypeProps) {
  const { dragProps } = useDrag({
    getItems() {
      const items = [
        {
          'application/geekle-ai-diagram': JSON.stringify({
            type,
            ...creator?.({
              icon,
              label,
            }),
          }),
        },
      ];

      console.log(items);

      return items;
    },
  });

  return (
    <div
      className={`flex items-center px-2 bg-white rounded shadow cursor-move hover:bg-purple-100 ${isGridView ? 'flex-col justify-center py-2' : 'flex-row justify-start'}`}
      {...dragProps}
    >
      <span className={`${isGridView ? 'text-2xl' : 'text-lg'} mb-1`}>{icon}</span>
      <span className="text-xs text-center">{label}</span>
    </div>
  );
}

export default BlockPalettePanel;
