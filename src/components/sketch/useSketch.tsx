import React, { useCallback, useEffect, useState } from 'react';

export default function useSketch() {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const measuredRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) setNode(node);
  }, []);

  useEffect(() => {
    if (node) {
      const onResize = () => {
        const bounds = node.getBoundingClientRect();
        setSize({
          width: bounds.width,
          height: bounds.height,
        });
      };
      onResize();
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      };
    }
  }, [node]);

  function SketchProvider() {
    return <div ref={measuredRef} />;
  }
}
