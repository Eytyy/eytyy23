import Head from 'next/head';
import React, { ReactNode, useEffect, useState } from 'react';
import ColumnBlock from '@/components/blocks/Column';
import LeftCol from './LeftCol';
import RightCol from './RightCol';
import { Block } from '@/types';
import MobileHeader from './MobileHeader';
import { useRouter } from 'next/router';
import useThemeSwitch from '@/hooks/useThemeSwitch';

type Props = {
  children: ReactNode;
  page: any;
  site: {
    mobile_menu: {
      block_1: Block;
      block_2: Block;
      footer: Block;
    };
  };
};

export default function Layout({ children, page, site }: Props) {
  const router = useRouter();
  const theme = useThemeSwitch();

  // update theme on route change
  useEffect(() => {
    if (
      theme &&
      router.pathname !== '/' &&
      theme.theme.name !== 'black'
    ) {
      theme.setTheme('black');
    }
  }, [router, theme]);

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

  if (!page || !site) return null;

  const { leftCol, rightCol, footer } = page;

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
      <div className="bg-pageBG transition-colors duration-300 ease-linear">
        <div className="grid min-h-app grid-cols-8 grid-rows-home-m gap-11 p-8 text-pageText md:grid-rows-home md:p-14">
          <div className="relative col-span-2 col-start-1 row-span-4 row-start-1 hidden flex-col items-start justify-between text-base md:flex">
            {/* {leftCol && <LeftCol blocks={leftCol} />} */}
          </div>
          <header className="col-span-full md:hidden">
            {/* <MobileHeader {...site.mobile_menu} /> */}
          </header>
          <main className="col-span-full col-start-1 row-span-3 row-start-2 md:col-span-4 md:col-start-3 md:row-start-1">
            {children}
          </main>
          <div className="relative col-span-2 col-start-7 row-span-3 row-start-1 hidden grid-rows-2 justify-items-end md:grid">
            {/* {<RightCol rightCol={rightCol} />} */}
          </div>
          <footer className="relative col-span-3 col-start-6 row-start-4 hidden md:block">
            {/* {footer && <ColumnBlock block={footer} />} */}
          </footer>
        </div>
      </div>
    </>
  );
}
