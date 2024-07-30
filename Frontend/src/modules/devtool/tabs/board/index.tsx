import { List, ListItem } from 'flowbite-react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { useBoard, useBoardPath } from '~/modules/flow/flow.store';

export function BoardDebugger() {
  const { path } = useBoardPath();
  const board = useBoard(path);

  return (
    <List unstyled className="text-xs font-mono">
      <ObjectInspector property="" value={board} defaultExpanded />
    </List>
  );
}

function ObjectInspector({
  property,
  value,
  defaultExpanded,
}: {
  property: string;
  value: {};
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const getRenderer = (value: any) => {
    let type: keyof typeof typeMapper = typeof value;

    if (typeof value === 'object' && !Array.isArray(value)) {
      type = 'object';
    } else if (Array.isArray(value)) {
      type = 'array';
    }

    return typeMapper[type] as (props: { property: string; value: any }) => React.ReactNode;
  };

  const children = Object.entries(value || {});

  return (
    <ListItem key={property || 'root'}>
      {children.length > 0 ? (
        <>
          {property && (
            <span
              className="font-medium mr-2 flex items-center cursor-pointer"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? <ChevronDown className="mr-1" size={12} /> : <ChevronRight className="mr-1" size={12} />}{' '}
              {property}:
            </span>
          )}
          {expanded && (
            <List unstyled className={`pl-2 ml-[6px] ${property ? 'border-l' : ''}`}>
              {children.map(([key, value]) => {
                const Component = getRenderer(value);
                return <Component key={key} property={key} value={value} />;
              })}
            </List>
          )}
        </>
      ) : (
        <>
          {property && (
            <span className="font-medium mr-2 inline-flex items-center cursor-pointer">
              <ChevronRight size={12} className="invisible mr-1" /> {property}:
            </span>
          )}
          <span className="font-medium dark:text-gray-200 mr-2">{'{}'}</span>
        </>
      )}
    </ListItem>
  );
}

const typeMapper = {
  object: ObjectInspector,
  array: ArrayInspector,
  number: NumberRenderer,
  bigint: NumberRenderer,
  string: StringRenderer,
  symbol: () => null, // TODO
  boolean: BooleanRenderer,
  null: NullRenderer,
  undefined: () => null, // TODO?
  function: () => null, // TODO?
} satisfies Record<string, (props: { property: string; value: any }) => React.ReactNode>;

function ArrayInspector({ property, value }: { property: string; value: any[] }) {
  const [expanded, setExpanded] = useState(false);
  const getRenderer = (value: any) => {
    let type: keyof typeof typeMapper = typeof value;

    if (typeof value === 'object' && !Array.isArray(value)) {
      type = 'object';
    } else if (Array.isArray(value)) {
      type = 'array';
    }

    return typeMapper[type] as (props: { property: string; value: any }) => React.ReactNode;
  };

  const children = Object.entries(value || {});

  return (
    <ListItem key={property || 'root'}>
      {children.length > 0 ? (
        <>
          <span
            className="font-medium mr-2 flex items-center cursor-pointer"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? <ChevronDown className="mr-1" size={12} /> : <ChevronRight className="mr-1" size={12} />}{' '}
            {property}:
          </span>
          {expanded && (
            <List unstyled className={`pl-2 ml-[6px] ${property ? 'border-l' : ''}`}>
              {children.map(([key, value]) => {
                const Component = getRenderer(value);
                return <Component key={key} property={key} value={value} />;
              })}
            </List>
          )}
        </>
      ) : (
        <>
          <span className="font-medium mr-2 inline-flex items-center cursor-pointer">
            <ChevronRight size={12} className="invisible mr-1" /> {property}:
          </span>
          <span className="font-medium dark:text-gray-200 mr-2">{'[]'}</span>
        </>
      )}
    </ListItem>
  );
}

function StringRenderer({ property, value }: { property: string; value: string }) {
  return (
    <ListItem key={property} className="flex">
      <span className="font-medium mr-2 inline-flex items-center">
        <ChevronRight size={12} className="invisible mr-1" />
        {property}:
      </span>
      <div className="font-medium dark:text-gray-200 mr-2">"{value}"</div>
    </ListItem>
  );
}

function NumberRenderer({ property, value }: { property: string; value: number }) {
  return (
    <ListItem key={property} className="flex">
      <span className="font-medium mr-2 inline-flex items-center">
        <ChevronRight size={12} className="invisible mr-1" />
        {property}:
      </span>
      <span className="font-medium dark:text-gray-200 mr-2">{value}</span>
    </ListItem>
  );
}

function BooleanRenderer({ property, value }: { property: string; value: boolean }) {
  return (
    <ListItem key={property} className="flex">
      <span className="font-medium mr-2 inline-flex items-center">
        <ChevronRight size={12} className="invisible mr-1" />
        {property}:
      </span>
      <span className="font-medium dark:text-gray-200 mr-2">{value}</span>
    </ListItem>
  );
}

function NullRenderer({ property }: { property: string; value: null }) {
  return (
    <ListItem key={property} className="flex">
      <span className="font-medium mr-2 inline-flex items-center">
        <ChevronRight size={12} className="invisible mr-1" />
        {property}:
      </span>
      <span className="font-medium dark:text-gray-200 mr-2">null</span>
    </ListItem>
  );
}
