import { Panel } from '@xyflow/react';
import { Breadcrumbs } from '../components/breadcrumbs';
import {
  Alert,
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  FileInput,
  Label,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
} from 'flowbite-react';
import { ArrowLeft, Download, Menu, Upload } from 'lucide-react';
import { useState } from 'react';
import useFlowStore, { getBoard, useBoard, useBoardPath } from '../flow.store';
import { saveAs } from 'file-saver';
import { useForm } from 'react-hook-form';
import { AppNode } from '../nodes/types';
import { AppEdge } from '../edges/types';
import { ServiceNode } from '../nodes/service-node';

export function NavigationPanel() {
  return (
    <Panel position="top-left" className="flex flex-row items-center">
      <AppMenu />
      <Breadcrumbs />
    </Panel>
  );
}

function AppMenu() {
  const [modalOpen, setModalOpen] = useState<'import' | 'export' | ''>('');
  /* <img src="/logo.png" className="h-12 w-auto" alt="Logo" /> */

  function closeModal() {
    setModalOpen('');
  }

  return (
    <>
      <Dropdown
        inline
        label={<Menu />}
        arrowIcon={false}
        theme={{
          inlineWrapper: 'mx-2',
        }}
      >
        <DropdownItem icon={Upload} onClick={() => setModalOpen('import')}>
          Import
        </DropdownItem>
        <DropdownItem icon={Download} onClick={() => setModalOpen('export')}>
          Download
        </DropdownItem>
      </Dropdown>

      <DownloadModal isOpen={modalOpen === 'export'} onClose={closeModal} />
      <ImportModal isOpen={modalOpen === 'import'} onClose={closeModal} />
    </>
  );
}
interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function DownloadModal({ isOpen, onClose }: ModalProps) {
  const { path: currentBoardPath } = useBoardPath();
  const form = useForm({
    defaultValues: {
      board: 'current' as 'all' | 'current' | 'custom',
      view: 'current' as 'all' | 'default' | 'current' | 'custom',
      selection: [] as string[],
    },
  });

  const downloadBoard = form.watch('board');

  const submit = form.handleSubmit(function (data) {
    if (data.board !== 'current' || data.view !== 'current') {
      return;
    }

    const board = getBoard(currentBoardPath);
    const blob = new Blob([JSON.stringify(board, null, 2)], { type: 'application/json' });
    saveAs(blob, `${board.title}.json`, { autoBom: true });
    onClose?.();
  });

  return (
    <Modal show={isOpen} onClose={onClose}>
      <form onSubmit={submit}>
        <ModalHeader>Download Options</ModalHeader>
        <ModalBody>
          <Alert>Currently only downloading the current board and the current view is supported</Alert>

          <div className="my-2 block">
            <Label htmlFor="download-board-mode" value="Board" />
          </div>
          <Select id="download-board-mode" required {...form.register('board')}>
            <option value="all">All boards</option>
            <option value="current">This board only</option>
            <option value="custom">Custom selection</option>
          </Select>

          {downloadBoard === 'all' && (
            <>
              <div className="my-2 block">
                <Label htmlFor="download-view-mode" value="View" />
              </div>
              <Select id="download-view-mode" required {...form.register('view')}>
                <option value="all">All views</option>
                <option value="default">Default view only</option>
              </Select>
            </>
          )}

          {downloadBoard === 'current' && (
            <>
              <div className="my-2 block">
                <Label htmlFor="download-view-mode" value="View" />
              </div>
              <Select id="download-view-mode" required {...form.register('view')}>
                <option value="all">All views</option>
                <option value="current">Current view only</option>
                <option value="custom">Custom selection</option>
              </Select>
            </>
          )}
          {downloadBoard === 'custom' && (
            <>
              <div className="my-2 block">
                <Label htmlFor="download-view-mode" value="View" />
              </div>
              <input type="hidden" {...form.register('view')} />
              <BoardSelector {...form.register('selection')} />
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button type="submit">Download now</Button>
          <Button color="gray" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

function ImportModal({ isOpen, onClose }: ModalProps) {
  const { path } = useBoardPath();
  const { setNodes, setEdges, setTitle } = useFlowStore();
  const [fileSelected, setFileSelected] = useState(false);
  const form = useForm({
    defaultValues: {
      title: '',
      nodes: [] as AppNode[],
      edges: [] as AppEdge[],
    },
  });

  const handleChange = function (file?: File | null) {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);

        if (
          !parsedData.nodes ||
          !parsedData.edges ||
          !Array.isArray(parsedData.nodes) ||
          !Array.isArray(parsedData.edges)
        ) {
          throw new Error('Invalid JSON structure: missing nodes or edges arrays');
        }

        form.setValue('title', parsedData.title);
        form.setValue('nodes', parsedData.nodes);
        form.setValue('edges', parsedData.edges);
        setFileSelected(true);
      } catch (error: any) {
        console.error('Error parsing JSON:', error);
        alert(`Error parsing JSON: ${error?.message}`);
      }
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      alert('Error reading file');
    };
    reader.readAsText(file);
  };

  const cancelImport = () => {
    setFileSelected(false);
  };

  const submit = form.handleSubmit((data) => {
    setTitle(path, data.title);
    setNodes(path, data.nodes);
    setEdges(path, data.edges);
    onClose?.();
  });

  return (
    <Modal show={isOpen} onClose={onClose}>
      <form onSubmit={submit}>
        <ModalHeader>Import board</ModalHeader>
        {!fileSelected ? (
          <ModalBody>
            <div className="my-2 block">
              <Label htmlFor="import-file" value="Board" />
            </div>
            <FileInput id="import-file" onChange={(ev) => handleChange(ev.target.files?.[0])} />
          </ModalBody>
        ) : (
          <ModalBody>
            <Button
              onClick={cancelImport}
              outline
              size="sm"
              color="gray"
              theme={{
                inner: {
                  base: 'items-center flex flex-row',
                },
              }}
            >
              <ArrowLeft size={16} />
              Import a different file
            </Button>

            <p className="text-gray-800 dark:text-gray-300">Preview of nodes to load</p>

            <List unstyled>
              {form
                .getValues('nodes')
                .filter((node): node is ServiceNode => node.type === 'service')
                .slice(0, 8)
                .map((node) => (
                  <ListItem icon={() => node.data.icon}>{node.data.label}</ListItem>
                ))}
            </List>
          </ModalBody>
        )}
        <ModalFooter>
          <Button type="submit">Import</Button>
          <Button color="gray" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

interface BoardSelectorProps {}
function BoardSelector({}: BoardSelectorProps) {
  return (
    <List unstyled>
      <ListItem>
        <Checkbox disabled defaultChecked /> Current board
        <List unstyled className="ml-4">
          <ListItem>
            <Checkbox disabled defaultChecked /> Current view
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
}
