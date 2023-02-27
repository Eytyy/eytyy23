import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { sketchesData } from '@/components/sketches/navigation';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function Sketches() {
  const length = sketchesData.length;
  const [index, setIndex] = useState(1);
  const router = useRouter();

  const t = useRef<NodeJS.Timeout | null>(null);

  const updateIndex = useCallback(() => {
    setIndex((i) => (i === length ? 1 : i + 1));
  }, [length]);

  const shuffleStart = useCallback(() => {
    t.current = setInterval(updateIndex, 100);
  }, [updateIndex]);

  const shuffleStop = useCallback(() => {
    if (t.current) {
      clearInterval(t.current);
      t.current = null;
    }
  }, []);

  useEffect(() => {
    shuffleStart();
    return () => shuffleStop();
  }, [shuffleStart, shuffleStop]);

  function navigate(index: string) {
    router.push(`/sketches/${index}`);
  }

  const sketchSlug = formatNumberToFourDigits(index);

  return (
    <div className="flex h-screen w-screen cursor-pointer place-content-center place-items-center bg-black font-mono text-4xl font-bold text-white md:text-9xl">
      <motion.div
        onClick={() => navigate(sketchSlug)}
        onMouseEnter={shuffleStop}
        onMouseLeave={shuffleStart}
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 0.9 }}
      >
        {formatNumberToFourDigits(index)}
      </motion.div>
    </div>
  );
}

function formatNumberToFourDigits(num: number) {
  return `${num}`.padStart(4, '0');
}
