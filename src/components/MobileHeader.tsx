import ColumnBlock from '@/components/blocks/Column';
import { Block } from '@/types';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LetterLogo from './LetterLogo';
import MobileMenuDrawer from './MobileMenuDrawer';

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
      <div
        className={clsx(
          'relative flex h-16 items-center justify-between',
          visible ? 'z-30' : 'z-10'
        )}
      >
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
      <MobileMenuDrawer visible={visible} direction="top">
        {block_1 && <ColumnBlock block={block_1} />}
        {block_2 && <ColumnBlock block={block_2} />}
        {footer && <ColumnBlock block={footer} />}
      </MobileMenuDrawer>
    </>
  );
}
