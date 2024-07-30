import { Button } from 'flowbite-react';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import { Inspector } from './inspector';
import { createPortal } from 'react-dom';

export function DevTool() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({
    user: { name: 'John Doe', age: 30 },
    items: [1, 2, 3, 4, 5],
    isActive: true,
    description: 'This is a sample object',
  });
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    let viewportEl = document.getElementById('geekle-ai-devtools');
    if (!viewportEl) {
      const bodyEl = document.getElementsByTagName('body')[0];
      viewportEl = document.createElement('div');
      viewportEl.id = 'geekle-ai-devtools';
      bodyEl.appendChild(viewportEl);
    }

    ref.current = viewportEl;
  });

  if (!ref.current) return null;

  return createPortal(
    <footer>
      <FloatingButton onClick={() => setIsOpen(true)} />
      <Inspector isOpen={isOpen} onClose={() => setIsOpen(false)} data={data} />
    </footer>,
    ref.current,
  );
}

interface FloatingButtonProps extends ComponentProps<'button'> {}

function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <Button onClick={onClick} className="fixed bottom-2 left-40" size="xs" outline color="gray">
      Devtools
    </Button>
  );
}
