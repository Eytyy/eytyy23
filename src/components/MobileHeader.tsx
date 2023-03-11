import ColumnBlock from '@/components/blocks/Column';
import { Block } from '@/types';
import { Variants, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LetterLogo from './LetterLogo';

const menu: Variants = {
  visible: {
    translateY: '0vh',
    transition: { duration: 0.4 },
  },
  hidden: {
    translateY: '-100vh',
    transition: {
      when: 'afterChildren',
    },
  },
};
const inner: Variants = {
  visible: { opacity: 1, transition: { delay: 0.3 } },
  hidden: { opacity: 0 },
};

type Props = {
  block_1: Block;
  block_2: Block;
  footer: Block;
};
export default function MobileHeader({
  block_1,
  block_2,
  footer,
}: Props) {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const closeMenu = () => setVisible(false);
    router.events.on('routeChangeStart', closeMenu);
    return () => {
      router.events.off('routeChangeStart', closeMenu);
    };
  }, [router]);

  return (
    <>
      <div className="relative z-20 flex h-16 items-center justify-between">
        <button
          onClick={() => setVisible((v) => !v)}
          className="text-4xl"
        >
          {visible ? <span>&uarr;</span> : <span>&darr;</span>}
        </button>
        <Link className="flex h-full items-center" href="/">
          <LetterLogo />
        </Link>
      </div>
      <motion.div
        className="fixed left-0 top-0 z-10 flex h-full w-full px-8 pt-24 pb-16 text-xl md:hidden"
        initial="hidden"
        variants={menu}
        animate={visible ? 'visible' : 'hidden'}
      >
        <div className="absolute left-0 top-0 h-full w-full bg-pageBG opacity-90" />
        <motion.div
          className="relative flex h-full w-full flex-col gap-10 font-light"
          variants={inner}
        >
          {block_1 && <ColumnBlock block={block_1} />}
          {block_2 && <ColumnBlock block={block_2} />}
          {footer && <ColumnBlock block={footer} />}
        </motion.div>
      </motion.div>
    </>
  );
}
