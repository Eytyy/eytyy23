import Head from 'next/head';
import React, { ReactNode, useEffect } from 'react';
import { SiteProps } from '@/types';

import {
  EpicGrid,
  EpicGridBottomLeft,
  EpicGridBottomRight,
  EpicGridMain,
  EpicGridTopLeft,
  EpicGridTopRight,
} from './UI';
import Logos from './Logos';
import OtherNav from './navigation/OtherNav';
import FooterMenu from './navigation/FooterMenu';
import MainMenu from './navigation/MainMenu';

type Props = {
  children: ReactNode;
  page: any;
  site: SiteProps;
};

export default function Layout({ children, page, site }: Props) {
  // Update window inner height in a css variable. This is a workaround
  // to avoid problems caused by the toolbar on mobile browsers
  // when elements have a full viewport height.
  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty(
        '--app-height',
        `${window.innerHeight}px`
      );
    };
    appHeight();

    window.addEventListener('resize', appHeight);
    return function cleanup() {
      window.removeEventListener('resize', appHeight);
    };
  }, []);

  if (!page) return null;

  return (
    <>
      <Head>
        <title>eytyy</title>
        <meta
          name="description"
          content="Eyas Tayyem freelance creative coder, researcher, strategist and consultant."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EpicGrid className="h-screen bg-pageBG text-pageText">
        <EpicGridMain>{children}</EpicGridMain>
        <EpicGridTopRight className="flex h-full flex-col items-end justify-between">
          <Logos />
        </EpicGridTopRight>
      </EpicGrid>
    </>
  );
}
