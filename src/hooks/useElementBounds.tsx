import { useCallback, useLayoutEffect, useState } from 'react';

export default function useElementBounds() {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const measuredRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const onResize = () => {
        const bounds = node.getBoundingClientRect();
        setSize({
          width: bounds.width,
          height: bounds.height - 130,
        });
      };

      onResize();
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      };
    }
  }, [node]);

  return { size, measuredRef };
}
