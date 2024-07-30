import { Button, TabItem, Tabs } from 'flowbite-react';
import { ChevronDown, CircleChevronDown, Workflow } from 'lucide-react';
import { useState } from 'react';
import { BoardPage } from '~/pages/(app)/board';
import { BoardDebugger } from './tabs/board';
// import TabBar from './TabBar';
// import ObjectRenderer from './ObjectRenderer';
// import ArrayRenderer from './ArrayRenderer';
// import StringRenderer from './StringRenderer';
// import NumberRenderer from './NumberRenderer';
// import BooleanRenderer from './BooleanRenderer';

interface InspectorProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Inspector = ({ isOpen, onClose }: InspectorProps) => {
  return (
    <div
      className={`
      fixed bottom-0 left-0 w-full border bg-white border-gray-200 text-gray-800 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200 z-[999999]
      transition-all h-1/2 overflow-y-auto
      ${isOpen ? 'bottom-0' : '-bottom-full'}
   `}
    >
      <Button
        size="xs"
        theme={{
          base: /* tw */ 'absolute w-8 h-6 left-5 flex items-center justify-center !rounded-none !rounded-t-lg -translate-y-full translate-x-2 !bg-white !border-gray-200 dark:!bg-zinc-800 dark:!border-zinc-600',
          inner: { base: /* tw */ '!rounded-none ' },
        }}
        color="gray"
        onClick={onClose}
      >
        <ChevronDown size={14} />
      </Button>
      <Tabs
        variant="underline"
        theme={{
          tablist: {
            tabitem: {
              base: /* tw */ 'flex items-center justify-center px-2 py-2 text-sm font-medium !rounded-none  first:ml-0 focus:outline-none focus:ring-2 focus:ring-cyan-300 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500',
            },
          },
        }}
      >
        <TabItem icon={Workflow} title="Board">
          <BoardDebugger />
        </TabItem>
      </Tabs>
    </div>
  );
};
