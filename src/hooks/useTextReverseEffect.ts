'use client';

import React, { useEffect, useState } from 'react';

export const useTextReverseEffect = (
  text: string,
  animate: boolean = true
) => {
  const [mounted, setMounted] = useState(false);
  const text_reverse = text.split('').reverse();

  const [index, setIndex] = useState(0);
  const [glyphs, setGlyphs] = useState(text_reverse);
  const to = React.useRef<NodeJS.Timeout>();
  // animate replacing glyphs with letters
  useEffect(() => {
    if (mounted && animate) {
      to.current = setInterval(() => {
        const newGlyphs = [...glyphs];
        newGlyphs[index] = text[index];
        setGlyphs(newGlyphs);
        setIndex((i) => i + 1);
      }, 30);
    }
    setMounted(true);
    if (index === text.length) {
      clearInterval(to.current);
    }
    return () => {
      if (to.current) clearInterval(to.current);
    }
  }, [glyphs, index, mounted, text, animate]);

  return mounted ? glyphs.join('') : text;
};
