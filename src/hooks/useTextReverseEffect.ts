'use client';

import { useEffect, useState } from 'react';

export const useTextReverseEffect = (
  text: string,
  animate: boolean = true
) => {
  const [mounted, setMounted] = useState(false);
  const text_reverse = text.split('').reverse();

  const [index, setIndex] = useState(0);
  const [glyphs, setGlyphs] = useState(text_reverse);

  // animate replacing glyphs with letters
  useEffect(() => {
    if (mounted && animate) {
      const interval = setInterval(() => {
        const newGlyphs = [...glyphs];
        newGlyphs[index] = text[index];
        setGlyphs(newGlyphs);
        setIndex((i) => i + 1);
      }, 30);
      return () => clearInterval(interval);
    }
    setMounted(true);
  }, [glyphs, index, mounted, text, animate]);

  return mounted ? glyphs.join('') : text;
};
