import { useEffect } from 'react';
import SuperMenu from '../SuperMenu';
import Link from 'next/link';
import Logo from '../Logo';

import LetterLogo from '../LetterLogo';
import useMeasure from 'react-use-measure';
import { useProject } from '@/context/project';
import clsx from 'clsx';
import {
  BasicGrid,
  BasicGridLeft,
  BasicGridMain,
  BasicGridRight,
} from '../UI';
import { useApp } from '@/context/app';

export default function ProjectHeader({ title }: { title: string }) {
  const [ref, { height }] = useMeasure();
  const { reachedEnd } = useProject();
  const { isMenuOpen } = useApp();

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--project-header-height',
      `${height}px`
    );
  }, [height]);

  return (
    <BasicGrid
      as="header"
      ref={ref}
      className={clsx(
        'sticky top-0 z-50 w-full border-b-[1px] bg-pageBG px-10 py-10 text-pageText lg:px-16 lg:py-14',
        isMenuOpen || reachedEnd ? 'border-pageBG' : 'border-pageText'
      )}
    >
      <BasicGridLeft>
        <SuperMenu pageTitle={title} />
      </BasicGridLeft>
      <BasicGridMain
        className={clsx(
          'hidden text-center lg:text-left',
          isMenuOpen ? 'lg:hidden' : 'lg:block'
        )}
      >
        <h2 className="font-medium">{title}</h2>
      </BasicGridMain>
      <BasicGridRight>
        <Link href="/" className="md:hidden">
          <LetterLogo />
        </Link>
        <Link href="/" className="hidden md:block">
          <Logo />
        </Link>
      </BasicGridRight>
    </BasicGrid>
  );
}
